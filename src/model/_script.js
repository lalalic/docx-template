import * as esprima from "esprima"
import escodegen from "escodegen"
import Variant from "./variant"

export default class Script extends Variant{
	static type="variant.script"
	constructor(node, code, children){
		super(node,code)
		this.code.body.push(esprima.parse(`${this.object}.assemble(docx,$('${this.selector}'), __opt)`).body[0])
	}
	
	assemble(docx, node, opt){
		node.remove()
	}
}