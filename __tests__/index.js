import DocxTemplate from "../src"

describe("docx-template api", function(){
	const file=`${__dirname}/files/api.docx`
	
	it("can parse, and return {assemble, variantChildren}", ()=>{
		expect(DocxTemplate.parse).toBeDefined()
		return DocxTemplate.parse(file).then(varDoc=>{
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
	
	
	it.skip("can save", ()=>{
		
	})
})