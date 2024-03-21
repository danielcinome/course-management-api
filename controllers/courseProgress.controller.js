const { CourseProgress } = require('../models')
const uuid = require('uuid')

exports.createCourseProgress = async (req, res) => {
  const { courseId, userId } = req.body

  try {
    const lessonProgress = await CourseProgress.create({
      id: uuid.v4(),
      courseId,
      userId
    })

    return res.json(lessonProgress)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
