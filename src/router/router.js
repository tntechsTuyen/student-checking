const homeController = require("../controller/home.controller")
const apiController = require("../controller/api.controller")
var express = require('express')
var expressWs = require('express-ws');
var expressWs = expressWs(express());
const schedule = require('../config/schedule.config')
const dateUtils = require('../utils/date.utils')

var router = express.Router()

router.use(function (req, res, next) {
  res.locals.host = `http://${req.get('host')}`
  console.log(req.session.jsession)
  if(req.session.endtime == null){
    req.session.endtime = new Date("2022-11-10 23:00:00").getTime()
  }

  res.locals.endtime = dateUtils.format(new Date(req.session.endtime), 'yyyy-MM-dd HH:mm:ss')
  if(req.session.cronScheduled == null){
    // schedule.register(req)
    req.session.cronScheduled = 1
  }
  next()
})

router.get('/', homeController.goHome)

router.get('/address/info', apiController.info)

/*=================== * Lading =======================*/
module.exports = router
