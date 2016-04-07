var ControlFor=require("../dist/controlFor")
var ControlVar=require( "../dist/controlVar")
var ControlIf=require( "../dist/controlIf")
var docx4js=require( "docx4js"), Any=docx4js.Visitor
var newDocx=require( "docx4js/spec/newDocx")

describe("docx-hub", function(){
    describe("parser", function(){
        function identify(content, Model, done){
            docx4js.load(newDocx(content)).then(docx=>{
                var a={visit:a=>1}, found=false
                docx.parse(docx4js.createVisitorFactory(function(wordModel){
                    if(wordModel.type=='documentStyles')
                        return null
                    if(wordModel.type=='control.richtext')
                        if (Model.test(wordModel))
                            found=true
                    return a
                }))
                if(!found)
                    fail()
                done()
            }).catch(e=>done(fail(e)))
        }

        it("can identify if control: if(.*)", function(done){
			identify(contents['if'],ControlIf,done)
        })

        it("can identify for control:for(var i=10;i>0;i--)", function(done){
            identify(contents['for'],ControlFor,done)
        })

        it("can identify variable control", function(done){
            identify(contents['var'],ControlVar,done)
        })
    })

    describe("assembly", function(){
        it("can assemble template with variable)")
		
		it("can assemble template with if(*)")
			
		it("can assemble template with ")
    })

    var contents={
        "if":`
            <w:sdt>
                <w:sdtPr>
                    <w:alias w:val="a==1"/>
                    <w:tag w:val="if(a==1)"/>
                    <w:id w:val="922459404"/>
                    <w:placeholder>
                        <w:docPart w:val="DefaultPlaceholder_1082065158"/>
                    </w:placeholder>
                </w:sdtPr>
                <w:sdtEndPr/>
                <w:sdtContent>
                    <w:p>
                        <w:r>
                            <w:t>hello.</w:t>
                        </w:r>
                    </w:p>
                </w:sdtContent>
            </w:sdt>`,
        "for":`
            <w:sdt>
                <w:sdtPr>
                    <w:alias w:val="loop 10 times"/>
                    <w:tag w:val="for(var i=10;i>0;i--)"/>
                    <w:id w:val="922459404"/>
                    <w:placeholder>
                        <w:docPart w:val="DefaultPlaceholder_1082065158"/>
                    </w:placeholder>
                </w:sdtPr>
                <w:sdtEndPr/>
                <w:sdtContent>
                    <w:p>
                        <w:r>
                            <w:t>hello.</w:t>
                        </w:r>
                    </w:p>
                </w:sdtContent>
            </w:sdt>`,
        "var":`
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
            </w:sdt>`
    }

})
