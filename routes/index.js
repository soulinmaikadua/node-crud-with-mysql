const express = require('express')

const router = express.Router()

const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const postRoutes = require('./post.routes')

router.use('/api/auth', authRoutes)
router.use('/api/users', userRoutes)
router.use('/api/posts', postRoutes)

module.exports = router