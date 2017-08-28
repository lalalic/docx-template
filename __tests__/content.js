describe("",function(){
	it("",function(){

	})
})
export default {
	"if":(a,b=true)=>`
		<w:sdt>
			<w:sdtPr>
				<w:alias w:val="a==1"/>
				<w:tag w:val="if(${b})"/>
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
	"for":(b,a,c="")=>`
		<w:sdt>
			<w:sdtPr>
				<w:alias w:val="loop 10 times"/>
				<w:tag w:val="for(${a||"var i=0;i&lt;10;i++"})${c}"/>
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
	"exp":a=>`
		<w:sdt>
			<w:sdtPr>
				<w:alias w:val="${a||"${name}"}"/>
				<w:tag w:val="${a||"${name}"}"/>
				<w:id w:val="12965037"/>
				<w:text/>
			</w:sdtPr>
			<w:sdtEndPr/>
			<w:sdtContent>
				<w:p>
					<w:r>
						<w:t>hello</w:t>
					</w:r>
				</w:p>
			</w:sdtContent>
		</w:sdt>`,
	"inlineExp":a=>`
		<w:sdt>
			<w:sdtPr>
				<w:id w:val="12965037"/>
				<w:text/>
			</w:sdtPr>
			<w:sdtEndPr/>
			<w:sdtContent>
				<w:p>
					<w:r>
						<w:t>${a||"${name}"}</w:t>
					</w:r>
				</w:p>
			</w:sdtContent>
		</w:sdt>`,
	"script": (rId="rId7", type="Package", a="")=>`
		<w:sdt>
			<w:sdtPr>
				<w:alias w:val="javascript"/>
				<w:tag w:val="script(${a})"/>
				<w:id w:val="922459404"/>
				<w:placeholder>
					<w:docPart w:val="DefaultPlaceholder_1082065158"/>
				</w:placeholder>
			</w:sdtPr>
			<w:sdtEndPr/>
			<w:sdtContent>
				<w:p>
					<w:r>
						<w:object w:dxaOrig="1479" w:dyaOrig="972">
							<o:OLEObject Type="Embed" ProgID="${type}" r:id="${rId}"/>
						</w:object>
					</w:r>
				</w:p>
			</w:sdtContent>
		</w:sdt>
	`,
	"subdoc":(a="policy",b)=>`
		<w:sdt>
			<w:sdtPr>
				<w:alias w:val="subdoc"/>
				<w:tag w:val="include(${a})"/>
				<w:id w:val="922459404"/>
				<w:placeholder>
					<w:docPart w:val="DefaultPlaceholder_1082065158"/>
				</w:placeholder>
			</w:sdtPr>
			<w:sdtEndPr/>
			<w:sdtContent>
				<w:p>
					<w:r>
						${b||'<w:t>subdoc</w:t>'}
					</w:r>
				</w:p>
			</w:sdtContent>
		</w:sdt>`,
	"picture": a=>`
			<w:sdt>
			  <w:sdtPr>
				<w:alias w:val="${a||"${photo}"}"/>
				<w:tag w:val="${a||"${photo}"}"/>
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
								<a:blip r:embed="unknown">
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
