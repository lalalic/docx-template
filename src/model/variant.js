import RichText from "docx4js/lib/openxml/docx/model/control/richtext"
import esprima from "esprima"

var id=Date.now()
export default class Variant extends RichText{
	constructor(wXml){
		super(...arguments)
		this.docxPart=this.wDoc.parseContext.part.current
		this.vId=id++
		this.code=arguments[3]
		this.parsedCode=arguments[4]
		this._initVariant()
	}

	_initVariant(){
		this.variantParent=null
		this.variantChildren=[]
		this.wDoc.beginVariant(this)
		
		
		
		let fname=`assemble_${this.vId}`
		this.variantParent.codeBlock.push({
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": `pre_${fname}`
                },
                "arguments": []
            }
        })
		this.wDoc.variantAssembles[`pre_${fname}`]=this.pre_assemble.bind(this)
		
		this.variantParent.codeBlock.push(this.parsedCode)
		this.wDoc.variantAssembles[fname]=this.assemble.bind(this)
		
		this.variantParent.codeBlock.push({
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": `post_${fname}`
                },
                "arguments": []
            }
        })
		this.wDoc.variantAssembles[`post_${fname}`]=this.post_assemble.bind(this)
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
		if(this._assembledXml  && null==this._assembledXml.parentNode)
			return this._assembledXml
		else if(a=this.variantParent.assembledXml)
			return a.querySelector(`[id='${this.vId}']`)
	}
	
	clear(){
		if(this.assembledXml.parentNode)
			this.assembledXml.remove()
		else
			this.assembledXml=null
	}
}
