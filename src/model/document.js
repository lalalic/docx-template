import esprima from "esprima"
import escodegen from "escodegen"
import {ID} from "./variant"

export default class Document{
	constructor(docx,children){
		this.docx=docx
		this.children=children||[]
	}

	assemble(data){
		try{
			let done=[]
			let targetDoc=this.docx.clone()
			this.engine.call(targetDoc, data, this.variants, targetDoc.officeDocument.content, done)

			const clear=()=>{
				targetDoc.officeDocument.content(`[${ID}]`).removeAttr(ID)
				return targetDoc
			}

			return Promise.all(done).then(clear)
		}catch(error){
			console.error(error)
		}
	}

	get variants(){
		function reduce(state,next){
			state[next.id]=next
			if(next.children)
				next.children.reduce(reduce,state)

			return state
		}

		let variants=this.children.reduce(reduce,{})
		return variants
	}

	get engine(){
		let code=this.js({})
		return new Function("data={},__variants, $, __promises",code)
	}

	js(options){
		let code=esprima.parse("with(data){with(__variants){}}")
		let codeBlock=code.body[0].body.body[0].body.body
		this.children.forEach(a=>codeBlock.push(a.code))

		return options==undefined ? code : escodegen.generate(code,options)
	}
}
