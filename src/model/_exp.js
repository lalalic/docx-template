import Variant from "./variant"

export default class Expression extends Variant{
	static type="variant.exp"
	
	constructor(){
		super(...arguments)

		this.code={
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
					this.code.body[0].expression
				]
			}
		}
	}

	assemble(value){
		if(value==null || value==undefined || value==''){
			this.assembledXml.$('t').forEach(t=>t.remove())
		}else{
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
