import Variant from "./variant"

export default class If extends Variant{
	static get type(){return"variant.if"}
	_initVariant(){
		super._initVariant()
		
		this.codeBlock=this.parsedCode.body[0].consequent.body
		while(!Array.isArray(this.codeBlock))//if()with(){}
			this.codeBlock=this.codeBlock.body
			
		
		/*if(...){assemble(true),...}else assemble(false)*/
		let assemble_name="assemble_"+this.vId
		this.codeBlock.push({
			"type": "ExpressionStatement",
			"expression": {
				"type": "CallExpression",
				"callee": {
					"type": "Identifier",
					"name": assemble_name
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
		
		this.parsedCode.body[0].alternate={
			"type": "ExpressionStatement",
			"expression": {
				"type": "CallExpression",
				"callee": {
					"type": "Identifier",
					"name": assemble_name
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
