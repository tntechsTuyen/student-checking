const restService = require("../service/rest.service")

const service = {
	selectList: async function(req){
		const res = await restService.get("http://45.117.83.236:8080/StandardApiAction_getDeviceByVehicle.action", {jsession: req.session.jsession})
		return res['devices']
	}
}

module.exports = service