const { Lesson } = require('../models')

exports.deleteLesson = async (req, res) => {
  const { id } = req.params

  try {
    const lesson = await Lesson.findByPk(id)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }
    lesson.LessonProgress?.forEach(lesson => {
      if (lesson.state !== 'pending') {
        return res.status(400).json({ message: 'Lesson already started' })
      }
    })
    await lesson.update({ deletedAt: new Date() })
    res.json({ message: 'Course soft deleted' })

    return res.json({ message: 'Lesson deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
