"use strict";

var newDocx=require("docx4js/spec/newDocx")
var DocxHub=require("../lib")

describe("docx hub", ()=>{
	it("can assemble", done=>{
		DocxHub.assemble(newDocx(), {})
		.then(docx=>{
			done()
		}).catch(e=>{fail(e);done()})
	})
	describe("assembled result has same interface with that from docx4js.load()",()=>{
		beforeAll(function(done){
			DocxHub.assemble(newDocx(), {})
			.then(docx=>{
				this.docx=docx
				done()
			}).catch(e=>{fail(e);done()})
		})
		it("parse",function(){
			let docx=this.docx
			let docx4js=require('docx4js')
			expect(!!docx.parse).toBe(true)
			let parsed=false
			docx.parse(docx4js.createVisitorFactory(function(identifiedWordModel){
				parsed=true
			}))
			expect(parsed).toBe(true)
		})
		
		$.isNode && it("save",function(){
			let docx=this.docx
			expect(!!docx.save).toBe(true)
			let path="/a/b/c", fs="fs", file=require(fs)
			spyOn(file,"writeFile").and.callFake(()=>1)
			spyOn(docx.raw,'generate').and.callThrough()
			docx.save(path)
			expect(docx.raw.generate).toHaveBeenCalled()
			expect(file.writeFile).toHaveBeenCalled()
		})
		
		!$.isNode && it("download",function(){
			let docx=this.docx
			expect(!!docx.download).toBe(true)
			
			let jszip=require('jszip')
			spyOn(docx.raw,'generate').and.callThrough()
			docx.download()
			expect(docx.raw.generate).toHaveBeenCalled()
		})
	})
	
	it("can parse", done=>{
		DocxHub.parse(newDocx())
		.then(docx=>{
			done()
		}).catch(e=>{fail(e);done()})
	})
	describe("parsed result", ()=>{
		it("can assemble with different data")
	})
})