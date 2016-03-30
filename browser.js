var Docx4js=require("docx4js"),
    Assembler=require("./lib/assembler"),
    ControlIf=require("./lib/controlIf"),
    ControlFor=require("./lib/controlFor"),
    ControlVar=require("./lib/controlVar")

module.exports={
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
