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
		var sdtContent=this.assembledXml.$1('sdtContent')
		this.templates=sdtContent.childNodes.asArray()
		this.templates.forEach(a=>sdtContent.removeChild(a))
	}

	assemble(){
		var sdtContent=this.assembledXml.$1('sdtContent')
		this.templates.forEach(a=>sdtContent.appendChild(a.cloneNode(true)))
		super.assemble(...arguments)
	}

	assembled(){
		delete this.templates
		super.post_assemble()
	}
}
