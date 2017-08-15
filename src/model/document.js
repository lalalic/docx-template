const esprima = require("esprima")
const babel = require("babel-core")

import escodegen from "escodegen"
import {ID} from "./variant"

export default class Document{
	constructor(docx,children){
		this.docx=docx
		this.children=children||[]
	}

	assemble(data){
		try{
			let targetDoc=this.docx.clone()
			return this.engine(targetDoc, data, this.variants, targetDoc.officeDocument.content)
				.then(staticDoc=>{
					staticDoc.officeDocument.content(`[${ID}]`).removeAttr(ID)
					return staticDoc
				})
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
		//let engine=babel.transform(code,{presets: ["es2015", "es2017"]})
		return new Function("docx, __={}, __variants, $",`return ${code}`)
	}

	js(options){
		let code=esprima.parse("(async function(){})()")
		let codeBlock=code.body[0].expression.callee.body.body
		this.children.forEach(a=>codeBlock.push(a.code))
		codeBlock.push({
			"type": "ReturnStatement",
			"argument": {
				"type": "Identifier",
				"name": "docx"
			}
		})

		return options==undefined ? code : escodegen.generate(code,options)
	}
}
