const restService = require("../service/rest.service")
const dateUtils = require('../utils/date.utils')

const service = {
	selectList: async function(req){
		var alarms = await this.getRaw(req);
		var studentRaw = {}
		if(alarms != null && alarms.length > 0){
			for(var i = 0; i < alarms.length; i++){
				var info = alarms[i]['img'].split(";");
				const id = info[2]
				if(studentRaw[`${id}`] == null){
					studentRaw[`${id}`] = {
						name: info[0].replace("0,", ""),
						class: info[1],
						id: id,
						card: info[3],
						vid: alarms[i]['vid'],
						alarms: []
					}
				}
				stAlarms = studentRaw[`${id}`]['alarms']
				if(stAlarms.length > 0){
					var a = Math.abs(new Date(stAlarms[stAlarms.length - 1]).getTime() - new Date(alarms[i]['eTimeStr']).getTime())/1000
					if(a < 5) continue
				}

				studentRaw[`${id}`]['alarms'].push({
					eTimeStr: alarms[i]['eTimeStr'],
					sps: alarms[i]['sps'],
				})
			}
			
		}
		return studentRaw
	},

	getRaw: async function(req, startTime = dateUtils.format(new Date('2022-11-10'), 'yyyy-MM-dd 00:00:00')){
		const params = {
			jsession: req.session.jsession,
			devIdno: req.query.car_id, // 2120305
			begintime: startTime,
			endtime: dateUtils.format(new Date(req.session.endtime), "yyyy-MM-dd HH:mm:ss"),
			armType: "1428",
			handle: "0",
			currentPage: "1",
			pageRecords: "100",
			toMap: "2",
			checkend: "0"
		}
		console.log(req.query.car_id)
		const res = await restService.get("http://45.117.83.236:8080/StandardApiAction_queryAlarmDetail.action", params)
		return res['alarms']
	},
}

module.exports = service