const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controllers')
// const authMiddleware = require('../../middleware/auth.middleware')

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login endpoint
 *     description: Authenticate user and generate a token
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post('/login', authController.loginHandler)

router.post(
  '/register',
  // authMiddleware.tokenValidator,
  // authMiddleware.adminChecker,
  authController.handleRegister
)

/**
 * @swagger
 * /api/v1/auth:
 *  get:
 *   summary: Welcome message
 *  description: Welcome message
 * tags:
 *  - Authentication
 * responses:
 * 200:
 * description: Welcome message
 */
router.get('/auth', (req, res) => {
  res.json({
    message: 'Welcome to auth router'
  })
})

module.exports = router
