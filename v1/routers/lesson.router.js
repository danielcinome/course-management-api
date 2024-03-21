const express = require('express')
const router = express.Router()
const lessonController = require('../../controllers/lesson.controller')

router.delete('/delete/:id', lessonController.deleteLesson)

module.exports = router
