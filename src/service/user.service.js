const restService = require("../service/rest.service")

const service = {
	login: async function(req){
		username = "mod"
		password = "000000"
		const loginInfo = await restService.get("http://45.117.83.236:8080/StandardApiAction_login.action", {account: username, password: password})
		if(loginInfo.result == 0){
			req.session.jsession = loginInfo.jsession
		}
		return loginInfo
	}
}

module.exports = service