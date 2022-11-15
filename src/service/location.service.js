const restService = require("../service/rest.service")

const service = {
	info: async function(lat, lng){
		const res = await restService.get(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, null)
		return res
	}
}

module.exports = service