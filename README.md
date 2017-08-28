# docx-template
create personalized docx from docx template and data

# supported variants following javascript language
## any javascript expression
*<b>plain</b> text form control's <b>tag</b> with pattern <b>${...}</b>
*<b>plain</b> text form control's content with pattern <b>${...}</b>

## picture variable
picture form control's <b>tag</b> with expression pattern <b>${...}</b>

## if(...)[with][{...}]
richtext form control's <b>tag</b> with pattern <b>if(...)[with][{...}]</b>

## for(;;)[with][{...}]
richtext form control's <b>tag</b> with pattern <b>for(;;)[with][{...}]</b>

## sub document
* dynamic: richtext form control's <b>tag</b> with pattern <b>include(exp:subdoc url)</b>
* embed: richtext form control's <b>tag</b> with pattern <b>include()</b>, and content is embeded word ole object

## import javascript code
richtext form control's <b>tag</b> with pattern <b>script(...)</b>, and content is embeded javascript ole object 

# API
## parse(template.docx)
return Promise, resolved with a VariantDocx with following api
	* assemble({}/*data*/, {clearWrap=true/*default clear sdt*/}/*option*/): return Promise resolved docx4js instance

# Example

<pre>
import docxTemplate from "docx-template"

docxTemplate.parse("~/template.docx").then(varDoc=>{
	let staticDocx=varDoc.assemble({name:"foo"})
	staticDocx.save("~/static.docx")
})
</pre>

# Todo
* support javascript file for functions
* inline subdoc

# License
GPL