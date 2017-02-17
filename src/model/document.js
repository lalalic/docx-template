import esprima from "esprima"
import escodegen from "escodegen"

export default class Document{
	constructor(docx,children){
		this.docx=docx
		this.children=children||[]
	}

	assemble(data){
		return this.engine.call({}, data, this.variants)
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
		this.children.forEach(a=>{
			let stats=a.js()
			codeBlock.splice(codeBlock.length,0,...stats)
		})

		return options==undefined ? code : escodegen.generate(code,options)
	}
}
