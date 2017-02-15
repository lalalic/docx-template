import Variant from "./variant"

export default class Picture extends Variant{
	static get type(){return"variant.picture"}

	assemble(value){
		if(value==null || value==undefined || value==''){
			this.assembledXml.parentNode.removeChild(this.assembledXml)
		}else{
			let blip=this.assembledXml.$1('graphicData blip')

			this.getImageData(value).then(data=>{
				let id=this.docxPart.addRel({
					type:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
					target:data
				})
				blip.setAttribute("r:embed", id)
			})
		}
		super.assemble(...arguments)
	}

	getImageData(url){
		return new Promise((resolve,reject)=>{
			if($.isNode){
				let requestModel="request"
				let request=require(requestModel).defaults({ encoding: null });
				request.get(url, (error,res,body)=>{
					if (!error && res.statusCode == 200) 
						resolve(new Buffer(body))
					else
						reject(error)
				})
			}else{
				let xmlHTTP = new XMLHttpRequest();
			    xmlHTTP.open('GET',url,true);
			    xmlHTTP.responseType = 'arraybuffer';
			    xmlHTTP.onload = function(e){
					if(this.status==200)
			        	resolve(this.response)
					else
						reject(new Error(this.reponseText))
			    }
			    xmlHTTP.send();
			}
		})
	}
	
	js(){
		return [
			 Expression.PRE_ASSEMBLE(this)
			,{
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "MemberExpression",
						"computed": false,
						"object": {
							"type": "Identifier",
							"name": this.vId
						},
						"property": {
							"type": "Identifier",
							"name": "assemble"
						}
					},
					"arguments": [
						this.code.body[0].expression
					]
				}
			}
			,Expression.POST_ASSEMBLE(this)
		]
	}
}
