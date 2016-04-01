import Docx4js from "docx4js"
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
            }

            return new Assembler()
        })
    },

    assemble(file,data={}){
        return Docx4js.load(file).then(function(docx){
            return docx.parse(model.exports.createFactory())
        })
    }
}
