import Variant from "./variant"

export default class Expression extends Variant{
	static get type(){return"variant.exp"}
	
	_initVariant(){
		super._initVariant()
		
		/*assemble(code)*/
		this.parsedCode.body[0]={
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": `assemble_${this.vId}`
                },
                "arguments": [
					this.parsedCode.body[0].expression
				]
			}
		}
	}

	assemble(value){
		if(value==null || value==undefined || value=='')
			this.clear()
		else{
			this.assembledXml.$('t').forEach((t,i)=>{
				if(i==0)
					t.textContent=value
				else
					t.remove()
			})
		}
		super.assemble(...arguments)
	}
}
