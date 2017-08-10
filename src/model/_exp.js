import esprima from "esprima"
import Variant from "./variant"

export default class Expression extends Variant{
	static type="variant.exp"

	constructor(){
		super(...arguments)
		let exp=this.code.body[0].expression
		this.code=esprima.parse(`${this.id}.assemble(this,$('${this.selector}'))`).body[0]
		this.code.expression.arguments.push(exp)
	}

	assemble(docx, node, value){
		if(value===null || value===undefined || value===''){
			node.remove()
		}else{
			node.find('w\\:t').remove(i=>i!=0).first().text(value)
		}
		
	}
}
