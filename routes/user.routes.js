const express = require('express')
const controller = require('../controllers/user.controller')
const { checkDuplicateEmail, verifyToken } = require('../middleware')
const router = express.Router()

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUser)
router.put("/:id", verifyToken, controller.updateUser)

module.exports = router