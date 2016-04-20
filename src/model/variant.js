import RichText from "docx4js/lib/openxml/docx/model/control/richtext"
import esprima from "esprima"

var id=Date.now()
export default class Variant extends RichText{
	constructor(){
		super(...arguments)
		this.vId=id++
		this.code=arguments[3]
		this.parsedCode=arguments[4]
		this._initVariant()
	}

	_initVariant(){
		this.variantParent=null
		this.variantChildren=[]
		this.wDoc.beginVariant(this)
	}

	parse(){//Variant interface
		var r=super.parse(...arguments)
		this.wDoc.endVariant(this)
		return r
	}

	visit(){//Visitor interface
		if(!this.wDoc.data)
			return
		this.assemble()
	}
	
	/**
	* assemble the variant Word model with data to a static word model 
	*/
	assemble(){
		this.wDoc.parseContext.part.current.setChanged(true)
	}

	/**
	* internal used, the code to resolving variant when assembling
	*/
	_toJavascript(iPara){

	}
	
	/**
	* {varName:xx,if_xxx:{}, for_xxx:{}}
	*/
	assembleAsData(){
		
	}
	
	_toJavascriptOfAssembleAsData(){
		
	}
}
