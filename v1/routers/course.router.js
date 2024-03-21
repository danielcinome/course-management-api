const express = require('express')
const router = express.Router()
const courseController = require('../../controllers/course.controller')

router.get('/', courseController.getAllCourses)
router.post('/create', courseController.createCourse)
router.patch('/update/:id', courseController.updateCourse)
router.post('/add-lesson/:id', courseController.addLesson)
router.delete('/delete/:id', courseController.deleteCourse)

module.exports = router
