import Assembler from './assembler'

export default class Docx extends Assembler{
    constructor(){
        super(...arguments)
        this.content={}
        this.assemblerDoc=this
    }

    addVar(name,value){
        this.current[name]=value
    }

    ignoreIf(tag){
        this.current[`if_${tag}`]=false
    }

    addIf(tag){
        this.current[`if_${tag}`]={}
        this.current=this.current[`if_${tag}`]
    }

    addFor(tag){
        this.current[`for_${tag}`]={}
        this.current=this.current[`for_${tag}`]
    }

    assemble(){

    }

    save(name){
        let wDoc=this.srcModel.wDoc
        let zip=wDoc.raw.clone()
        zip.file(wDoc.rels['officeDocument'],this.toString())
        var data=zip.generate({type:"nodebuffer"})

    }

    release(){

    }
}
