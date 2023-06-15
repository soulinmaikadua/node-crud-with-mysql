const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const config = require('../config/auth.config')

exports.signup = async (req, res) => {
	try {
		// create new user
		const newUser = await User.create(req.body)
		res.status(201).json(newUser)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

exports.signin = async (req, res) => {
	try {
		// find user by email
		const user = await User.findOne({
			where: {
				email: req.body.email
			}
		})
		// check if user exists or not
		if (!user) {
			return res.status(404).json({ message: `User not found` })
		}
		//  verify password
		const pwdIsValid = await bcrypt.compare(req.body.password, user.password)
		if (!pwdIsValid) {
			return res.status(404).json({ message: `Invalid password` })
		}
		// encrypt token
		const token = jwt.sign(
			{
				id: user.id, email: user.email
			},
			config.secret,
			{
				expiresIn: 86400 // 24 hours
			}
		)
		// response
		res.set('token', token).status(200).json(user)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}