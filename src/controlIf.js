import Control from "./control"

export default class ControlIf extends Control{
    getResolvingContent(){
        if((new Function("",`${this.control} return true`))()!===true){
            this.assemblerDoc.ignoreIf(this.srcModel.getTag())
            return []
        }else{
            this.assemblerDoc.addIf(this.srcModel.getTag())
            return super.getResolvingContent()
        }
    }

    static test(wordModel){
        var tag=wordModel.getTag()
        return tag.substring(0,3)==='if(' && tag.charAt(tag.length-1)==')'
    }
}
