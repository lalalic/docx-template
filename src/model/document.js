import esprima from "esprima"
import escodegen from "escodegen"

import docx4js from "docx4js"

import BaseDocument from "docx4js/lib/openxml/docx/model/document"

function callee(name){
	return {
		"type": "ExpressionStatement",
		"expression": {
			"type": "CallExpression",
			"callee": {
				"type": "Identifier",
				"name": name
			},
			"arguments": []
		}
	}
}

export default class Document extends BaseDocument{
	constructor(){
		super(...arguments)
		Object.assign(this.wDoc,function(variantDocument){
			let _currentContainer,
				_variantContainers=[],
				variantAssembles={}
			return {
					beginVariant(variant){
						if(_currentContainer &&
							_currentContainer!=variantDocument)
							variant.wXml.setAttribute('id',variant.vId)
						
						switch(variant.type){
						case 'variant.exp':
							variant.variantParent=_currentContainer
							_currentContainer.variantChildren.push(variant)
						break
						case 'variant.if':
						case 'variant.for':
							variant.variantParent=_currentContainer
							_currentContainer.variantChildren.push(variant)
							_variantContainers.push(_currentContainer)
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
					
					variantAssembles
			}
		}(this))

		this.variantParent=null
		this.variantChildren=[]
		this.parsedCode=esprima.parse("with(arguments[0]){with(arguments[1]){}}")
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
			let code=escodegen.generate(this.parsedCode)
			this.parsedCode=new Function("data,option",code)
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
		this.variantChildren.map(variant=>{
			variant.assembledXml= transactional ? variant.wXml.cloneNode(true) : variant.wXml
		})
		
		this.parsedCode(data, this.wDoc.variantAssembles)
		
		let wDoc=this.wDoc, variantChildren=this.variantChildren
			
		function getNewDocxData(){
			return $.isNode ? wDoc.raw.generate({type:"nodebuffer"}) : wDoc.raw.generate({type: "blob",mimeType: "application/docx"})
		}
		
		function doSave(newDocxData,file){
			if($.isNode){
				let fs="fs"
				require(fs).writeFile(file||`${Date.now()}.docx`,newDocxData)
			}else{
				let url = window.URL.createObjectURL(newDocxData)
				let link = document.createElement("a");
				document.body.appendChild(link)
				link.download = `${file||'new'}.docx`;
				link.href = url;
				link.click()
				document.body.removeChild(link)
			}
		}
		
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
					return getNewDocxData()
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
			let newDocxData=getNewDocxData()
			return {
				save(file){
					doSave(newDocxData,file)
				},
				parse(){
					return docx4js.load(newDocxData).parse(...arguments)
				},
				data:newDocxData,
				variantChildren
			}
		}
	}
}

import DocxDocument from "docx4js"
import Part from "docx4js/lib/openxml/part"

var xmldom="xmldom";
(function(XMLSerializer){
	Object.assign(Part.prototype,{
		setChanged(a){
			var {_changedParts=new Set()}=this.doc
			this.doc._changedParts=_changedParts
			
			_changedParts[a ? 'add' : 'remove'](this)
		},
		_serialize(){
			this.doc.raw.file(this.name, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n${(new XMLSerializer()).serializeToString(this.documentElement)}`)
		},
		
		addRel(rel){
			var id=`rId${Math.max(Object.keys(this.rels).map(a=>parseInt(a.substring(3))))+1}`
			this.rels[id]=rel
			var el=this.documentElement.createElement('Relationship')
			el.setAttribute("Id",id)
			Object.keys(rel).forEach(a=>el.setAttribute(a,rel[a]))
			this.documentElement.appendChild(el)
			this.doc.getPart(this.relName).setChanged(true)
		},
		
		removeRel(id){
			delete this.rels[id]
			this.documentElement.$1(`Relationship[Id=${id}]`).remove()
			this.doc.getPart(this.relName).setChanged(true)
		}
	})
	
	Object.assign(DocxDocument.prototype,{
		_serialize(){
			var {_changedParts}=this
			if(_changedParts){
				_changedParts.forEach(part=>part._serialize())
				delete this._changedParts
			}
		}
	})
})($.isNode ? require(xmldom).XMLSerializer : XMLSerializer)
