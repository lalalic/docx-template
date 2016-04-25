import Variant from "./variant"

export default class Expression extends Variant{
	static get type(){return"variant.exp"}
	
	_initVariant(){
		super._initVariant()
		
		/*assemble(code)*/
		this.parsedCode.body[0]={
            "type": "TryStatement",
            "block": {
                "type": "BlockStatement",
                "body": [{
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
								this.parsedCode.body[0].expression
							]
						}
					}]
            },
            "guardedHandlers": [],
            "handlers": [
                {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "e"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                }
            ],
            "handler": {
                "type": "CatchClause",
                "param": {
                    "type": "Identifier",
                    "name": "e"
                },
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
            },
            "finalizer": null
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
