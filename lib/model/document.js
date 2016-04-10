import BaseDocument from "docx4js/dist/openxml/docx/model/document"

export default class Document extends BaseDocument{
	constructor(){
		super(...arguments)
		Object.assign(this.wDoc,function(variantDocument){
			let _currentContainer,
				_variantContainers=[]
			return {
					beginVariant(variant){
						switch(variant.type){
						case 'variant.exp':
							variant.variantParent=_currentContainer
							_currentContainer.variantChildren.push(variant)
						break
						case 'variant.if':
						case 'variant.for':
							variant.variantParent=_currentContainer
							_currentContainer.variantChildren.push(variant)
							_variantContainers.push(_currentContainer)
						case 'document':
							_currentContainer=variant
						}
						return variant
					},

					endVariant(variant){
						switch(variant.type){
						case 'variant.if':
						case 'variant.for':
							_currentContainer=_variantContainers.pop()
						}
					}
			}
		}(this))

		this.variantParent=null
		this.variantChildren=[]

		this.wDoc.beginVariant(this)
	}

	set data(d){
		this.wDoc.data=d
	}

	get data(){
		return this.wDoc.data
	}

	parse(){
		var r=super.parse(...arguments)
		this.wDoc.endVariant(this)
		delete this.wDoc.data
		return r
	}

	visit(){

	}

	toJavascript(args){
		args._global=this.wDoc.data
		return `with(arguments[0]._global)`
	}
}
