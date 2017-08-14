import Variant from "./variant"
import escodegen from "escodegen"
import esprima from "esprima"
import {ID} from "./variant"
import fetch from "isomorphic-fetch"

export default class SubDoc extends Variant{
	static type="variant.subdoc"
	
	constructor(node, data){
		super(node)
		this.data=data
		this.code=esprima.parse(`
			__promises.push(
				${this.id}
				.parse(this)
				.then(varDoc=>{
					try{
						let node=$('${this.selector}')
						if(!varDoc){
							node.remove()
							return
						}else if(varDoc.children.length==0){
							${this.id}.assemble(this, node, ${this.id}.data)
							return	
						}
						
						let done=[]
						let targetDoc=varDoc.docx.clone()
						let variants=varDoc.variants
						let engine=varDoc.js()
						let code=engine.body[0].body
						code=escodegen.generate(code,{})
						console.log(code)
						let subdoc=eval("(function(__variants,$,__promises){"+code+"})")
						subdoc.call(targetDoc,variants,targetDoc.officeDocument.content,done)
							
						const clear=()=>{
							targetDoc.officeDocument.content("[${ID}]").removeAttr("${ID}")
							return targetDoc
						}

						return Promise.all(done)
							.then(clear)
							.then(subdoc=>{
								let zip=subdoc.serialize()
								let type=typeof(window)!="undefined" ? "blob" : "nodebuffer"
								let data=zip.generate({type:type})
								${this.id}.assemble(this, node, data)
							})
					}catch(error){
						console.error(error)
						throw error
					}
				})
			)`).body[0]
	}
	
	parse(docx){
		return docx.constructor.parse(this.data)
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
	
	parse(docx, value){
		if(value===null || value===undefined || value===''){
			return Promise.resolve()
		}else{
			return fetch(value)
				.then(data=>{
					this.data=data
					return super.parse(docx)
				})
		}
	}
	
	assemble(){
		super.assemble(...arguments)
		delete this.data
	}
}



SubDoc.Dynamic=Dynamic


