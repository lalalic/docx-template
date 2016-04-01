import Control from "./control"

export default class ControlVar extends Control{
    assemble(){

    }

    static test(wordModel){
        var text=wordModel.getText()
        return text.charAt(0)=='$' && text.charAt(1)=='{' && text.charAt(text.length-1)=='}'
    }
}
