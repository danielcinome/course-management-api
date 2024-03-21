const express = require('express')
const router = express.Router()
const lessonProgressController = require('../../controllers/lessonProgress.controller')

router.post('/create', lessonProgressController.createLessonProgress)

module.exports = router
