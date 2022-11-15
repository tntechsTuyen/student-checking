const locationService = require("../service/location.service")

const api = {
	info: async function(req, res, next){
		const lng = req.query.lng
		const lat = req.query.lat
		const data = await locationService.info(lat, lng)
		res.json({status: "OK", code: 200, message: "", data: data});
	}
}

module.exports = api