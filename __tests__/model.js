import DocxTemplate from "../src"
import contents from "./content"

describe("docx template models", function(){
   describe("identifier", function(){
        function identify(content,expected){
			let $=DocxTemplate.parseXml(content)
			let sdt=$("w\\:sdt").get(0)
			expect(!!sdt).toBe(true)
			
            let identified=DocxTemplate.identify(sdt,{content:$})
            expect(identified.type).toBe(expected)
			
            return identified
        }

        it("can identify if control: if(.*)", function(){
			identify(contents["if"](),"block.if")
        })

        it("can identify for control:for(var i=10;i>0;i--)", function(){
            identify(contents["for"](),"block.for")
        })

        it("can identify expression control", function(){
            identify(contents["exp"](),"control.text.exp")
        })

        it("can identify picture", function(){
            identify(contents["picture"](),"control.picture.exp")
        })
	})
	
	describe("models",function(){
		const template=content=>DocxTemplate.create().then(docx=>{
			let relDoc=docx.main.getRelTarget("officeDocument")
			docx.parts[relDoc]=DocxTemplate.parseXml(`<w:document><w:body>${content}</w:body></w:document>`)
			return docx
		}).then(docx=>DocxTemplate.parse(docx))
		
		describe("simple",function(){
			const check=(content,type)=>template(content).then(varDoc=>{
				expect(varDoc.children.length).toBe(1)
				let _var=varDoc.children[0]
				expect(_var.constructor.type).toBe(type)
				return varDoc
			})
			
			it("if()",function(){
				return check(contents["if"](),"variant.if")
			}) 

			it("can identify for control:for(var i=10;i>0;i--)", function(){
				return check(contents["for"](),"variant.for")
			})

			it("can identify expression control", function(){
				return check(contents["exp"](),"variant.exp")
			})

			it("can identify picture", function(){
				return check(contents["picture"](),"variant.picture")
			})
		})
		
		describe("nested",function(){
			const check=(content,type)=>template(content).then(varDoc=>{
				expect(varDoc.children.length).toBe(1)
				let _var=varDoc.children[0]
				expect(_var.constructor.type).toBe(type)
				return varDoc
			})
			
			it("if(){for{}}",function(){
				return template(contents["if"](contents["for"]())).then(varDoc=>{
					expect(varDoc.children[0].constructor.type).toBe("variant.if")
					expect(varDoc.children[0].children[0].constructor.type).toBe("variant.for")
				})
			}) 

			it("if(){for,exp}", function(){
				return template(contents["if"](`${contents["for"]()}${contents["exp"]()}`)).then(varDoc=>{
					expect(varDoc.children[0].constructor.type).toBe("variant.if")
					expect(varDoc.children[0].children[0].constructor.type).toBe("variant.for")
					expect(varDoc.children[0].children[1].constructor.type).toBe("variant.exp")
				})
			})
			
			it("if(){for,exp}", function(){
				let variants=new Array(5).fill(contents["exp"]())
				variants.push(contents["for"]())
				return template(contents["if"](variants.join(""))).then(varDoc=>{
					expect(varDoc.children[0].constructor.type).toBe("variant.if")
					let _if=varDoc.children[0]
					expect(_if.children.length).toBe(6)
					expect(_if.children[0].constructor.type).toBe("variant.exp")
					expect(_if.children[5].constructor.type).toBe("variant.for")
				})
			})

			it("for(){if()}", function(){
				return template(contents["for"](contents["if"]())).then(varDoc=>{
					expect(varDoc.children[0].constructor.type).toBe("variant.for")
					expect(varDoc.children[0].children[0].constructor.type).toBe("variant.if")
				})
			})
			
			it("for(){} if(){}", function(){
				return template(`${contents["for"]()}${contents["if"]()}`).then(varDoc=>{
					expect(varDoc.children[0].constructor.type).toBe("variant.for")
					expect(varDoc.children[1].constructor.type).toBe("variant.if")
				})
			})
			
			it("for(){ picture}", function(){
				return template(`${contents["for"]()}${contents["picture"]()}`).then(varDoc=>{
					expect(varDoc.children[0].constructor.type).toBe("variant.for")
					expect(varDoc.children[1].constructor.type).toBe("variant.picture")
				})
			})
		})
	})
})
