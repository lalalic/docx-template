var DocxHub=require("../lib")
var newDocx=require( "docx4js/spec/newDocx")


describe("docx-hub", function(){
   describe("parser", function(){
        function identify(content, model, done){
			DocxHub.load(newDocx(content)).then(docx=>{
                var ignore={visit(){}}
                docx.parse(DocxHub.createVisitorFactory(function(wordModel){
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

        it("can identify picture", function(done){
            identify(contents['picture'],"variant.picture",done)
        })

        it("can load image for variant.picture", done=>{
            var Picture=require("../lib/model/_picture")
            var getImageData=Picture.prototype.getImageData
            var url=$.isNode ? "http://parse.com/assets/images/server/logo.svg" : "/"
            getImageData(url).then(done).catch(e=>{fail(e);done()})
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
            </w:sdt>`,
        "picture":`
            <w:sdt>
              <w:sdtPr>
                <w:alias w:val="${"${photo}"}"/>
                <w:tag w:val="${"${photo}"}"/>
                <w:id w:val="12965037"/>
                <w:picture/>
              </w:sdtPr>
              <w:sdtEndPr/>
              <w:sdtContent>
                <w:p w14:paraId="3B5C815A" w14:textId="77777777" w:rsidR="001E2BD6" w:rsidRDefault="001E2BD6" w:rsidP="00157BC0">
                  <w:r>
                    <w:rPr>
                      <w:noProof/>
                      <w:lang w:eastAsia="en-US"/>
                    </w:rPr>
                    <w:drawing>
                      <wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="66DB2419" wp14:editId="0004BB16">
                        <wp:extent cx="1901825" cy="1267883"/>
                        <wp:effectExtent l="0" t="0" r="3175" b="2540"/>
                        <wp:docPr id="2" name="Picture 1"/>
                        <wp:cNvGraphicFramePr>
                          <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
                        </wp:cNvGraphicFramePr>
                        <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                          <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                            <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                              <pic:nvPicPr>
                                <pic:cNvPr id="0" name="Picture 1"/>
                                <pic:cNvPicPr>
                                  <a:picLocks noChangeAspect="1" noChangeArrowheads="1"/>
                                </pic:cNvPicPr>
                              </pic:nvPicPr>
                              <pic:blipFill>
                                <a:blip r:embed="rId7">
                                  <a:extLst>
                                    <a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
                                      <a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
                                    </a:ext>
                                  </a:extLst>
                                </a:blip>
                                <a:stretch>
                                  <a:fillRect/>
                                </a:stretch>
                              </pic:blipFill>
                              <pic:spPr bwMode="auto">
                                <a:xfrm>
                                  <a:off x="0" y="0"/>
                                  <a:ext cx="1901825" cy="1267883"/>
                                </a:xfrm>
                                <a:prstGeom prst="rect">
                                  <a:avLst/>
                                </a:prstGeom>
                                <a:noFill/>
                                <a:ln>
                                  <a:noFill/>
                                </a:ln>
                              </pic:spPr>
                            </pic:pic>
                          </a:graphicData>
                        </a:graphic>
                      </wp:inline>
                    </w:drawing>
                  </w:r>
                </w:p>
              </w:sdtContent>
            </w:sdt>`
    }

})
