import DocxHub from "../dist"
import docx4js from "docx4js"
import newDocx from "docx4js/spec/newDocx"

describe("docxhub", function(){
	let template="./test/template.zip"
	
    it("can parse docx with variants", function(done){
        DocxHub.parse(template,).then(function(variantDocx){
            expect(varientDocx).toBeDefined()
			done()
        }).catch(e=>{
			fail(e)
			done()
		})
    })
	
	it("can assemble with data")
	
    })
})
