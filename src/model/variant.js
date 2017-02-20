let uuid=0
export default class Variant{
	constructor(node,code,children){
		if(node.attribs.id===undefined){
			Object.defineProperty(node.attribs,"id",{
				value:`a${uuid++}`,
				writable:false,
				enumerable:false//not output in xml
			})
		}
		
		this.node=node
		this.code=code
		this.children=children||[]
		this.children.forEach(a=>a.parent=this)
	}

	get id(){
		return this.node.attribs.id
	}

	get rawCode(){
		return this.node.children.find(a=>a.name=="w:sdtPr")
			.children.find(a=>a.name=="w:tag").attribs["w:val"].trim()
	}

	get assemblingNode(){
		if(!this.parent)
			return this._assemblingNode
		else
			return this.parent.assemblingNode.find(`#${this.id}`)
	}

	assemble(docx,node){
		delete node.attribs.id
	}
}
