const express = require('express')
const controller = require('../controllers/user.controller')
const { verifyToken } = require('../middleware')
const router = express.Router()

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUser)
router.put("/:id", verifyToken, controller.updateUser)
router.delete("/:id", verifyToken, controller.deleteUser)
module.exports = router