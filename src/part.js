import Part from "docx4js/lib/openxml/part"

function isNode(){
	return !!!document
}

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
			var name=this.name
			var i=name.lastIndexOf('/'),folder,relName
			if(i!==-1){
				folder=name.substring(0,i)
				relName=folder+"/_rels/"+name.substring(i+1)+".rels";
			}else{
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
				let partName=`${folder}/${targetName}`
				this.doc.raw.file(partName, target)
				this.doc.parts[partName]=this.doc.raw.file(partName)
				rel.target=partName
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
})(isNode() ? require("xml"+"dom").XMLSerializer : XMLSerializer)
