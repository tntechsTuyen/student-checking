const userService = require("../service/user.service");
const carService = require("../service/car.service");
const alarmService = require("../service/alarm.service");
const dateUtils = require('../utils/date.utils')

const controller = {
	goHome: async function(req, res, next){

		if(req.session.jsession == null) await userService.login(req);
		const cars = await carService.selectList(req)
		if(cars != null && cars.length > 0){
			req.query.car_id = (req.query.car_id == null) ? cars[0]['did'] : req.query.car_id
		}
		const alarms = await alarmService.selectList(req)
		res.render("component/home", {cars: cars, alarms: alarms})
	}
}

module.exports = controller