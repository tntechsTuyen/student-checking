const schedule = require('node-schedule');
const alarmService = require("../service/alarm.service");
const dateUtils = require('../utils/date.utils')
const ws = require('ws');

const config = {
	register: function(req){
		schedule.scheduleJob('*/2 * * * * *', async function(){
			const startTime = dateUtils.format(new Date(req.session.endtime), 'yyyy-MM-dd HH:mm:ss')
			if(req.session.endtime > new Date('2022-11-10 09:00:00').getTime()) return;
			req.session.endtime += 2 * 60 * 60 * 1000
			const raw = await alarmService.getRaw(req, startTime)
			if(raw != null && raw.length > 0){
				const client = new ws('ws://localhost:83');
				client.on('open', () => {
				  // Causes the server to print "Hello"
				  client.send('reload');
				});
			}
			console.log(`Running.....${startTime} -> ${dateUtils.format(new Date(req.session.endtime), 'yyyy-MM-dd HH:mm:ss')}`)
		});
	}
}

module.exports = config