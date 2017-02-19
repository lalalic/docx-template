import esprima from "esprima"
import docx4js from "docx4js"

import VariantHandler from "./variant-handler"

const VARIANTS="control.picture,control.text,block,inline".split(",")

export class DocxTemplate extends docx4js{
	/**
	* entry: parse template as a variant document, then you can assemble with data
	**/
	static parse(file){
		const _parse=docx=>{
			let handler=new VariantHandler(docx)
			docx.parse(handler, DocxTemplate.identify)
			return handler.varDoc
        }
		if(file instanceof docx4js)
			return Promise.resolve(_parse(file))

        return this.load(file).then(_parse)
    }

    static assemble(file,data){
        return this.parse(file)
			.then(varDoc=>varDoc.assemble(data))
    }

	static isExp(text){
		text=text.trim()
		let len=text.length
		if(len>3 && text[0] == '$' && text[1] == '{' && text[len - 1] == '}'){
			text=text.substring(2,text.length-1).trim()
			if(text.length)
				return text
		}
		return false
	}

	static identify(node, officeDocument){
		let tagName=node.name.split(":").pop()
		if(tagName=="styles" || tagName=="numbering")
			return null

		let model=docx4js.OfficeDocument.identify(...arguments)


		if(typeof(model)=="string" || VARIANTS.indexOf(model.type)==-1)
			return model

		let sdtPr=node.children.find(a=>a.name=="w:sdtPr")
		if(!sdtPr)
			return model

		let tag=sdtPr.children.find(a=>a.name=="w:tag")

		if(!tag)
			return model

		tag=tag.attribs["w:val"]
		if(!tag)
			return model

		tag=tag.trim()

		model.rawCode=tag
		switch(model.type){
			case "control.picture":
			case "control.text": {
				let exp=DocxTemplate.isExp(tag)
				if(!exp)
					return model

				model.type=`${model.type}.exp`
				model.code=esprima.parse(exp)
				return model
			}
			case "block":
			case "inline":{
				let parsedCode=esprima.parse(tag+'{}')
				if(parsedCode.body.length==2)//for/if(){}{}
					parsedCode.body.pop()
				else if(parsedCode.body.length>1){
					console.warn(`syntax error, ignore as static content: \n\r ${officeDocument.content(node).text()}`)
					return model
				}
				let [firstStatement]=parsedCode.body
				switch(firstStatement.type){
					case 'ForStatement':
						model.type=`${model.type}.for`
						model.code=parsedCode
						return model
					break
					case 'IfStatement':
						model.type=`${model.type}.if`
						model.code=parsedCode
						return model
					break
					default:
						console.warn(`unsupported statement in ${model.type}, ignore as static content: \n\r ${officeDocument.content(node).text()}`)
						return model
				}
			}
		}
		delete model.rawCode
		return model
	}
}

export default DocxTemplate
