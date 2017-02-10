import esprima from "esprima"

export default class Variant{
	constructor(node,code,children){
		this.node=node
		if(children)
			(this.children=children).forEach(a=>a.parent=this)
		
		this.vId=`__${this.constructor.type}_${node.id}`
		this.parsedCode=code
		this._initVariant()
	}

	_initVariant(){
		this.variantParent=null
		this.variantChildren=[]
		this.wDoc.beginVariant(this)
		
		this.variantParent.codeBlock.push({
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
		
		
		this.variantParent.codeBlock.push(this.parsedCode)
		
		this.variantParent.codeBlock.push({
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
	}

	parse(){//Variant interface
		var r=super.parse(...arguments)
		this.wDoc.endVariant(this)
		return r
	}

	visit(){//Visitor interface
		if(!this.wDoc.data)
			return
		//this.assemble()
	}
	
	pre_assemble(){
		
	}
	
	post_assemble(){
		let a=this.assembledXml
		a && a.removeAttribute('id')
	}
	
	/**
	* assemble the variant Word model with data to a static word model 
	*/
	assemble(){
		this.docxPart.setChanged(true)
	}
	
	set assembledXml(v){
		this._assembledXml=v
	}
	
	get assembledXml(){
		var a;
		if(this.isRootChild)
			return this._assembledXml||this.wXml
		else if(a=this.variantParent.assembledXml)
			return a.querySelector(`[id='${this.vId}']`)
	}
	
	clear(){
		Array.from(this.assembledXml.$1('sdtContent').childNodes)
			.forEach(child=>child.parentNode.removeChild(child))
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
