import Docx4js from "docx4js"
import VariantDocx from "./variantDocx"
import Parser from "./parser"
import ControlIf from "./controlIf"
import ControlFor from "./controlFor"
import ControlVar from "./controlVar"

Docx4js.factory.extendControl=function(type,wXml,doc,parent){
	if(type!=='richtext')
		return;
	
	let tagEl=wXml.$1('>sdtPr>tag'),
		tag=tagEl && tagEl.attr('w:val') || false
	
	if(tag){
		if(ControlFor.test(tag)){
			return new ControlFor(wXml,doc,parent)
		}else if(ControlIf.test(tag)){
			return new ControlIf(wXml,doc,parent)
		}
	}else if(ControlVar.test(wXml))
		return new ControlVar(wXml,doc,parent)	
}


function createFactory(){
	let ignore={visit:a=>a}
	return Docx4js.createVisitorFactory(function(wordModel,parentParser){
		if(wordModel.type==='control.richtext'){
			if(ControlVar.test(wordModel)){
				return new ControlVar(...arguments)
			}else if(ControlFor.test(wordModel)){
				return new ControlFor(...arguments)
			}else if(ControlIf.test(wordModel)){
				return new ControlIf(...arguments)
			}
		}else if(wordModel.type=='document')
			return new VariantDocx(...arguments)

		return ignore
	})
}
	
export default {
    parse(file){
        return Docx4js.load(file).then(docx=>{
            return docx.parse(createFactory())
        })
    },

    assemble(file,data){
        return this.parse(file).then(variantDocx=>{
            return variantDocx.assemble(data)
        })
    }
}
