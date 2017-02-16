export default class Variant{
	constructor(node,code,children){
		this.node=node
		this.code=code
		this.children=children||[]
	}
	
	get id(){
		return `_${this.node.id}`
	}

	pre_assemble(){
		
	}

	assemble(docx,){
		
	}
	
	post_assemble(){
		
	}

	js(){
		return [
			Expression.PRE_ASSEMBLE(this)
			,this.code
			,...this.children.map(a=>a.js())
			,Expression.POST_ASSEMBLE(this)
		]
	}
	
	static PRE_ASSEMBLE(variant){
		return {
			"type": "ExpressionStatement",
			"expression": {
				"type": "CallExpression",
				"callee": {
					"type": "MemberExpression",
					"computed": false,
					"object": {
						"type": "Identifier",
						"name": variant.id
					},
					"property": {
						"type": "Identifier",
						"name": "pre_assemble"
					}
				},
				"arguments": []
			}
		}
	}
	
	static POST_ASSEMBLE(variant){
		return {
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "MemberExpression",
						"computed": false,
						"object": {
							"type": "Identifier",
							"name": variant.id
						},
						"property": {
							"type": "Identifier",
							"name": "post_assemble"
						}
					},
					"arguments": []
				}
			}
	}
}
