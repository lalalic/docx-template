import DocxHub from "../../lib"
import docx4js from "docx4js"
import newDocx from "docx4js/spec/newDocx"

describe("docxhub", function(){
    it("can assemble with data", function(){
        DocxHub.assemble(""/*docx4js load file*/,{}/*data*/).then(function(assembled){
            assembled.save()
            assembled.release()
        })
    })

    it("can create factory for advanced usage", function(){
        let factory=DocxHub.createFactory()
        docx4js.load("").then(function(docx){
            let assembled=docx.parse(factory)
            assembled.save()
            assembled.release()
        })
    })
})
