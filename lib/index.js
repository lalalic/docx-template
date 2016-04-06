import Docx4js from "docx4js"
import Docx from "./lib/docx"
import Assembler from "./lib/assembler"
import ControlIf from "./lib/controlIf"
import ControlFor from "./lib/controlFor"
import ControlVar from "./lib/controlVar"

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

    assemble(file,data={}){
        return Docx4js.load(file).then(function(docx){
			//how to pass data
                return docx.parse(model.exports.createFactory())
        })
    }
}
