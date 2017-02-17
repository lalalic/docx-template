import ModelHandler from "docx4js/lib/openxml/docx/model-handler"

import Variant from "./model/variant"
import Document from "./model/document"
import Expression from "./model/_exp"
import If from "./model/_if"
import For from "./model/_for"
import Picture from "./model/_picture"

export class VariantHandler extends ModelHandler{
	constructor(docx){
		super()
		this.docx=docx
	}

	createElement(type,{code,node},children){
		if(children)
			children=children.filter(a=>a instanceof Variant)

		switch(type){
			case "control.picture.exp":
				return new Picture(node,code)
			case "control.text.exp":
				return new Expression(node,code)
			case "block.for":
			case "inline.for":
				return new ForStatement(node,code,children)
			case "block.if":
			case "inline.if":
				return new IfStatement(node,code,children)
			case "document":
				this.varDoc=new Document(this.docx,children)
				return this
			default:
				if(children && children.length>0){
					if(children.length==1)
						return children[0]
					else
						return children
				}
		}

	}

	assemble(data,transactional){
		return this.varDoc.assemble(...arguments)
	}
}

export default VariantHandler
