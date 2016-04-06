import {Visitor} from "docx4js"

export default class Assembler extends Visitor{
    constructor(srcModel,parentAssembler){
        super(...arguments)
        parentAssembler && (this.assemblerDoc=parentAssembler.assemblerDoc)
        this.wXml=this.srcModel.wXml
    }

    visit(){
        super.visit(...arguments)
        if(this.parse()===false)
            return false
    }
    /**
     * find controls
     */
    parse(){

    }

    toString(){
        this.wXml.toString()
    }
}
