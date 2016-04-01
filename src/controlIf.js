import Control from "./control"

export default class ControlIf extends Control{
    assemble(){

    }

    static test(wordModel){
        var tag=wordModel.getTag()
        return tag.substring(0,3)==='if(' && tag.charAt(tag.length-1)==')'
    }
}
