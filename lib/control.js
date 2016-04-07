import Parser from "./parser"

export default class Control extends Parser{
    constructor(){
        super(...arguments)
        this.control=this.srcModel.getTag()
        this.wXml=this.srcModel.wXml.clone()
    }

    /**
     * don't override this if you don't know what you are doing, use resolve
     */
    parse(){
        (raw=>{
            this.srcModel._getValidChildren=this.getResolvingContent
            try{
                return this.resolve()
            }catch(e){
                console.error(e.message)
            }finally{
                this.srcModel._getValidChildren=raw
            }
        })(this.srcModel._getValidChildren)
    }

    /**
     * inheried class should override this, instead of assemble
     */
    resolve(){
        console.log("resolve variant")
    }

    getResolvingContent(){
        return this.wXml.childNodes
    }

    toString(){
        return (this.wXml||"").toString()
    }
}
