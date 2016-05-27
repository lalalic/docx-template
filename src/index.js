import esprima from "esprima"
import docx4js, {Factory} from "docx4js"

import Document from "./model/document"
import Expression from "./model/_exp"
import If from "./model/_if"
import For from "./model/_for"
import Picture from "./model/_picture"

import Part from "./part"

var ignore={visit(){}}

export default class DocxTemplate extends docx4js{
	_serialize(){
		var {_changedParts}=this
		if(_changedParts){
			_changedParts.forEach(part=>part._serialize())
			delete this._changedParts
		}
	}

	_restore(){

	}
	
	_doSave(newDocxData,file){
		if($.isNode){
			require("f"+"s").writeFile(file||`${Date.now()}.docx`,newDocxData)
		}else{
			let url = window.URL.createObjectURL(newDocxData)
			let link = document.createElement("a");
			document.body.appendChild(link)
			link.download = `${file||'new'}.docx`;
			link.href = url;
			link.click()
			document.body.removeChild(link)
		}
	}
	
	static createVisitorFactory(factory){
		return docx4js.createVisitorFactory(factory || function(wordModel){
			switch(wordModel.type){
			case Document.type:
			case Expression.type:
			case For.type:
			case If.type:
			case Picture.type:
				return wordModel
			default:
				return ignore
			}
		})
	} 
	
	static Factory=class extends Factory{
		create(wXml){
			if(wXml.localName=='document')
				return new Document(...arguments)
			return super.create(...arguments)
		}
		
		createControl(type,wXml,doc,parent){
			let tagEl=wXml.$1('>sdtPr>tag'),
				tag=tagEl && tagEl.attr('w:val') || false
			
			let isExp=this.constructor.isExp
			
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
			
			return super.createControl(...arguments)
		}
		
		static isExp(text){
			text=text.trim()
			if(text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}'){
				text=text.substring(2,text.length-1).trim()
				if(text.length)
					return text
			}
			return false
		}
	}

	static parse(file){
        return this.load(file).then(docx=>{
			var document=docx.parse(this.createVisitorFactory())
            return {
					assemble(data,transactional){
						return document.assemble(data,transactional)
					},
					variantChildren: document.variantChildren
				}
        })
    }

    static assemble(file,data){
        return this.load(file).then(docx=>{
            return docx.parse(this.createVisitorFactory())
				.assemble(data,true)
        })
    }
}