import Control from "./control"

export default class ControlVar extends Control{
    constructor(){
        super(...arguments)
        let text=this.srcModel.wXml.textContent.trim()
        this.varName=text.substring(1,text.length-2)
    }

    resolve(){
        let value=(new Function("",`return ${this.control}`))()
        this.parentParser.addVar(this.varName,value)
        return false
        /*
        let ts=this.srcModel.wXml.$('t')
        ts[0].textContent=value
        for(var i=1,len=ts.length;i<len;i++)
            ts[i].remove()
        return false
        */
    }

    

    static test(wordModel){
        var text=wordModel.wXml.textContent.trim()
        return text.charAt(0)=='$' && text.charAt(1)=='{' && text.charAt(text.length-1)=='}'
    }
}
