const express = require('express')
const controller = require('../controllers/auth.controller')
const { checkDuplicateEmail } = require('../middleware')
const router = express.Router()

router.post('/signup', checkDuplicateEmail, controller.signup)
router.post('/signin', controller.signin)

module.exports = router