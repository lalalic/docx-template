import Variant from "./variant"

export default class For extends Variant{
	static get type(){return"variant.for"}
	constructor(){
		super(...arguments)
		
		let codeBlock=this.code.body[0].body.body
		while(!Array.isArray(codeBlock))//for()with(){}
			codeBlock=codeBlock.body
			
		codeBlock.push({
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
					"type": "MemberExpression",
					"computed": false,
					"object": {
						"type": "Identifier",
						"name": this.vId
					},
					"property": {
						"type": "Identifier",
						"name": "assemble"
					}
				},
                "arguments": []
			}
		})
	}
	
	pre_assemble(){
		var sdtContent=this.assembledXml.$1('sdtContent')
		this.templates=sdtContent.childNodes.asArray()
		this.templates.forEach(a=>sdtContent.removeChild(a))
	}

	assemble(){
		var sdtContent=this.assembledXml.$1('sdtContent')
		this.templates.forEach(a=>sdtContent.appendChild(a.cloneNode(true)))
		super.assemble(...arguments)
	}
	
	post_assemble(){
		delete this.templates
		super.post_assemble()
	}
	
	js(){
		Expression.PRE_ASSEMBLE(this)
		,{
			"type": "ExpressionStatement",
			"expression": {
				"type": "CallExpression",
				"callee": {
					"type": "MemberExpression",
					"computed": false,
					"object": {
						"type": "Identifier",
						"name": this.vId
					},
					"property": {
						"type": "Identifier",
						"name": "assemble"
					}
				},
				"arguments": [
					this.code.body[0]
				]
			}
		}
		,Expression.POST_ASSEMBLE(this)
	}
}
