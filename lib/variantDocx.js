import Parser from './parser'
import Docx4js from "docx4js"

export default class VariantDocx extends Parser{
    constructor(){
        super(...arguments)
        this.parserDoc=this
    }

    addVar(name,value){
        this._current[name]=value
    }

    ignoreIf(tag){
        this._current[`if_${tag}`]=false
    }

    addIf(tag){
        this._current[`if_${tag}`]={}
        this._current=this._current[`if_${tag}`]
    }

    addFor(tag){
        this._current[`for_${tag}`]={}
        this._current=this._current[`for_${tag}`]
    }

    parse(){
        this._current=this._ast={}
    }
	
	/**
	* @return: DocxDocument 
	*/
	assemble(data){
		
	}

    release(){

    }
}

class DocxDocument extends Docx4js{
    save(name){
        let wDoc=this.srcModel.wDoc
        let zip=wDoc.raw.clone()
        zip.file(wDoc.rels['officeDocument'],this.toString())
        var data=zip.generate({type:"nodebuffer"})
    }
}
