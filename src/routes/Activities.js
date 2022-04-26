var express = require("express");
const { createActivity } = require("../controllers/activity.controller");
var router = express.Router();

router.post("/", createActivity);

module.exports = router;
