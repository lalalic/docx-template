import docx4js from "docx4js"
import DocxTemplate from "../src"
import contents from "./content"

describe("assemble", function(){
	const template=content=>DocxTemplate.create().then(docx=>{
		let relDoc=docx.main.getRelTarget("officeDocument")
		docx.parts[relDoc]=docx.officeDocument.content
			=DocxTemplate.parseXml(`<w:document><w:body>${content}</w:body></w:document>`)
		return docx
	}).then(docx=>DocxTemplate.parse(docx))

	describe("assemble logic", function(){
		let args=[expect.any(Object), expect.any(Object)]
		it("${name}",()=>{
			return template(contents.exp()).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				let staticDoc=varDoc.assemble({name:"abc"})
				expect(_exp.assemble).toBeCalledWith(...args.concat(["abc"]))
			})
		})

		it("picture",()=>{
			return template(contents.picture()).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				let staticDoc=varDoc.assemble({photo:"abc"})
				expect(_exp.assemble).toBeCalledWith(...args.concat(["abc"]))
			})
		})

		it("if(true)",()=>{
			return template(contents.if()).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				let staticDoc=varDoc.assemble()
				expect(_exp.assemble).toBeCalledWith(...args.concat([true]))
			})
		})

		it("if(false)",()=>{
			return template(contents.if(null,false)).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				let staticDoc=varDoc.assemble()
				expect(_exp.assemble).toBeCalledWith(...args.concat([false]))
			})
		})

		it("if(){exp(name)}",()=>{
			return template(contents.if(contents.exp())).then(varDoc=>{
				let _if=varDoc.children[0]
				_if.assemble=jest.fn()
				let _exp=_if.children[0]
				_exp.assemble=jest.fn()
				let staticDoc=varDoc.assemble({name:"abc"})
				expect(_if.assemble).toBeCalledWith(...args.concat([true]))
				expect(_exp.assemble).toBeCalledWith(...args.concat(["abc"]))
			})
		})


		it("for(var i=0;i<3;i++){}",()=>{
			return template(contents.for(null,"var i=0;i<3;i++")).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assembling=jest.fn()
				_exp.assemble=jest.fn()
				_exp.assembled=jest.fn()
				let staticDoc=varDoc.assemble()
				expect(_exp.assembling).toHaveBeenCalledTimes(1)
				expect(_exp.assemble).toHaveBeenCalledTimes(3)
				expect(_exp.assembled).toHaveBeenCalledTimes(1)
			})
		})

		it("for(var i=0;i<3;i++){ if(){}}",()=>{
			return template(contents.for(contents.if(),"var i=0;i<3;i++")).then(varDoc=>{
				let _for=varDoc.children[0]
				_for.assembling=jest.fn()
				_for.assemble=jest.fn()
				_for.assembled=jest.fn()
				let _if=_for.children[0]
				_if.assemble=jest.fn()
				let staticDoc=varDoc.assemble()
				expect(_for.assembling).toHaveBeenCalledTimes(1)
				expect(_for.assemble).toHaveBeenCalledTimes(3)
				expect(_for.assembled).toHaveBeenCalledTimes(1)
				expect(_if.assemble).toHaveBeenCalledTimes(3)
			})
		})

	})

	describe("assembled content", function(){
		describe("expression", function(){
			it("${name}='abc'",()=>{
				return template(contents.exp()).then(varDoc=>{
					let staticDoc=varDoc.assemble({name:"abc"})
					expect(staticDoc.officeDocument.content.text()).toMatch("abc")
				})
			})

			it("${}==null",()=>{
				return template(contents.exp()).then(varDoc=>{
					let staticDoc=varDoc.assemble({name:null})
					expect(staticDoc.officeDocument.content.text()).toBe("")
				})
			})
			it("${}==''",()=>{
				return template(contents.exp()).then(varDoc=>{
					let staticDoc=varDoc.assemble({name:null})
					expect(staticDoc.officeDocument.content.text()).toBe("")
				})
			})
			it("${}==undefined",()=>{
				return template(contents.exp()).then(varDoc=>{
					let staticDoc=varDoc.assemble({name:undefined})
					expect(staticDoc.officeDocument.content.text()).toBe("")
				})
			})
		})

		describe("picture", function(){
			it("picture",()=>{
				return template(contents.picture()).then(varDoc=>{
					let _pic=varDoc.children[0]
					let p=Promise.resolve([1,2,3])
					_pic.getImageData=jest.fn().mockReturnValue(p)
					let rels=varDoc.docx.officeDocument.rels("Relationship").length
					let staticDoc=varDoc.assemble({photo:"abc"})
					expect(_pic.getImageData).toBeCalledWith("abc")
					return p.then(function(){
						expect(staticDoc.officeDocument.rels("Relationship").length).toBe(rels+1)
						let blip=staticDoc.officeDocument.content("a\\:blip")
						expect(blip.length).toBe(1)
						let rid=blip.attr("r:embed")
						expect(rid).toMatch(/^rId\d?/)
					})
				})
			})
		})

		describe("if", function(){
			it("if(true)", function(){
				return template(contents.if()).then(varDoc=>{
					let staticDoc=varDoc.assemble({})
					expect(staticDoc.officeDocument.content.text()).toMatch("hello")
				})
			})

			it("if(false)", function(){
				return template(contents.if(null,false)).then(varDoc=>{
					let staticDoc=varDoc.assemble({})
					expect(staticDoc.officeDocument.content.text()).toBe("")
				})
			})
		})

		fdescribe("for", function(){
			it("for(var i=0;i<3;i++)", function(){
				return template(contents.for(null,"for(var i=0;i<3;i++)")).then(varDoc=>{
					let staticDoc=varDoc.assemble()
					let text=staticDoc.officeDocument.content.text()
					expect(text).toBe("hello.hello.hello.")
					console.log(text)
				})
			})
		})
	})
})
