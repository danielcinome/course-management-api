const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const uuid = require('uuid')

const secret = process.env.SECRET_KEY

exports.loginHandler = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }]
      }
    })

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid email/username or password' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: 'Invalid email/username or password' })
    }

    const token = jwt.sign(
      { id: user.id, username: user.name, isAdmin: user.role === 'admin' },
      secret,
      {
        expiresIn: '1d'
      }
    )

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      },
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Server error'
    })
  }
}

exports.handleRegister = async (req, res) => {
  const { name, birthdate, email, password, role } = req.body
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }]
    }
  })

  if (existingUser) {
    return res.status(400).json({
      ok: false,
      message: 'Email already exists'
    })
  }

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const newUser = await User.create({
    id: uuid.v4(),
    name,
    email,
    birthdate,
    password: hashedPassword,
    role
  })

  return res.json({
    ok: true,
    data: {
      email: newUser.email,
      name: newUser.name
    }
  })
}
