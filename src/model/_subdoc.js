import Variant from "./variant"


export default class Subdoc extends Variant{
    static type="variant.subdoc"

    constructor(){
		super(...arguments)
		let exp=this.code
		this.code=esprima.parse(`${this.id}.assemble(this,$('${this.selector}'))`).body[0]
		this.code.expression.arguments.push(exp)
        this.code.expression.arguments.push(esprima.parse("__promises").body[0])
	}

	assemble(docx, node, value, promises){
		if(value===null || value===undefined || value===''){
			node.remove()
		}else{
            let p=fetch(value)
                .then(data=>docx.officeDocument.addChunk(data))
                .then(rId=>node.replaceWith(`<w:altChunk r:id="${rId}"/>`))
                .catch(e=>{
                    console.error(e)
                    node.remove()
                })
            promises.push(p)
		}
	}
}
