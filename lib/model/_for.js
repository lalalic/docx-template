import Variant from "./variant"
import esprima from "esprima"

var _uuid=Date.now()

export default class For extends Variant{
	static get type(){return"variant.for"}

	constructor(){
		super(...arguments)
		this.codeDefVars=[]
		var [varDecl]=this.parsedCode.body
		if(varDecl&&varDecl.type=='VariableDeclaration'){
			varDecl.declarations.forEach(def=>{
				this.codeDefVars.push(def.id.name)
			})
		}
		this.stacks=[]
	}

	assemble(){
		var iPara={}, scope=this.variantParent.toJavascript(iPara)
		var setVariables=[]
		this.codeDefVars.forEach(a=>{
			setVariables.push(`stack["${a}"]=${a};`)
		})

		var code=`${scope} {
						let stacks=[]
						for(${this.code}){
							let stack={}
							${setVariables.join(" ")}
							stacks.push(stack)
						}
						return stacks
					}`
		console.info(code)
		this.stacks=new Function("data",code)(iPara)
	}

	_iterate(f,paramizedVisitFactories){
		if(!this.wDoc.data)
			return super._iterate(...arguments)

		var sdtContent=this.wXml.$1('sdtContent'),
			rawChildren=sdtContent.childNodes.asArray(),
			len=rawChildren.length;

		rawChildren.forEach(a=>{
			sdtContent.removeChild(a)
		})

		this.stacks.forEach(a=>{
			rawChildren.forEach(b=>{
				sdtContent.appendChild(b.cloneNode(true))
			})
		})

		for(var i=0,children=sdtContent.childNodes,l=children?children.length:0; i<l; i++){
			if(i && (i%len==0))
				this.stacks.shift();

			(!this._shouldIgnore(children[i])) && f(children[i])
		}

		this.stacks=[]
	}

	toJavascript(iPara){
		var varName=`_${_uuid++}`
		iPara[varName]=this.stacks[0]
		return `${this.variantParent.toJavascript(iPara)} with(arguments[0]["${varName}"])`
	}
}
