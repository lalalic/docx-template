import Variant from "./variant"

export default class If extends Variant{
	static get type(){return"variant.if"}
	_initVariant(){
		this.codeBlock=this.parsedCode.body[0].consequent.body
		while(!Array.isArray(this.codeBlock))//if()with(){}
			this.codeBlock=this.codeBlock.body
		
		this.parsedCode.body[0].alternate={
			"type": "ExpressionStatement",
			"expression": {
				"type": "CallExpression",
				"callee": {
					"type": "Identifier",
					"name": "assemble_"+this.vId
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
		super._initVariant()
	}

	assemble(){
		var iPara={}, code=this._toJavascript(iPara)
		var satified=new Function("data",`${code} return true`)(iPara)
		if(!satified){
			let content=this.wXml.$1('sdtContent')
			while(content.lastChild)
				content.removeChild(content.lastChild)
		}
		super.assemble(...arguments)
	}
	_toJavascript(iPara){
		return `${this.variantParent._toJavascript(iPara)} if(${this.code})`
	}
}
