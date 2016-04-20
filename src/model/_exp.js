import Variant from "./variant"

export default class Expression extends Variant{
	static get type(){return"variant.exp"}
	

	assemble(){
		var iPara={}, code=this._toJavascript(iPara)
		var value=new Function("data",code)(iPara)||''
		this.wXml.$('t').forEach((t,i)=>{
			if(i==0)
				t.textContent=value
			else
				t.remove()
		})
		super.assemble(...arguments)
	}

	_toJavascript(iPara){
		return `${this.variantParent._toJavascript(iPara)}return ${this.code}`
	}
	
	_toJavascriptOfAssembleAsData(){
		
	}
}
