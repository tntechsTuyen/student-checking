const homeController = require("../controller/home.controller")
var express = require('express')
var expressWs = require('express-ws');
var expressWs = expressWs(express());
const schedule = require('../config/schedule.config')

var router = express.Router()

router.use(function (req, res, next) {
  res.locals.host = `http://${req.get('host')}`
  console.log(req.session.jsession)
  if(req.session.endtime == null){
    req.session.endtime = new Date("2022-11-10 23:00:00").getTime()
  }

  if(req.session.cronScheduled == null){
    // schedule.register(req)
    req.session.cronScheduled = 1
  }
  next()
})

router.get('/', homeController.goHome)

/*=================== * Lading =======================*/
module.exports = router
