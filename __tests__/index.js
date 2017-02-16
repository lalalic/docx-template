import DocxTemplate from "../src"
import docx4js from "docx4js"

describe("docx-template api", function(){
	const file=`${__dirname}/files/api.docx`
	
	it("can parse, and return {assemble, variantChildren}", ()=>{
		expect(DocxTemplate.parse).toBeDefined()
		spyOn(DocxTemplate,"identify")
		return DocxTemplate.parse(file).then(varDoc=>{
			expect(DocxTemplate.identify).toBeCalled()
			expect(!!varDoc.assemble).toBe(true)
		})
	})

	it("can assemble, and return {parse,save,data}",()=>{
		expect(DocxTemplate.assemble).toBeDefined()
		return DocxTemplate.assemble(file).then(staticDoc=>{
			expect(staticDoc.parse).toBeDefined()
			expect(staticDoc.save).toBeDefined()
		})
	})
})