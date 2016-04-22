import docx4js from "docx4js"
import esprima from "esprima"

import Document from "./model/document"
import Expression from "./model/_exp"
import If from "./model/_if"
import For from "./model/_for"
import Picture from "./model/_picture"

function isExp(text){
	text=text.trim()
	if(text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}'){
		text=text.substring(2,text.length-1).trim()
		if(text.length)
			return text
	}
	return false
}

Object.assign(docx4js.factory,{
	extendControl(type,wXml,doc,parent){
		let tagEl=wXml.$1('>sdtPr>tag'),
			tag=tagEl && tagEl.attr('w:val') || false

		switch(type){
		case "picture":
			let exp=null
			if(exp=isExp(tag))
				return new Picture(wXml,doc,parent,esprima.parse(exp))
		break
		case "richtext":
			if(tag){
				tag=tag.trim()
				try{
					let parsedCode=esprima.parse(tag+'{}')
					if(parsedCode.body.length==2)//for/if(){}{}
						parsedCode.body.pop()
					else if(parsedCode.body.length>1)
						throw new Error("syntax error")

					let [firstStatement]=parsedCode.body
					switch(firstStatement.type){
					case 'ForStatement':
						return new For(wXml,doc,parent, parsedCode)
					break
					case 'IfStatement':
						return new If(wXml,doc,parent, parsedCode)
					break
					}
				}catch(e){
					//console.error(`error ${this.type} code:${this.code}`)
					//throw e
				}
			}else{
				let exp=null;
				if(exp=isExp(wXml.textContent.trim())){
					return new Expression(wXml,doc,parent,esprima.parse(exp))
				}
			}
		break
		}
	},
	extend(wXml){
		if(wXml.localName=='document')
			return new Document(...arguments)
	}
})



function createFactory(){
	let ignore={visit(){}}
	return docx4js.createVisitorFactory(function(wordModel){
		switch(wordModel.type){
		case 'document':
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
			var document=docx.parse(createFactory())
            return {
					assemble(data,transactional){
						return document.assemble(data,transactional)
					},
					variantChildren: document.variantChildren
				}
        })
    },

    assemble(file,data){
        return docx4js.load(file).then(docx=>{
            return docx.parse(createFactory()).assemble(data,true)
        })
    }
}
