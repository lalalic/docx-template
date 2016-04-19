import Variant from "./variant"

export default class If extends Variant{
	static get type(){return"variant.if"}

	assemble(){
		var iPara={}, code=this._toJavascript(iPara)
		var satified=new Function("data",`${code} return true`)(iPara)
		if(!satified){
			let content=this.wXml.$1('sdtContent')
			while(content.lastChild)
				content.removeChild(content.lastChild)
		}
	}
	_toJavascript(iPara){
		return `${this.variantParent._toJavascript(iPara)} if(${this.code})`
	}
}
