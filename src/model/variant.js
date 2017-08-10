let uuid=0
export default class Variant{
	static ID="dtid"
	constructor(node,code,children){
		node.attribs[this.constructor.ID]=`a${uuid++}`
		 
		this.node=node
		this.code=code
		this.children=children||[]
		this.children.forEach(a=>a.parent=this)
	}

	get id(){
		return this.node.attribs[this.constructor.ID]
	}

	get rawCode(){
		return this.node.children.find(a=>a.name=="w:sdtPr")
			.children.find(a=>a.name=="w:tag").attribs["w:val"].trim()
	}

	get assemblingNode(){
		if(!this.parent)
			return this._assemblingNode
		else
			return this.parent.assemblingNode.find(this.selector)
	}

	assemble(docx,node){
		
	}
	
	get selector(){
		return `[${this.constructor.ID}=${this.id}]`
	}
}
