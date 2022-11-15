const request = require("request");
const restUtils = require('../utils/rest.utils')
const service = {
	get: async function(url, query){
		const options = {
	    	url: url,
	    	method: 'GET',
			qs: query,
	    	json: true
	  	}
	  	const body = (await restUtils.promise(options)).body
	  	if(body.result != 0){
	  		console.error(`[GET] ${url}: ${body.message}`)
	  	}
	  	return body
	}
}

module.exports = service