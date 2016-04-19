import BaseDocument from "docx4js/lib/openxml/docx/model/document"

export default class Document extends BaseDocument{
	constructor(){
		super(...arguments)
		Object.assign(this.wDoc,function(variantDocument){
			let _currentContainer,
				_variantContainers=[]
			return {
					beginVariant(variant){
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
					}
			}
		}(this))

		this.variantParent=null
		this.variantChildren=[]

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
		if(this.wDoc.data && this.variantChildren.length){
			this.wDoc.partMain.change=true
			this.wDoc.partMain.save()
		}
			
		delete this.wDoc.data
		return r
	}

	visit(){
		//which makes the class as a visitor
	}

	_toJavascript(iPara){
		iPara._global=this.wDoc.data
		return `with(arguments[0]._global)`
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
				var buffer=wDoc.raw.generate({type:"nodebuffer"})
				var fs="fs"
				require(fs).writeFile(file,buffer)
			},
			download(file){
				var file=wDoc.raw.generate({type: "blob",mimeType: "application/docx"})
				var url = window.URL.createObjectURL(file);
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

import Part from "docx4js/lib/openxml/part"

var xmldom="xmldom";
(function(XMLSerializer){
	Object.assign(Part.prototype,{
		changed:false,
		save(){
			if(this.changed){
				this.doc.raw.file(this.name, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n${(new XMLSerializer()).serializeToString(this.documentElement)}`)
				this.changed=false
			}
			
		},
		
		addRel(){
			
		},
		
		removeRel(){
			
		}
	})	
})($.isNode ? require(xmldom).XMLSerializer : XMLSerializer)
