import Docx4js from "docx4js"
import VariantDocx from "./variantDocx"
import Assembler from "./assembler"
import ControlIf from "./controlIf"
import ControlFor from "./controlFor"
import ControlVar from "./controlVar"

export default {
    createFactory(){
        return Docx4js.createVisitorFactory(function(wordModel,parentAssembler){
            if(wordModel.type==='control.richtext'){
                if(ControlVar.test(wordModel)){
                    return new ControlVar(...arguments)
                }else if(ControlFor.test(wordModel)){
                    return new ControlFor(...arguments)
                }else if(ControlIf.test(wordModel)){
                    return new ControlIf(...arguments)
                }
            }else if(wordModel.type=='document')
                return new Docx(...arguments)

            return new Assembler(...arguments)
        })
    },

    parse(file){
        return Docx4js.load(file).then(docx=>{
            return docx.parse(this.createFactory())
        })
    },

    assemble(file,data){
        return this.parse(file).then(variantDocx=>{
            return variantDocx.assemble(data)
        })
    }
}
