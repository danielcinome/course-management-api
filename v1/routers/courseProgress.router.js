const express = require('express')
const router = express.Router()
const courseProgressController = require('../../controllers/courseProgress.controller')

router.post('/create', courseProgressController.createCourseProgress)

module.exports = router
