import esprima from "esprima"
import escodegen from "escodegen"

import docx4js from "docx4js"

import BaseDocument from "docx4js/lib/openxml/docx/model/document"


function getNewDocxData(wDoc){
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

		if(typeof(this.parsedCode)!='function')
			this.parsedCode=new Function("data,variants",escodegen.generate(this.parsedCode))

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

		let wDoc=this.wDoc, variantChildren=this.variantChildren

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
					return docx4js.load(newDocxData).parse(...arguments)
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

		getFolderAndRelName(){
			var i=name.lastIndexOf('/'),folder,relName
			if(i!==-1){
				folder=name.substring(0,i+1)
				relName=folder+"/_rels/"+name.substring(i+1)+".rels";
			}{
				folder=""
				relName="_rels/"+name+".rels"
			}
			return [folder, relName]
		},

		addRel(rel){
			var [folder, relName]=this.getFolderAndRelName()
			var id=`rId${Math.max(...Object.keys(this.rels).map(a=>parseInt(a.substring(3))))+1}`
			this.rels[id]=rel
			var {type, target}=rel
			if(typeof(target)=='string')
				rel.targetMode="External"
			else if(type.endsWith("/image")){
				let targetName="media/image"+(Math.max(...Object.keys(this.rels).map(a=>{
						let t=this.rels[a]
						if(t.type=='image'&&!t.targetMode)
							return parseInt(t.target.match(/\d+/)[0]||"0")

						return 0
					}))+1)+".jpg";
				let partName=`${folder}${targetName}`
				this.doc.raw.file(partName, target)
				this.doc.parts[partName]=this.doc.raw.file(partName)
				rel.target=targetName
				type="image"
			}

			var relPart=this.doc.getPart(relName)
			var root=relPart.documentElement,
				el=root.ownerDocument.createElement('Relationship')
			el.setAttribute("Id",id)
			var naming=(a)=>a.charAt(0).toUpperCase()+a.substr(1)
			Object.keys(rel).forEach(a=>el.setAttribute(naming(a),rel[a]))
			root.appendChild(el)
			rel.type=type
			relPart.setChanged(true)
			return id
		},

		removeRel(id){
			delete this.rels[id]
			this.documentElement.$1(`Relationship[Id=${id}]`).remove()
			var [folder, relName]=this.getFolderAndRelName()
			this.doc.getPart(relName).setChanged(true)
		}
	})

	Object.assign(DocxDocument.prototype,{
		_serialize(){
			var {_changedParts}=this
			if(_changedParts){
				_changedParts.forEach(part=>part._serialize())
				delete this._changedParts
			}
		},

		_restore(){

		}
	})
})($.isNode ? require(xmldom).XMLSerializer : XMLSerializer)
