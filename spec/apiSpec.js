"use strict";

var newDocx=require("docx4js/spec/newDocx")
var DocxHub=require("../lib")

describe("docx hub", ()=>{
	it("can assemble", done=>{
		DocxHub.assemble(newDocx(), {})
		.then(docx=>{
			expect(!!docx.parse).toBe(true)
			expect(!!docx.save).toBe(true)
			expect(!!docx.data).toBe(true)
			
			let parsed=false
			let docx4js=require('docx4js')
			docx.parse(docx4js.createVisitorFactory(function(identifiedWordModel){
				parsed=true
			}))
			expect(parsed).toBe(true)
			done()
		}).catch(e=>{fail(e);done()})
	})
	
	it("can parse", done=>{
		DocxHub.parse(newDocx()).then(docx=>{
			expect(!!docx.variantChildren).toBe(true)
			expect(!!docx.assemble).toBe(true)
			
			
			let assembled=docx.assemble({},true)
			expect(!!assembled.parse).toBe(true)
			expect(!!assembled.save).toBe(true)
			expect(!!assembled.data).toBe(true)
			expect(!!assembled.variantChildren).toBe(true)
			
			let parsed=false
			let docx4js=require('docx4js')
			assembled.parse(docx4js.createVisitorFactory(function(identifiedWordModel){
				parsed=true
			}))
			expect(parsed).toBe(true)
			
			done()
		}).catch(e=>{fail(e);done()})
	})
})