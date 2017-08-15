const babel = require("babel-core")
const esprima=require("esprima")

import fetch from "isomorphic-fetch"
import Variant from "./variant"
import {ID} from "./variant"
import DocxTemplate from ".."

export default class SubDoc extends Variant{
	static type="variant.subdoc"

	constructor(node, data){
		super(node)
		this.data=data
		this.code=esprima.parse(`async function assemble(){
				let node=$('${this.selector}')
				let varDocInfo=await ${this.object}.parse(docx, node)
				if(varDocInfo){
					let {varDoc, variants, code}=varDocInfo
					let targetDoc=varDoc.docx.clone()
					let subdoc=eval("(function(docx, __variants,$){return "+code+"})")
					let staticDoc=await subdoc(targetDoc,variants,targetDoc.officeDocument.content)
					staticDoc.officeDocument.content("[${ID}]").removeAttr("${ID}")
					let zip=staticDoc.serialize()
					let data=zip.generate({type:"nodebuffer"})
					${this.object}.assemble(docx, node, data)
				}
			}`).body[0].body
	}

	parse(docx, node){
		return DocxTemplate.parse(this.data)
			.then(varDoc=>{
				if(!varDoc){
					node.remove()
				}else if(varDoc.children.length==0){
					this.assemble(docx, node, this.data)
				}else{
					let variants=varDoc.variants
					let code=varDoc.js({})
					return {varDoc, code: babel.transform(code).code, variants}
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
		//let varDocInfo=await __variants.a0.parse(docx, node, value)
		this.code.body[1].declarations[0].init.argument.arguments.push(code)//for value
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
						return super.parse(docx,node)
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
