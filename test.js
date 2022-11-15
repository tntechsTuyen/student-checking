const request = require("request");
const schedule = require('node-schedule');
const notify = require('node-notifier');

const promisifiedRequest = function(options) {
  return new Promise((resolve,reject) => {
    request(options, (error, response, body) => {
      if (response) {
        return resolve(response);
      }
      if (error) {
        return reject(error);
      }
    });
  });
};


async function getLogs() {
	const options = {
    	url: 'http://45.117.83.236:8080/StandardApiAction_queryAlarmDetail.action',
    	method: 'GET',
		qs: {
			jsession: "12ecee9067c94a3c8969c46803e1b781",
			devIdno: "2120305",
			begintime: "2022-11-10 00:00:00",
			endtime: "2022-11-10 23:59:59",
			armType: "1428",
			handle: "0",
			currentPage: "1",
			pageRecords: "50",
			toMap: "2",
			checkend: "0"
		},
    	json: true
  	};

	let alarms = (await promisifiedRequest(options)).body['alarms']

	// const alarms = response.body['alarms'];
	var studentRaw = {}
	for(var i = 0; i < alarms.length; i++){
		var info = alarms[i]['img'].split(";");
		const id = info[3]
		studentRaw[`${id}`] = {
			name: info[0].replace("0,", ""),
			class: info[1],
			id: id,
			code: info[2]
		}
	}
	return studentRaw
}

async function test(){
	const data = await getLogs();
	console.log(data)
}

test()