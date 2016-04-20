import docx4js from "docx4js"

import Document from "./model/document"
import Expression from "./model/_exp"
import If from "./model/_if"
import For from "./model/_for"
import esprima from "esprima"

Object.assign(docx4js.factory,{
	extendControl(type,wXml,doc,parent){
		if(type!=='richtext')
			return;

		let tagEl=wXml.$1('>sdtPr>tag'),
			tag=tagEl && tagEl.attr('w:val') || false

		if(tag){
			try{
				let parsedCode=esprima.parse(tag+'{}')
				let [firstStatement]=parsedCode.body
				switch(firstStatement.type){
				case 'ForStatement':
					return new For(wXml,doc,parent,tag.substring(4,tag.length-1), parsedCode)
				break
				case 'IfStatement':
					return new If(wXml,doc,parent,tag.substring(3,tag.length-1), parsedCode)
				break
				}
			}catch(e){
				//console.error(`error ${this.type} code:${this.code}`)
				//throw e
			}
		}else{
			let text = wXml.textContent.trim()
			if(text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}')
				return new Expression(wXml,doc,parent,text.substring(2,text.length-1))
		}
	},
	extend(wXml){
		if(wXml.localName=='document')
			return new Document(...arguments)
	}
})



function createFactory(data){
	let ignore={visit(){}}
	return docx4js.createVisitorFactory(function(wordModel){
		switch(wordModel.type){
		case 'document':
			wordModel.data=data
		case 'variant.exp':
		case 'variant.for':
		case 'variant.if':
			return wordModel
		default:
			return ignore
		}
	})
}

export default {
    parse(file){
        return docx4js.load(file).then(docx=>{
            return docx.parse(createFactory())
        })
    },

    assemble(file,data){
        return docx4js.load(file).then(docx=>{
            return docx.parse(createFactory(data)).asStaticDocx()
        })
    }
}
