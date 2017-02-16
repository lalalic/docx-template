import Variant from "./variant"

export default class If extends Variant{
	static type="variant.if"
	
	constructor(){
		super(...arguments)
		
		let codeBlock=this.code.body[0].consequent.body
		while(!Array.isArray(codeBlock))//if()with(){}
			codeBlock=codeBlock.body
			
		
		/*if(...){assemble(true),...}else assemble(false)*/
		codeBlock.push({
			"type": "ExpressionStatement",
			"expression": {
				"type": "CallExpression",
				"callee": {
					"type": "MemberExpression",
					"computed": false,
					"object": {
						"type": "Identifier",
						"name": this.id
					},
					"property": {
						"type": "Identifier",
						"name": "assemble"
					}
				},
				"arguments": [
					{
						"type": "Literal",
						"value": true,
						"raw": "false"
					}
				]
			}
		})
		
		this.code.body[0].alternate={
			"type": "ExpressionStatement",
			"expression": {
				"type": "CallExpression",
				"callee": {
					"type": "MemberExpression",
					"computed": false,
					"object": {
						"type": "Identifier",
						"name": this.id
					},
					"property": {
						"type": "Identifier",
						"name": "assemble"
					}
				},
				"arguments": [
					{
						"type": "Literal",
						"value": false,
						"raw": "false"
					}
				]
			}
		}
	}

	assemble(satified){
		if(!satified){
			this.clear()
			super.assemble(...arguments)
		}else{
			//keep it
		}
	}
}
