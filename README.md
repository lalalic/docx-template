# docx-hub
create personalized docx from docx template and data

# supported variants following javascript language
## any javascript expression
richtext form control's text content with pattern <b>${...}</b>

## if(...)[with][{...}]
richtext form control's <b>tag</b> with pattern <b>if(...)[with][{...}]</b>

## for(;;)[with][{...}]
richtext form control's <b>tag</b> with pattern <b>for(;;)[with][{...}]</b>

## picture variable
picture form control's <b>tag</b> with expression pattern <b>${...}</b>

# API
## parse(template.docx): for multiple assembly
return Promise, resolved with a VariantDocx with following api
	* assemble({}/*data*/,transactional?)
	* variantChildren

## assemble(template.docx, {}/*data*/): for transactional assembly
return Promise, resolved with a new docx with following api

	* save(filename?): save to file for nodejs
	* parse([...docx4js compatible visitor factories])
	* variantChildren
	* data: jszip docx data

# Example

## Transactional
	require("docx-hub")
	.assemble(input.files[0],{name:"test"})
	.then(assembled=>assembled.save)

## Batch

	let docxhub1=require("docx-hub").parse(input.files[0])
	docxhub1.assemble({name:"John"})
		.save()
	docxhub1.assemble({name:"Mike"})
		.parse(require("docx2html").factory)
	dochub1.assemble({name:"Jason"})
		.save()
