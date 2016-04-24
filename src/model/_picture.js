import Variant from "./variant"

export default class Picture extends Variant{
	static get type(){return"variant.picture"}

	_initVariant(){
		super._initVariant()

		/*assemble(code)*/
		this.parsedCode.body[0]={
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
					this.parsedCode.body[0].expression
				]
			}
		}
	}

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
				let proto=url.split(":")[0]
				let http=require(proto)
				http.request(url, res=>{
					let data=new Buffer()
					res.on('data',chunk=>data.append(chunk))
					res.on('end', ()=>resolve(data))
				}).on("error", e=>reject(e))
			}else{
				var xmlHTTP = new XMLHttpRequest();
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
}
