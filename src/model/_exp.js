import * as esprima from "esprima"
import escodegen from "escodegen"
import Variant from "./variant"

export default class Expression extends Variant{
	static type="variant.exp"

	constructor(){
		super(...arguments)
		let exp=this.code.body[0].expression
		this.code=esprima.parse(`${this.object}.assemble(docx,$('${this.selector}'), __opt)`).body[0]
		this.code.expression.arguments.push(exp)
	}

	assemble(docx, node, {clearWrap}, value){
		if(value===null || value===undefined || value===''){
			node.remove()
		}else{
			node.find('w\\:t').remove(i=>i!=0).first().text(this.xmlescape(value))
			if(clearWrap){
				node.replaceWith(node.find(">w\\:sdtContent").children())
			}
		}
	}
}
