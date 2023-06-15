const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Post = require('../models/post.model')
const config = require('../config/auth.config')
// check duplicate email address
const checkDuplicateEmail = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { email: req.body.email } })
		if (user) {
			return res.status(400).json({
				message: 'Email already exists!'
			})
		}
		next()
	} catch (err) {
		return res.status(400).json({
			message: err.message
		})
	}
}

// verify token
const verifyToken = async (req, res, next) => {
	let token = req.headers['authorization'].split(' ')[1]
	if (!token) {
		return res.status(403).json({
			message: 'No token provided!'
		})
	}
	try {
		const payload = await jwt.verify(token, config.secret)
		req.payload = payload
		next()
	} catch (err) {
		return res.status(403).json({
			message: err.message
		})
	}
}

// is post belong to user or not
const isPostBelongsToUser = async (req, res, next) => {
	let token = req.headers['authorization'].split(' ')[1]
	if (!token) {
		return res.status(403).json({
			message: 'No token provided!'
		})
	}
	try {
		// verify token
		const payload = await jwt.verify(token, config.secret)
		// fetch and check is a post belong to the user or not
		const post = await Post.findOne({ where: { id: req.params.id, user: payload.id } })
		if (!post) {
			return res.status(403).json({
				message: `You're not belong to the post`
			})
		}
		req.payload = payload
		next()
	} catch (err) {
		return res.status(403).json({
			message: err.message
		})
	}
}

module.exports = {
	checkDuplicateEmail,
	verifyToken,
	isPostBelongsToUser
}