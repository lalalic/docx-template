import RichText from "docx4js/dist/openxml/docx/model/control/richtext"
import esprima from "esprima"

export default class Variant extends RichText{
	constructor(){
		super(...arguments)
		this.code=arguments[3]
		this.parsedCode=esprima.parse(this.code)//for validation
		this._initVariant()
	}
	
	_initVariant(){
		this.variantParent=null
		this.variantChildren=[]
		this.wDoc.beginVariant(this)
	}
	
	parse(){
		var r=super.parse(...arguments)
		this.wDoc.endVariant(this)
		return r
	}
	
	visit(){
		if(!this.wDoc.data)
			return
		this.assemble()
	}
	
	assemble(){
		
	}
	
	_toJavascript(iPara){
		
	}
}