import DocxTemplate from "../../src"
	
export default function(content){
	return DocxTemplate.create().then(docx=>{
		let relDoc=docx.main.getRelTarget("officeDocument")
		docx.parts[relDoc]=DocxTemplate.parseXml(`<w:document><w:body>${content}<w:sectPr/></w:body></w:document>`)
		return docx.serialize().generate({type:"nodebuffer"})
	})
}