const esprima=require("esprima")
import Variant from "./variant"

export default class For extends Variant{
	static type="variant.for"
	constructor(){
		super(...arguments)

		let codeBlock=this.code.body[0].body.body
		while(!Array.isArray(codeBlock))//for(){}
			codeBlock=codeBlock.body

		this.children.forEach(a=>codeBlock.push(a.code))
		codeBlock.push(esprima.parse(`${this.object}.assemble(docx,$('${this.selector}'), __opt)`).body[0])
		
		this.code.body.unshift(esprima.parse(`${this.object}.assembling(docx,$('${this.selector}'))`).body[0])
		this.code.body.push(esprima.parse(`${this.object}.assembled(docx,$('${this.selector}'))`).body[0])
	}

	assembling(docx,node){
		this._template=node.clone()
		this._results=[]
	}

	//loop run after each child assembled
	assemble(docx,node, {clearWrap}){
		this._results.push(clearWrap ? node.find(">w\\:sdtContent").children() : node)
		node.replaceWith(this._template.clone())
	}

	assembled(docx,node){
		this._results.forEach(a=>node.before(a))
		node.remove()
		
		delete this._results
		delete this._template
	}
}
