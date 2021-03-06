import Expression from "./_exp"

export default class Picture extends Expression{
	static type="variant.picture"

	assemble(docx, node, {clearWrap}, value){
		if(value==null || value==undefined || value==''){
			node.remove()
		}else{
			let id=docx.officeDocument.addExternalImage(value)
			let blip=node.find('a\\:graphic a\\:blip')
			blip.attr("r:embed", null)
			blip.attr("r:link", id)
			
			if(clearWrap){
				node.replaceWith(node.find(">w\\:sdtContent").children())
			}
		}
	}
}
