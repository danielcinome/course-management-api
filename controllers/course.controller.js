/* eslint-disable no-undef */
const { Course, CourseProgress, Lesson, LessonProgress } = require('../models')
const uuid = require('uuid')

exports.getAllCourses = async (req, res) => {
  try {
    const isAdmin = req.user.isAdmin
    const { limit = 10, page = 1, title, startDate, endDate, progress } = req.query
    const offset = (page - 1) * limit
    const where = {}
    if (title) where.title = { [Op.like]: `%${title}%` }
    if (isAdmin === false) where.deletedAt = null
    if (startDate && endDate) where.createdAt = { [Op.between]: [new Date(startDate), new Date(endDate)] }

    const courses = await Course.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        {
          model: CourseProgress,
          where: progress ? { state: progress } : undefined,
          required: false
        },
        {
          model: Lesson,
          attributes: ['id'],
          include: [
            {
              model: LessonProgress,
              where: { userId: req.user.id },
              required: false,
              attributes: ['id', 'state']
            }
          ]
        }
      ]
    })
    console.log(courses)

    courses.rows.forEach(course => {
      course.dataValues.lessonCount = course.Lessons.length
      if (isAdmin === false) course.dataValues.courseProgresses = course.CourseProgresses.state || 'pending'
      delete course.dataValues.Lessons
      delete course.dataValues.CourseProgresses
      delete course.dataValues.id
      delete course.dataValues.deletedAt
      delete course.dataValues.updatedAt
      delete course.dataValues.createdAt
    })

    res.json({
      total: courses.count,
      totalPages: Math.ceil(courses.count / limit),
      data: courses.rows
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.createCourse = async (req, res) => {
  try {
    const { logo, title, description, videoLink, lessons } = req.body
    const publicationDate = new Date()
    const course = await Course.create(
      {
        id: uuid.v4(),
        logo,
        title,
        description,
        publicationDate,
        videoLink
      })

    if (lessons && lessons.length > 0) {
      const createdLessons = await Lesson.bulkCreate(
        lessons.map(lesson => ({ ...lesson, courseId: course.id, id: uuid.v4() }))
      )
      course.dataValues.lessons = createdLessons
    }

    res.status(201).json(course)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.findByPk(id)
    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }
    const { logo, title, description, videoLink, lessons } = req.body
    const updatedCourse = await course.update({ logo, title, description, videoLink })
    if (lessons && lessons.length > 0) {
      const createdLessons = await Promise.all(lessons.map(async (lesson) => {
        const existingLesson = await Lesson.findByPk(lesson.id)
        if (existingLesson) {
          return existingLesson.update({ ...lesson, courseId: course.id })
        } else {
          return Lesson.create({ ...lesson, courseId: course.id })
        }
      }))
      updatedCourse.dataValues.lessons = createdLessons
    }
    res.json(updatedCourse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.addLesson = async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.findByPk(id)
    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }
    const { title, description, videoLink } = req.body
    const lesson = await Lesson.create({ id: uuid.v4(), title, description, videoLink, courseId: course.id })
    res.status(201).json(lesson)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.findByPk(id)
    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }
    course.CourseProgress?.forEach(course => {
      if (course.state !== 'pending') {
        res.status(400).json({ message: 'Course is in progress' })
      }
    })

    await course.update({ deletedAt: new Date() })
    res.json({ message: 'Course soft deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
