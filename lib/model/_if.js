import Variant from "./variant"

export default class If extends Variant{
	static get type(){return"variant.if"}

	assemble(){
		debugger
		var iPara={}, code=this.toJavascript(iPara)
		var satified=new Function("data",`${code} return true`)(iPara)
		if(!satified){
			let content=this.wXml.$1('sdtContent')
			while(content.lastChild)
				content.removeChild(content.lastChild)
		}
	}
	toJavascript(iPara){
		return `${this.variantParent.toJavascript(iPara)} if(${this.code})`
	}
}
