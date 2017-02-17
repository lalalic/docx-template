export default class Variant{
	constructor(node,code,children){
		this.node=node
		this.code=code
		this.children=children||[]
	}
	
	get id(){
		return `_${this.node.id}`
	}
	
	get rawCode(){
		return this.node.children.find(a=>a.name=="w:sdtPr")
			.children.find(a=>a.name=="w:tag").attribs["w:val"].trim()
	}

	pre_assemble(){
		
	}

	assemble(docx,){
		
	}
	
	post_assemble(){
		
	}

	js(){
		return [
			Variant.PRE_ASSEMBLE(this)
			,this.code
			,...this.children.map(a=>a.js())
			,Variant.POST_ASSEMBLE(this)
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
			},
			leadingComments:[{
				type:"Block",
				value:`type: ${this.constructor.type}, raw:${this.rawCode}`
			}]
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
