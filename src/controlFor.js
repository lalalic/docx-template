import Control from "./control"

export default class ControlFor extends Control{
    assemble(){

    }
     
    static test(wordModel){
        var tag=wordModel.getTag()
        return tag.substring(0,4)==='for(' && tag.charAt(tag.length-1)==')'
    }
}
