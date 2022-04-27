var express = require("express");
const { createActivity, updateActivity, deleteActivity, getActivity, getActivityDetails} = require("../controllers/activity.controller");
var router = express.Router();

router.get("/activities", getActivity);
router.get("/activities/:id", getActivityDetails);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
