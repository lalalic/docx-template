import ControlIf from "../../lib/controlIf"
import ControlFor from "../../lib/controlFor"
import ControlVar from "../../lib/controlVar"
import newDocx from "./newDocx"
import docx4js from "docx4js"


function identify(content, Model, done){
    docx4js.load(newDocx(content)).then(docx=>{
        docx.parse(docx4js.createVisistorFactory(function(wordModel){
            if(wordModel.type=='control.richtext')
                if (Model.test(wordModel))
                    done()
        }))
        fail()
        done()
    })
}

describe("identify models", function(){
    it("can identify if control: if(.*)", function(done){
        identify(`
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
    		</w:sdt>`,ControlIf,done)
    })

    it("can identify for control:for(var i=10;i>0;i--)", function(done){
        identify(`
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
    		</w:sdt>`,ControlFor,done)
    })

    it("can identify variable control", function(done){
        identify(`
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
    						<w:t>${name}</w:t>
    					</w:r>
    				</w:p>
                </w:sdtContent>
    		</w:sdt>`,ControlVar,done)
    })
})
