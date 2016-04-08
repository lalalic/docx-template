import newDocx from "docx4js/spec/newDocx"
import DocxHub from "../dist"

describe("docxhub", function(){
	describe("can parse template for", function(){
		describe("root", function(){
			function check(content, model, done){
				DocxHub.parse(newDocx(content)).then(variantDocx=>{
					if(variantDocx.variantChildren[0].type==model){
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}
			it("variable",done=>check(contents['var'],'variant.var',done))
				
			it("if", done=>check(contents['if'](),'variant.if',done))
			
			it("for", done=>check(contents['for'](),'variant.for',done))
			
			
		})
		
		describe("nested if", function(){
			function check(content, model, done){
				DocxHub.parse(newDocx(contents['if'](content))).then(variantDocx=>{
					let _if=variantDocx.variantChildren[0]
					if(_if.type=="variant.if" && _if.variantChildren[0].type==model){
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}
			
			it("variable",done=>check(contents['var'],'variant.var',done))
				
			it("if", done=>check(contents['if'](),'variant.if',done))
			
			it("for", done=>check(contents['for'](),'variant.for',done))
		})
		
		describe("nested for", function(){
			function check(content, model, done){
				DocxHub.parse(newDocx(contents['for'](content))).then(variantDocx=>{
					let _if=variantDocx.variantChildren[0]
					if(_if.type=="variant.for" && _if.variantChildren[0].type==model){
						done()
					}else{
						fail()
						done()
					}
				}).catch(e=>{
					fail(e)
					done
				})
			}
			
			it("variable",done=>check(contents['var'],'variant.var',done))
				
			it("if", done=>check(contents['if'](),'variant.if',done))
			
			it("for", done=>check(contents['for'](),'variant.for',done))
		})
		
		let contents={
			"if":a=>`
				<w:sdt>
					<w:sdtPr>
						<w:alias w:val="a==1"/>
						<w:tag w:val="if(1==1)"/>
						<w:id w:val="922459404"/>
						<w:placeholder>
							<w:docPart w:val="DefaultPlaceholder_1082065158"/>
						</w:placeholder>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						${a||`<w:p>
							<w:r>
								<w:t>hello.</w:t>
							</w:r>
						</w:p>`}
					</w:sdtContent>
				</w:sdt>`,
			"for":a=>`
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
						${a||`<w:p>
							<w:r>
								<w:t>hello.</w:t>
							</w:r>
						</w:p>`}
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

	describe("can assemble with data for", function(){
		function check(content, model, data, done, moreExpect){
			console.info(content)
			DocxHub.assemble(newDocx(content), data).then(variantDocx=>{
				expect(variantDocx.variantChildren.length).toBeGreaterThan(0)
				if(variantDocx.variantChildren[0].type==model){
					moreExpect(variantDocx.variantChildren[0])
					done()
				}else{
					fail()
					done()
				}
			}).catch(e=>{
				fail(e)
				done
			})
		}
		it("variable",done=>check(contents['var'],'variant.var',{name:"abc"}, done, assembledVariant=>{
			expect(assembledVariant.wXml.$1('t').textContent=="abc")
		}))
				
		describe("if", function(){
			it("if(true)", done=>check(contents['if']("true"),'variant.if',{},done, assembledVariant=>{
				expect(assembledVariant.wXml.$1('sdtContent').childNodes.length).toBeGreaterThan(0)
			}))
			
			it("if(name=='abc')", done=>check(contents['if']("name='abc'"),'variant.if',{name:"abc"},done, assembledVariant=>{
				expect(assembledVariant.wXml.$1('sdtContent').childNodes.length).toBeGreaterThan(0)
			}))
			
			it("if(false)", done=>check(contents['if']("false"),'variant.if',{},done, assembledVariant=>{
				expect(assembledVariant.wXml.$1('sdtContent').childNodes.length).toBe(0)
			}))
			
			it("if(name=='abcd')", done=>check(contents['if']("name=='abcd'"),'variant.if',{name:"abc"},done, assembledVariant=>{
				expect(assembledVariant.wXml.$1('sdtContent').childNodes.length).toBe(0)
			}))	
		})		
		
		describe("for", function(){
			fit("for(var i=0;i<10;i++)", done=>check(contents['for']("var i=0;i&lt;10;i++"),'variant.for',{},done, assembledVariant=>{
				expect(assembledVariant.wXml.$('p').length).toBe(10)
			}))
				
		})
		
		let contents={
			"if":a=>`
				<w:sdt>
					<w:sdtPr>
						<w:alias w:val="a==1"/>
						<w:tag w:val="if(${a})"/>
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
			"for":(a,b)=>`
				<w:sdt>
					<w:sdtPr>
						<w:alias w:val="loop 10 times"/>
						<w:tag w:val="for(${a})"/>
						<w:id w:val="922459404"/>
						<w:placeholder>
							<w:docPart w:val="DefaultPlaceholder_1082065158"/>
						</w:placeholder>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						${b||`<w:p>
							<w:r>
								<w:t>hello.</w:t>
							</w:r>
						</w:p>`}
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
})
