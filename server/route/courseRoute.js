const express = require("express");
const router = express.Router();
const courseHandler = require("../Controller/courseHandler");
const {Authentication} = require("../middleware/authentication");

router.get("/getAllCourses", Authentication, courseHandler.getAllCourse);
router.post("/registerCourse", Authentication, courseHandler.registerCourse);

module.exports = router