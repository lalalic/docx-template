# docx-template
create personalized docx from docx template and data

# supported variants following javascript language
## any javascript expression
<b>plain</b> text form control's <b>tag</b> with pattern <b>${...}</b>

## picture variable
picture form control's <b>tag</b> with expression pattern <b>${...}</b>

## if(...)[with][{...}]
richtext form control's <b>tag</b> with pattern <b>if(...)[with][{...}]</b>

## for(;;)[with][{...}]
richtext form control's <b>tag</b> with pattern <b>for(;;)[with][{...}]</b>

## sub document
richtext form control's <b>tag</b> with pattern <b>subdoc(...)</b>


# API
## parse(template.docx)
return Promise, resolved with a VariantDocx with following api
	* assemble({}/*data*/): return Promise resolved docx4js instance

# Example

<pre>
import docxTemplate from "docx-template"

docxTemplate.parse("~/template.docx").then(varDoc=>{
	let staticDocx=varDoc.assemble({name:"foo"})
	staticDocx.save("~/static.docx")
})
</pre>

# Todo
* remove placeholder media/picture