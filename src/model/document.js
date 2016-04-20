import BaseDocument from "docx4js/lib/openxml/docx/model/document"
import esprima from "esprima"

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
				variantParams={}
			return {
					beginVariant(variant){
						let fname='assemble_'
						switch(variant.type){
						case 'variant.exp':
							variant.variantParent=_currentContainer
							_currentContainer.variantChildren.push(variant)
							fname="assemble_"+variant.vId
							_currentContainer.codeBlock.push(callee(fname))
							variantParams[fname]=variant.assemble.bind(variant)
						break
						case 'variant.if':
						case 'variant.for':
							variant.variantParent=_currentContainer
							_currentContainer.variantChildren.push(variant)
							_variantContainers.push(_currentContainer)
							_currentContainer.codeBlock.push(variant.parsedCode)
							
							fname="assemble_"+variant.vId
							variant.codeBlock.push(callee(fname))
							variantParams[fname]=variant.assemble.bind(variant)
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
					
					variantParams
			}
		}(this))

		this.variantParent=null
		this.variantChildren=[]
		this.parsedCode=esprima.parse("with(arguments[0]){}")
		this.codeBlock=this.parsedCode.body[0].body.body
		this.wDoc.beginVariant(this)
	}

	set data(d){
		this.wDoc.data=d
	}

	get data(){
		return this.wDoc.data
	}

	/**
	* which makes it as a variant
	*/
	parse(){
		var r=super.parse(...arguments)
		this.wDoc.endVariant(this)
		delete this.wDoc.data
		return r
	}

	visit(){
		//which makes the class as a visitor
	}
	
	

	_toJavascript(iPara){
		iPara._global=this.wDoc.data
		return `console.info(JSON.stringify(arguments[0]));with(arguments[0]._global)`
	}
	
	_toJavascriptOfAssembleAsData(){
		return this._toJavascript(...arguments)
	}
	
	/**
	* {varName:xx,if_xxx:{}, for_xxx:{}}
	*/
	assembleAsData(data){
		var iPara={_global:data}
		var code=`${this._toJavascriptOfAssembleAsData(iPara)} {
			${this.variantChildren.forEach(a=>{
				`${this._toJavascriptOfAssembleAsData(iPara)}`
			})}
		}`
		
		return new Function("data", code)(data)
	}
	
	asStaticDocx(){
		this.wDoc.variantChildren=this.variantChildren
		let wDoc=this.wDoc
		
		return Object.assign(this.wDoc,{
			save(file){
				wDoc._serialize()
				var buffer=wDoc.raw.generate({type:"nodebuffer"})
				var fs="fs"
				require(fs).writeFile(file,buffer)
			},
			download(file){
				wDoc._serialize()
				var data=wDoc.raw.generate({type: "blob",mimeType: "application/docx"})
				var url = window.URL.createObjectURL(data);
				var link = document.createElement("a");
				document.body.appendChild(link)
				link.download = `${file||wDoc.props.name||'new'}.docx`;
				link.href = url;
				link.click()
				document.body.removeChild(link)
			}
		})
	}
	
	/**
	* public API for variant docx
	*/
	assemble(data){
		
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
