import esprima from "esprima"
import escodegen from "escodegen"

import docx4js from "docx4js"

import Variant from "./variant"

export default class Document extends Variant{
	constructor(node,children,docx){
		super(node,null, children)
		this.docx=docx
	}

	/**
	* which makes it as a variant
	*/
	parse(){
		var r=super.parse(...arguments)
		this.wDoc.endVariant(this)

		if(typeof(this.parsedCode)!='function'){
			var code=escodegen.generate(this.parsedCode)
			//console.log(code)
			this.parsedCode=new Function("data,variants",escodegen.generate(this.parsedCode))
		}

		return r
	}

	visit(){
		//which makes the class as a visitor
	}

	/**
	* public API for variant docx
	*/
	assemble(data, transactional){
		let newDocx=this.docx.clone()
		
		
		
		
		
		
		if(!transactional)
			this.variantChildren.forEach(a=>a.assembledXml=a.wXml.cloneNode(true) )

		this.parsedCode.call({}, data, this.wDoc.variants)

		let wDoc=this.wDoc,
			variantChildren=this.variantChildren,
			doSave=this.wDoc._doSave.bind(this.wDoc)

		if(transactional){
			return {
				save(file){
					doSave(this.data, file)
				},
				parse(){
					return docx4js.load(this.data).then(docx=>docx.parse(...arguments))
				},
				get data(){
					wDoc._serialize()
					return getNewDocxData(wDoc)
				},
				get variantChildren(){
					return variantChildren
				}
			}
		}else{
			this.variantChildren.map(variant=>{
				let parent=variant.wXml.parentNode
				variant.assembledXml && parent.appendChild(variant.assembledXml)
				parent.removeChild(viariant.wXml)
			})
			wDoc._serialize()
			let newDocxData=getNewDocxData(wDoc)
			wDoc._restore()
			return {
				save(file){
					doSave(newDocxData,file)
				},
				parse(){
					return docx4js.load(newDocxData).then(docx=>docx.parse(...arguments))
				},
				get data(){
					return newDocxData
				},
				get variantChildren(){
					return variantChildren
				}
			}
		}

		if(transactional){
			this.assemble=function(){
				throw new Error("transactional assembly can't support multiple times assembling")
			}
		}
	}
}

function getNewDocxData(wDoc){
	if($.isNode)
		return wDoc.raw.generate({type:"nodebuffer"})
	var data=wDoc.raw.generate({type: "blob",mimeType: "application/docx"})
	data.name="a.docx"

	return data
}
