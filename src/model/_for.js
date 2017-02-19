import esprima from "esprima"
import Variant from "./variant"

export default class For extends Variant{
	static type="variant.for"
	constructor(){
		super(...arguments)

		let codeBlock=this.code.body[0].body.body
		while(!Array.isArray(codeBlock))//for()with(){}
			codeBlock=codeBlock.body

		codeBlock.push(esprima.parse(`${this.id}.assemble(this,$('${this.id}'))`).body[0])

		this.children.forEach(a=>codeBlock.push(a.code))
		this.code.body.unshift(esprima.parse(`${this.id}.assembling(this,$('#${this.id}'))`).body[0])
		this.code.body.push(esprima.parse(`${this.id}.assembled(this,$('#${this.id}'))`).body[0])
	}

	assembling(){

	}

	assemble(){
		
	}

	assembled(){

	}
}
