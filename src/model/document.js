import esprima from "esprima"
import escodegen from "escodegen"

export default class Document{
	constructor(docx,children){
		this.docx=docx
		this.children=children||[]
		console.dir(this.children)
	}

	assemble(data){
		return this.engine.call(this.docx.clone(), data, this.variants)
	}
	
	get variants(){
		function reduce(state,next){
			if(next.children)
				next.children.reduce(reduce,state)
			else
				state[next.id]=next
			return state
		}
		
		let variants=this.children.reduce(reduce,{})
		return variants
	}
	
	get engine(){
		return new Function("data,variants",this.js({}))
	}
	
	js(options){
		let code=esprima.parse("with(data){with(variants){}}")
		let codeBlock=code.body[0].body.body[0].body.body
		this.children.forEach(a=>codeBlock.push(a.js()))
		
		return options==undefined ? code : escodegen.generate(code,options)
	}
}