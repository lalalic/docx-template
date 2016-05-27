import esprima from "esprima"
import escodegen from "escodegen"

import BaseDocument from "docx4js/lib/openxml/docx/model/document"

export default class Document extends BaseDocument{
	constructor(){
		super(...arguments)
		Object.assign(this.wDoc,function(variantDocument){
			let _currentContainer,
				_variantContainers=[],
				variants={}
			return {
					beginVariant(variant){
						if(_currentContainer &&
							_currentContainer!=variantDocument)
							variant.wXml.setAttribute('id',variant.vId)

						if(_currentContainer==variantDocument)
							variant.isRootChild=true

						switch(variant.type){
						case 'variant.exp':
						case 'variant.picture':
							variant.variantParent=_currentContainer
							_currentContainer.variantChildren.push(variant)
							variants[variant.vId]=variant
						break
						case 'variant.if':
						case 'variant.for':
							variant.variantParent=_currentContainer
							_currentContainer.variantChildren.push(variant)
							_variantContainers.push(_currentContainer)
							variants[variant.vId]=variant
						case 'document':
							_currentContainer=variant
						}
						return variant
					},

					endVariant(variant){
						switch(variant.type){
						case 'variant.if':
						case 'variant.for':
							_currentContainer=_variantContainers.pop()
						}
					},

					variants
			}
		}(this))

		this.variantParent=null
		this.variantChildren=[]
		this.parsedCode=esprima.parse("with(data){with(variants){}}")
		this.codeBlock=this.parsedCode.body[0].body.body[0].body.body
		this.wDoc.beginVariant(this)
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
		if(!transactional)
			this.variantChildren.forEach(a=>a.assembledXml=a.wXml.cloneNode(true) )

		this.parsedCode.call({}, data, this.wDoc.variants)

		let wDoc=this.wDoc, 
			variantChildren=this.variantChildren,
			doSave=this.wDoc._doSave.bind(this.wDoc)

		if(transactional){
			return {
				save(file){
					wDoc._serialize()
					doSave(this.data, file)
				},
				parse(){
					return wDoc.parse(...arguments)
				},
				get data(){
					return getNewDocxData(wDoc)
				},
				variantChildren
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
					return require("docx4js").load(newDocxData).parse(...arguments)
				},
				data:newDocxData,
				variantChildren
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
	return $.isNode ? wDoc.raw.generate({type:"nodebuffer"}) : wDoc.raw.generate({type: "blob",mimeType: "application/docx"})
}


