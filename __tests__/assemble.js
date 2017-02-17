import DocxTemplate from "../src"
import contents from "./content"

describe("assemble", function(){
	const template=content=>DocxTemplate.create().then(docx=>{
		let relDoc=docx.main.getRelTarget("officeDocument")
		docx.parts[relDoc]=docx.officeDocument.content
			=DocxTemplate.parseXml(`<w:document><w:body>${content}</w:body></w:document>`)
		return docx
	}).then(docx=>DocxTemplate.parse(docx))
	
	it("",function(){
		return template(contents["if"]()).then(docx=>{
			console.log(docx.js({}))
		})	
	})
})