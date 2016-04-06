import Control from "./control"

export default class ControlFor extends Control{
    constructor(){
        super(...arguments)
        this.condition=this.srcModel.getTag()
    }

    resolve(){
        (new Function("m",`${this.condition}{m._loop()}`))(this)
        return false
    }

    _loop(){
        let wXml=this.srcModel.wXml;
        wXml.parentNode.appendChild(wXml.clone())
    }

    static test(wordModel){
        var tag=wordModel.getTag()
        return tag.substring(0,4)==='for(' && tag.charAt(tag.length-1)==')'
    }
}
