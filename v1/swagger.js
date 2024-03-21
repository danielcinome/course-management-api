const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Swagger definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Management API Documentation',
      version: '1.0.0',
      description: 'API documentation for the application'
    }
  },
  apis: ['./routers/*.js', './routers/auth.routers.js', '../models/*.js']
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)

// Serve swagger docs the way you like (Recommendation: swagger-ui-express)
const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(`Server listening at: http://localhost:${port}/api/v1/docs`)
}

module.exports = { swaggerDocs }
