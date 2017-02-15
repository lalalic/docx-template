import esprima from "esprima"
import escodegen from "escodegen"

export default class Document{
	constructor(docx,children){
		this.docx=docx
		this.children=children
	}

	assemble(data){
		return this.engine.call(this.docx.clone(), data, this.variants)
	}
	
	get variants(){
		function reduce(state,next){
			if(next.children)
				next.children.reduce(reduce,state)
			else
				state[next.node._id]=next
			return state
		}
		
		let variants=this.children.reduce(reduce,{})
		return variants
	}
	
	get engine(){
		let code=esprima.parse("with(data){with(variants){}}")
		let codeBlock=code.body[0].body.body[0].body.body
		
		children.forEach(a=>codeBlock.push(a.js()))
		return new Function("data,variants",escodegen.generate(this.parsedCode))
	}
	
	get xml(){
		
	}
}