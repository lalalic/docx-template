require("../lib")

var docx4js=require("docx4js")
var newDocx=require( "docx4js/spec/newDocx")


describe("docx-hub", function(){
   describe("parser", function(){
        function identify(content, model, done){
			docx4js.load(newDocx(content)).then(docx=>{
                var ignore={visit(){}}
                docx.parse(docx4js.createVisitorFactory(function(wordModel){
					if(wordModel.type==model)
						done()
					else
						return ignore
                }))
            }).catch(e=>done(fail(e)))
        }

        it("can identify if control: if(.*)", function(done){
			identify(contents['if'],"variant.if",done)
        })

        it("can identify for control:for(var i=10;i>0;i--)", function(done){
            identify(contents['for'],"variant.for",done)
        })

        it("can identify expression control", function(done){
            identify(contents['var'],"variant.exp",done)
        })
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
