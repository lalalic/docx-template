import esprima from "esprima"

export default class Variant{
	constructor(node,code,children){
		this.node=node
		this.code=code
		this.children=children
		
		this.vId=`__${this.constructor.type}_${node.id}`
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
						"name": variant.vId
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
							"name": variant.vId
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
