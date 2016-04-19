# docx-hub
create personalized docx from docx template and data

# supported variants following javascript language
> any javascript expression
> if(expression)
> for(;;)

# API
## parse(template.docx): for batch
return Promise, resolved with a VariantDocx with following api
{
	assemble({}/*data*/)//return a new docx
}

## assemble(template.docx, {}/*data*/): for transactional
return Promise, resolved with a new docx with following api
{
	download(),//download to local for browser
	save(),//save to file for nodejs
	parse()//continue handle created static docx
}
