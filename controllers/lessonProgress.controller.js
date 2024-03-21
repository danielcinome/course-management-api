const { LessonProgress } = require('../models')
const uuid = require('uuid')

exports.createLessonProgress = async (req, res) => {
  const { lessonId, userId } = req.body

  try {
    const lessonProgress = await LessonProgress.create({
      id: uuid.v4(),
      lessonId,
      userId
    })

    return res.json(lessonProgress)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
