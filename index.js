const express = require('express')
const app = express()
require('./models')
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger')
const morgan = require('morgan')
const authMiddleware = require('./middleware/auth.middleware')
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1/auth', require('./v1/routers/auth.router'))
app.use('/api/v1/courses', authMiddleware.tokenValidator, require('./v1/routers/course.router'))
app.use('/api/v1/lessons', authMiddleware.tokenValidator, require('./v1/routers/lesson.router'))
app.use('/api/v1/lessonsProgress', authMiddleware.tokenValidator, require('./v1/routers/lessonProgress.router'))
app.use('/api/v1/courseProgress', authMiddleware.tokenValidator, require('./v1/routers/courseProgress.router'))

V1SwaggerDocs(app, PORT)

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: 'Internal server error',
    error: String(err)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening at: ${PORT}`)
})
