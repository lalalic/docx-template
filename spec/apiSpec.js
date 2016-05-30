"use strict";

var newDocx=require("docx4js/spec/newDocx")
var DocxHub=require("../lib")

describe("docx hub", ()=>{
	it("can assemble, and return {parse,save,data}", done=>{
		DocxHub.assemble(newDocx(), {})
		.then(docx=>{
			expect(!!docx.parse).toBe(true)
			expect(!!docx.save).toBe(true)
			expect(!!docx.data).toBe(true)
			expect(!!docx.variantChildren).toBe(true)

			let parsed=false
			docx.parse(DocxHub.createVisitorFactory(function(identifiedWordModel){
				parsed=true
			})).then(a=>{
				expect(parsed).toBe(true)
				done()
			})
			
		}).catch(e=>{fail(e);done()})
	})

	it("can parse, and return {assemble: return {parse,save,data,variantChildren}, variantChildren}", done=>{
		DocxHub.parse(newDocx()).then(docx=>{
			expect(!!docx.variantChildren).toBe(true)
			expect(!!docx.assemble).toBe(true)


			let assembled=docx.assemble({},true)
			expect(!!assembled.parse).toBe(true)
			expect(!!assembled.save).toBe(true)
			expect(!!assembled.data).toBe(true)
			expect(!!assembled.variantChildren).toBe(true)

			let parsed=false
			assembled.parse(DocxHub.createVisitorFactory(function(identifiedWordModel){
				parsed=true
			})).then(a=>{
				expect(parsed).toBe(true)
				done()
			})
		}).catch(e=>{fail(e);done()})
	})

	describe("assembled result api", ()=>{
		it("can save", done=>{
			let Part= require("docx4js/lib/openxml/part")
			spyOn(Part.prototype,'_serialize').and.callThrough()
			spyOn(DocxHub.prototype,'_serialize').and.callThrough()
			if($.isNode){
				let fs="fs",
					file=require("fs")
				spyOn(file,"writeFile").and.returnValue(null)
			}else{
				let span=document.createElement('span')
				spyOn(document,"createElement").and.returnValue(span)
				spyOn(window.URL,"createObjectURL").and.returnValue("")
			}

			DocxHub.assemble(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="922459404"/>
						<w:placeholder>
							<w:docPart w:val="DefaultPlaceholder_1082065158"/>
						</w:placeholder>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p>
							<w:r>
								<w:t>${"${name}"}</w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`), {name:"test"})
			.then(docx=>{
				expect(!!docx.save).toBe(true)
				docx.save()
				expect(Part.prototype._serialize).toHaveBeenCalled()
				expect(DocxHub.prototype._serialize).toHaveBeenCalled()
				done()
			}).catch(e=>{fail(e);done()})
		})
	})
})
