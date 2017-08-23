import * as esprima  from "esprima"
import * as babel from "babel-core"
import es2015 from "babel-preset-es2015"
import es2017 from "babel-preset-es2017"

import escodegen from "escodegen"
import {ID} from "./variant"

export default class Document{
	constructor(docx,children){
		this.docx=docx
		this.children=children||[]
	}

	assemble(data, opt={clearWrap:true}){
		try{
			let targetDoc=this.docx.clone()
			return this.engine(targetDoc, data, this.variants, targetDoc.officeDocument.content, opt)
				.then(staticDoc=>{
					if(!opt.clearWrap){
						staticDoc.officeDocument.content(`[${ID}]`).removeAttr(ID)
					}
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
		return new Function("docx, __, __variants, $, __opt",this.js())
	}
	
	static ES7=(function(){
		try{
			eval(`(async function(){})`)
			return false
		}catch(e){
			return false
		}
	})()

	js(options={}){
		let code=this.toString(options)
		
		if(!this.constructor.ES7){
			code=babel.transform(code,{presets: [es2015, es2017],plugins:[]}).code
			code=esprima.parse(code)
			let result=code.body[2].expression
			code.body[2]={
				type: "ReturnStatement",
				argument: result
			}
			
			code=escodegen.generate(code,{})
		}

		return code
	}
	
	toString(options={}){
		let code=esprima.parse("(async function(){})()")
		let codeBlock=code.body[0].expression.callee.body.body
		this.children.forEach(a=>{
			if(a.comment){
				a.code.leadingComments=[{
					type:"Block",
					value: a.comment
				}]
			}
			codeBlock.push(a.code)
		})
		codeBlock.push({
			"type": "ReturnStatement",
			"argument": {
				"type": "Identifier",
				"name": "docx"
			}
		})
		
		code=escodegen.generate(code,options)
		return code
	}
}
