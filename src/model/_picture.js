import Expression from "./_exp"

export default class Picture extends Expression{
	static type="variant.picture"

	assemble(docx, node, value){
		if(value==null || value==undefined || value==''){
			node.remove()
		}else{
			return this.getImageData(value).then(data=>{
				let id=docx.officeDocument.addImage(data)
				let blip=node.find('a\\:graphic a\\:blip')
				blip.attr("r:embed", id)
			})
		}
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
}
