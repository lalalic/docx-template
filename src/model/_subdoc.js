import Variant from "./variant"
import escodegen from "escodegen"
const esprima=require("esprima")
import {ID} from "./variant"
import fetch from "isomorphic-fetch"

export default class SubDoc extends Variant{
	static type="variant.subdoc"
	
	constructor(node, data){
		super(node)
		this.data=data
		this.code=esprima.parse(`
				let {targetDoc, variants, code}=await ${this.object}.parse(this, $('${this.selector}'))

				let subdoc=eval("(function(__variants,$){"+code+"})")
				subdoc.call(targetDoc,variants,targetDoc.officeDocument.content)
					
				const clear=()=>{
					targetDoc.officeDocument.content("[${ID}]").removeAttr("${ID}")
					return targetDoc
				}

				return Promise.all(done)
					.then(clear)
					.then(subdoc=>{
						let zip=subdoc.serialize()
						let data=zip.generate({type:"nodebuffer"})
						${this.id}.assemble(this, node, data)
					})
			}catch(error){
				console.error(error)
				throw error
			}

			').body[0]
	}
	
	parse(docx, node){
		return docx.constructor.parse(this.data)
			.then(varDoc=>{
				if(!varDoc){
					node.remove()
				}else if(varDoc.children.length==0){
					this.assemble(this, node, this.data)
					let targetDoc=varDoc.docx.clone()
					let variants=varDoc.variants
					let engine=varDoc.js()
					let code=engine.body[0].body
					code=escodegen.generate(code,{})
					return {targetDoc, code, variants}
				}
			})
	}
	
	assemble(docx, node,  subdoc){ 
		let rId=docx.officeDocument.addChunk(subdoc)
		node.replaceWith(`<w:altChunk r:id="${rId}"/>`)
	}
}

class Dynamic extends SubDoc{
    constructor(node, code){
		super(node,null)
		let parseArguments=this.code.expression.arguments[0].callee.object.arguments
		parseArguments.push(code)
	}
	
	parse(docx, node, value){
		if(value===null || value===undefined || value===''){
			return Promise.resolve()
		}else{
			return fetch(value)
				.then(data=>{
					if(!data){
						console.error("no data at "+value)
					}else{
						this.data=data
						return super.parse(docx)
					}
				}, e=>{
					console.error(e)
				})
		}
	}
	
	assemble(){
		super.assemble(...arguments)
		delete this.data
	}
}



SubDoc.Dynamic=Dynamic


