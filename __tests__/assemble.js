jest.mock("isomorphic-fetch", ()=>{
	return function(content){
		const DocxTemplate=require("../src").default
		return DocxTemplate.create().then(docx=>{
			let relDoc=docx.main.getRelTarget("officeDocument")
			docx.officeDocument.content("w\\:p").replaceWith("${content}")
			let xml=docx.officeDocument.content.xml().replace("${content}",content)
			docx.parts[relDoc]=DocxTemplate.parseXml(xml)
			return docx.serialize().generate({type:"nodebuffer"})
		})
	}
})

import fetch from "isomorphic-fetch"
import docx4js from "docx4js"
import DocxTemplate from "../src"
import contents from "./content"
import xmlescape from "xml-escape"

describe("assemble", function(){
	const template=content=>DocxTemplate.create().then(docx=>{
		let relDoc=docx.main.getRelTarget("officeDocument")
		docx.officeDocument.content("w\\:p").replaceWith("${content}")
		let xml=docx.officeDocument.content.xml().replace("${content}",content)
		docx.parts[relDoc]=DocxTemplate.parseXml(xml)
		return docx
	}).then(docx=>DocxTemplate.parse(docx))

	it("raw id should be reserved", ()=>{
		return template('<w:p id="192"/>').then(varDoc=>{
			return varDoc.assemble({name:"abc"})
				.then(staticDoc=>expect(staticDoc.officeDocument.content("[id]").length).toBe(1))
		})
	})

	describe("assemble logic", function(){
		let args=[expect.any(Object), expect.any(Object),expect.any(Object)]
		it("${name}",()=>{
			return template(contents.exp("${__.name}")).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				return varDoc.assemble({name:"abc"})
					.then(staticDoc=>expect(_exp.assemble).toBeCalledWith(...args.concat(["abc"])))
			})
		})
		
		it("inline ${name}",()=>{
			return template(contents.inlineExp("${__.name}")).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				return varDoc.assemble({name:"abc"})
					.then(staticDoc=>expect(_exp.assemble).toBeCalledWith(...args.concat(["abc"])))
			})
		})

		it("picture",()=>{
			return template(contents.picture("${__.photo}")).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				return varDoc.assemble({photo:"abc"})
					.then(staticDoc=>expect(_exp.assemble).toBeCalledWith(...args.concat(["abc"])))
			})
		})

		it("if(true)",()=>{
			return template(contents.if()).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				return varDoc.assemble()
					.then(staticDoc=>expect(_exp.assemble).toBeCalledWith(...args.concat([true])))
			})
		})

		it("if(false)",()=>{
			return template(contents.if(null,false)).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assemble=jest.fn()
				return varDoc.assemble()
					.then(staticDoc=>expect(_exp.assemble).toBeCalledWith(...args.concat([false])))
			})
		})

		it("if(){exp(name)}",()=>{
			return template(contents.if(contents.exp("${__.name}"))).then(varDoc=>{
				let _if=varDoc.children[0]
				_if.assemble=jest.fn()
				let _exp=_if.children[0]
				_exp.assemble=jest.fn()
				return varDoc.assemble({name:"abc"})
					.then(staticDoc=>{
						expect(_if.assemble).toBeCalledWith(...args.concat([true]))
						expect(_exp.assemble).toBeCalledWith(...args.concat(["abc"]))
					})
			})
		})
		
		it("if(){inline exp(name)}",()=>{
			return template(contents.if(contents.inlineExp("${__.name}"))).then(varDoc=>{
				let _if=varDoc.children[0]
				_if.assemble=jest.fn()
				let _exp=_if.children[0]
				_exp.assemble=jest.fn()
				return varDoc.assemble({name:"abc"})
					.then(staticDoc=>{
						expect(_if.assemble).toBeCalledWith(...args.concat([true]))
						expect(_exp.assemble).toBeCalledWith(...args.concat(["abc"]))
					})
			})
		})


		it("for(var i=0;i<3;i++){}",()=>{
			return template(contents.for(null,"var i=0;i<3;i++")).then(varDoc=>{
				let _exp=varDoc.children[0]
				_exp.assembling=jest.fn()
				_exp.assemble=jest.fn()
				_exp.assembled=jest.fn()
				return varDoc.assemble().then(staticDoc=>{
					expect(_exp.assembling).toHaveBeenCalledTimes(1)
					expect(_exp.assemble).toHaveBeenCalledTimes(3)
					expect(_exp.assembled).toHaveBeenCalledTimes(1)
				})
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
				return varDoc.assemble().then(staticDoc=>{
					expect(_for.assembling).toHaveBeenCalledTimes(1)
					expect(_for.assemble).toHaveBeenCalledTimes(3)
					expect(_for.assembled).toHaveBeenCalledTimes(1)
					expect(_if.assemble).toHaveBeenCalledTimes(3)
				})
			})
		})
		
		it("script:function hello(){}",()=>{
			spyOn(DocxTemplate.OfficeDocument.prototype,"getRelOleObject")
				.and
				.returnValue("function hello(){}")
				
			return template(contents.script()).then(varDoc=>{
				let  _script=varDoc.children[0]
				_script.assemble=jest.fn()
				
				return varDoc.assemble().then(staticDoc=>{
					expect(_script.assemble).toHaveBeenCalledTimes(1)
				})
			})
		})

	})

	describe("assembled content", function(){
		it("xml without id outputed", function(){
			return template(contents.exp("${__.name}")).then(varDoc=>{
					return varDoc.assemble({name:"abc"}).then(staticDoc=>{
						let xml=staticDoc.officeDocument.content.xml()
						expect(xml).not.toMatch(' id="')
					})
				})
		})

		describe("expression", function(){
			it("${name}='abc'",()=>{
				return template(contents.exp("${__.name}")).then(varDoc=>{
					return varDoc.assemble({name:"abc"})
						.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toMatch("abc"))
				})
			})
			
			it("${name}='abc', option={clearWrap}",()=>{
				return template(contents.exp("${__.name}")).then(varDoc=>{
					return Promise.all([
						varDoc.assemble({name:"abc"})
							.then(staticDoc=>{
								expect(staticDoc.officeDocument.content("w\\:sdt").length).toBe(0)
							}),
						varDoc.assemble({name:"abc"},{clearWrap:false})
							.then(staticDoc=>{
								expect(staticDoc.officeDocument.content("w\\:sdt").length).toBe(1)
							})
					])
				})
			})
			
			it(`${name}=<&'">`,()=>{
				return template(contents.exp("${__.name}")).then(varDoc=>{
					return varDoc.assemble({name:`<&'">`})
						.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toMatch(xmlescape(`<&'">`)))
				})
			})			

			it("${}==null",()=>{
				return template(contents.exp("${__.name}")).then(varDoc=>{
					return varDoc.assemble({name:null})
						.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toBe(""))
				})
			})
			it("${}==''",()=>{
				return template(contents.exp("${__.name}")).then(varDoc=>{
					return varDoc.assemble({name:""})
						.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toBe(""))
				})
			})
			it("${}==undefined",()=>{
				return template(contents.exp("${__.name}")).then(varDoc=>{
					return varDoc.assemble({name:undefined})
						.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toBe(""))
				})
			})
			
			describe("inline expression", function(){
				it("${name}='abc'",()=>{
					return template(contents.inlineExp("${__.name}")).then(varDoc=>{
						return varDoc.assemble({name:"abc"})
							.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toMatch("abc"))
					})
				})

				it("${}==null",()=>{
					return template(contents.inlineExp("${__.name}")).then(varDoc=>{
						return varDoc.assemble({name:null})
							.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toBe(""))
					})
				})
				it("${}==''",()=>{
					return template(contents.inlineExp("${__.name}")).then(varDoc=>{
						return varDoc.assemble({name:""})
							.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toBe(""))
					})
				})
				it("${}==undefined",()=>{
					return template(contents.inlineExp("${__.name}")).then(varDoc=>{
						return varDoc.assemble({name:undefined})
							.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toBe(""))
					})
				})
			})
		})

		describe("picture", function(){
			it("picture",()=>{
				return template(contents.picture("${__.photo}")).then(varDoc=>{
					let _pic=varDoc.children[0]
					let rels=varDoc.docx.officeDocument.rels("Relationship").length
					return varDoc.assemble({photo:"abc"}).then(staticDoc=>{
						expect(staticDoc.officeDocument.rels("Relationship").length).toBe(rels+1)
						let blip=staticDoc.officeDocument.content("a\\:blip")
						expect(blip.length).toBe(1)
						let rid=blip.attr("r:link")
						expect(rid).toMatch(/^rId\d?/)
					})
				})
			})
		})

		describe("if", function(){
			it("if(true)", function(){
				return template(contents.if()).then(varDoc=>{
					return varDoc.assemble({})
						.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toMatch("hello"))
				})
			})

			it("if(false)", function(){
				return template(contents.if(null,false)).then(varDoc=>{
					return varDoc.assemble({})
						.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toBe(""))
				})
			})
		})

		describe("for", function(){
			it("for(var i=0;i<3;i++){'hello'}", function(){
				return template(contents.for("<t>hello<t>","var i=0;i<3;i++")).then(varDoc=>{
					return varDoc.assemble().then(staticDoc=>{
						let text=staticDoc.officeDocument.content.text()
						expect(text).toBe("hellohellohello")
					})
				})
			})

			it("for(var i=0;i<3;i++){exp(i)}", function(){
				return template(contents.for(contents.exp("${i}"),"var i=0;i<3;i++")).then(varDoc=>{
					return varDoc.assemble({}).then(staticDoc=>{
						let text=staticDoc.officeDocument.content.text()
						expect(text).toBe("012")
					})
				})
			})

			it("for(let i=0;i<__.employees.length;i++){let emp=__.employees[i];exp(name)}", function(){
				return template(contents.for(contents.exp("${emp.name}"),"let i=0;i<3;i++", "{let emp=__.employees[i];}"))
					.then(varDoc=>{
						return varDoc.assemble({employees:[{name:"test0"},{name:"test1"},{name:"test2"}]
					})
					.then(staticDoc=>{
						let text=staticDoc.officeDocument.content.text()
						expect(text).toBe("test0test1test2")
					})
				})
			})

			it("for(var k=0;k<3;k++){for(var i=0;i<3;i++){exp(i)}}", function(){
				let content=contents.for(contents.for(contents.exp("${i}"),"var i=0;i<3;i++"),"var k=0;k<3;k++")
				return template(content).then(varDoc=>{
					return varDoc.assemble({}).then(staticDoc=>{
						let text=staticDoc.officeDocument.content.text()
						expect(text).toBe("012012012")
					})
				})
			})
		})
	})

	it("multiple assembling times", function(){
		let content=n=>contents.for(contents.for(contents.exp("${__.name}"),`let i=0;i<${n};i++`),`let k=0;k<${n};k++`)
		return template(content(3)).then(varDoc=>{
			let p1=varDoc.assemble({name:"test"}).then(staticDoc=>{
				let expected=new Array(3*3)
				expected.fill("test")
				expect(staticDoc.officeDocument.content.text()).toBe(expected.join(""))
			})

			let p2=varDoc.assemble({name:"world"}).then(staticDoc=>{
				let expected=new Array(3*3)
				expected.fill("world")
				expect(staticDoc.officeDocument.content.text()).toBe(expected.join(""))
			})

			return Promise.all([p1,p2])
		})
	})

	describe("sub document", function(){
		const checkSubDoc=staticDoc=>{
			let chunk=staticDoc.officeDocument.content("w\\:altChunk")
			expect(chunk.length).toBe(1)
			let rId=chunk.attr("r:id")
			let subDocPart=staticDoc.officeDocument.getRel(rId)
			return staticDoc.constructor.load(subDocPart.asUint8Array())
		}
		it("static sub document", ()=>{
			return template(contents.subdoc("__.policy"))
				.then(varDoc=>{
					return varDoc.assemble({policy: '<w:p/>'})
				})
				.then(checkSubDoc)
		})

		it("subdoc with ${exp}",  ()=>{
			return template(contents.subdoc("__.policy"))
				.then(varDoc=>{
					return varDoc.assemble({policy: contents.exp("${__.name}"),name:"raymond"})
				})
				.then(checkSubDoc)
				.then(subDoc=>{
					expect(subDoc.officeDocument.content.text()).toBe("raymond")
				})
		})
		
		it("embed subdoc", ()=>{
			return fetch(contents.exp("${__.name}")).then(subdoc=>{
				spyOn(DocxTemplate.OfficeDocument.prototype,"getRelOleObject")
					.and
					.returnValue(subdoc)
					
				return template(contents.subdoc("", contents["script"]("rId7", "Word.Document.12")))
					.then(varDoc=>{
						return varDoc.assemble({name:"raymond"})
					})
					.then(checkSubDoc)
					.then(subDoc=>{
						expect(subDoc.officeDocument.content.text()).toBe("raymond")
					})
			})
		})

		it("for(var i=0;i<count;i++){subdoc(policy)}",  ()=>{
			return template(contents.for(contents.subdoc("__.policy"),"var i=0;i&lt;__.count;i++"))
				.then(varDoc=>varDoc.assemble({policy: contents.exp("${__.name}"),name:"raymond", count:3}))
				.then(staticDoc=>{
					let chunk=staticDoc.officeDocument.content("w\\:altChunk")
					expect(chunk.length).toBe(3)

					let jobs=chunk.map((i,el)=>{
						let rId=el.attribs["r:id"]
						let subDocPart=staticDoc.officeDocument.getRel(rId)
						return staticDoc.constructor.load(subDocPart.asUint8Array())
					}).get()
					return Promise.all(jobs)
				})
				.then(subdocs=>{
					subdocs.forEach(subDoc=>expect(subDoc.officeDocument.content.text()).toBe("raymond"))
				})
		})

		it("for(let i=0;i<employees.length;i++)with(employees[i]){subdoc(policy)}",  ()=>{
			return template(contents.for(contents.subdoc("__.policy"),"let i=0;i&lt;__.employees.length;i++", "{let emp=__.employees[i];}"))
				.then(varDoc=>{
					return varDoc.assemble({
						policy: contents.exp("${emp.name}"),
						employees:[{name:"raymond0"},{name:"raymond1"},{name:"raymond2"}]
					})
				})
				.then(staticDoc=>{
					let chunk=staticDoc.officeDocument.content("w\\:altChunk")
					expect(chunk.length).toBe(3)

					let jobs=chunk.map((i,el)=>{
						let rId=el.attribs["r:id"]
						let subDocPart=staticDoc.officeDocument.getRel(rId)
						return staticDoc.constructor.load(subDocPart.asUint8Array())
					}).get()

					return Promise.all(jobs)
				})
				.then(subdocs=>{
					let created=subdocs.map(subDoc=>subDoc.officeDocument.content.text())
					let all=["raymond0","raymond1","raymond2"].filter(a=>!created.includes(a))
					expect(all.length).toBe(0)
				})
		})
		
		it("nested subdoc", function(){
						return template(contents.for(contents.subdoc("__.policy"),"let i=0;i&lt;__.employees.length;i++", "{let emp=__.employees[i];}"))
				.then(varDoc=>{
					return varDoc.assemble({
						policy: contents.exp("${emp.name}")+contents.subdoc("__.sale"),
						sale: contents.inlineExp("${emp.name+'good'}"),
						employees:[{name:"raymond0"},{name:"raymond1"},{name:"raymond2"}]
					})
				})
				.then(staticDoc=>{
					let chunk=staticDoc.officeDocument.content("w\\:altChunk")
					expect(chunk.length).toBe(3)

					let jobs=chunk.map((i,el)=>{
						let rId=el.attribs["r:id"]
						let subDocPart=staticDoc.officeDocument.getRel(rId)
						return staticDoc.constructor.load(subDocPart.asUint8Array())
					}).get()

					return Promise.all(jobs)
				})
				.then(subdocs=>{
					let created=subdocs.map(subDoc=>subDoc.officeDocument.content.text())
					let all=["raymond0","raymond1","raymond2"].filter(a=>!created.includes(a))
					expect(all.length).toBe(0)
					return Promise.all(subdocs.map(staticDoc=>{
						let chunk=staticDoc.officeDocument.content("w\\:altChunk")
						expect(chunk.length).toBe(1)
						let rId=chunk.attr("r:id")
						let subDocPart=staticDoc.officeDocument.getRel(rId)
						return staticDoc.constructor.load(subDocPart.asUint8Array())
					}))
				})
				.then(nestedSubDocs=>{
					let created=nestedSubDocs.map(subDoc=>subDoc.officeDocument.content.text())
					let all=["raymond0good","raymond1good","raymond2good"].filter(a=>!created.includes(a))
					expect(all.length).toBe(0)
				})
		})
	})
	
	describe("script", function(){
		it("function hello(){}",()=>{
			spyOn(DocxTemplate.OfficeDocument.prototype,"getRelOleObject")
				.and
				.returnValue(`
					function hello(){
						return "hello"
					}
				`)

			return template(contents.script()+contents.exp("${hello(__.name)}")).then(varDoc=>{
				return varDoc.assemble({name:"abc"})
					.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toMatch("hello"))
			})
		})
		
		it("function hello(){} function trim(){}",()=>{
			spyOn(DocxTemplate.OfficeDocument.prototype,"getRelOleObject")
				.and
				.returnValue(`
					function hello(){
						return "hello"
					}
					function trim(a){
						return a.trim()
					}
				`)

			return template(contents.script()+contents.exp("${hello(__.name)}")).then(varDoc=>{
				return varDoc.assemble({name:"abc"})
					.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toMatch("hello"))
			})
		})
		
		it("var vendor='docx-template';function hello(){}",()=>{
			spyOn(DocxTemplate.OfficeDocument.prototype,"getRelOleObject")
				.and
				.returnValue(`
					var vendor='docx-template';function hello(){return "hello"}
				`)

			return template(contents.script()+contents.exp("${hello(__.name)}")).then(varDoc=>{
				return varDoc.assemble({name:"abc"})
					.then(staticDoc=>expect(staticDoc.officeDocument.content.text()).toMatch("hello"))
			})
		})
	})
})
