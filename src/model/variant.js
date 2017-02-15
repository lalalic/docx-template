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
		this.docxPart.setChanged(true)
	}
	
	post_assemble(){
		
	}

	toJs(){
		return this.children.reduce((state, child)=>{
			state.push({
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
							"name": "pre_assemble"
						}
					},
					"arguments": []
				}
			})
			state.push(child.toJs())
			state.push({
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
							"name": "post_assemble"
						}
					},
					"arguments": []
				}
			})
		},[])
	}
}
