import {Visitor} from "docx4js"

export default class Parser extends Visitor{
    constructor(srcModel,parentParser){
        super(...arguments)
        parentParser && (this.parserDoc=parentParser.parserDoc)
		this._children=[]
    }

    visit(){
        super.visit(...arguments)
        return this.parse()
    }
    /**
     * find controls
     */
    parse(){

    }
	
	addChild(child){
		this._children.push(child)
		return child
	}

    toString(){
        this.wXml.toString()
    }
}
