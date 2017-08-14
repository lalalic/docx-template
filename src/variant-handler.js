import ModelHandler from "docx4js/lib/openxml/docx/model-handler"

import Variant from "./model/variant"
import Document from "./model/document"
import Expression from "./model/_exp"
import If from "./model/_if"
import For from "./model/_for"
import Picture from "./model/_picture"
import SubDoc from "./model/_subdoc"

export class VariantHandler extends ModelHandler{
	constructor(docx){
		super()
		this.docx=docx
	}

	createElement(type,{code,node,rawCode},children){
		if(children){
			const flat=(array,flated=[])=>array.reduce((collected,a)=>{
				if(Array.isArray(a)){
					flat(a,collected)
				}else if(a instanceof Variant){
					collected.push(a)	
				}
				return collected
			},flated)
			
			children=flat(children)
		}
		
		switch(type){
			case "control.picture.exp":
				return new Picture(node,code)
			case "control.text.exp":
				return new Expression(node,code)
			case "block.for":
			case "inline.for":
				return new For(node,code,children)
			case "block.if":
			case "inline.if":
				return new If(node,code,children)
			case "document":
				this.varDoc=new Document(this.docx,children)
				return this
			case "block.subdoc":
			case "inline.subdoc":
				return new SubDoc.Dynamic(node, code)
			case "chunk":{
				const {contentType,data}=arguments[1]
				if(contentType==this.docx.constructor.mime){
					return new SubDoc(node, data)
				}
			}
			default:
				if(children && children.length>0){
					if(children.length==1)
						return children[0]
					else
						return children
				}
		}

	}

	assemble(data){
		return this.varDoc.assemble(...arguments)
	}
}

export default VariantHandler
