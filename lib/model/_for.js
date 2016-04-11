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
		debugger
		var iPara={}, scope=this.variantParent._toJavascript(iPara)
		var setVariables=[]
		this.codeDefVars.forEach(a=>{
			setVariables.push(`stack.${a}=${a};`)
		})

		var code=`${scope} {
						var stacks=[]
						for(${this.code}){
							var stack={}
							${setVariables.join(" ")}
							stacks.push(stack)
						}
						return stacks
					}`
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

	_toJavascript(iPara){
		var varName=`_aa${_uuid++}`
		iPara[varName]=this.stacks[0]
		return `${this.variantParent._toJavascript(iPara)} with(arguments[0].${varName})`
	}
}
