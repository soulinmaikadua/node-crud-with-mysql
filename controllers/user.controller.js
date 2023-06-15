const User = require('../models/user.model')

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ['password'] }
		})
		res.status(200).json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}

}
exports.getUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, {
			attributes: { exclude: ['password'] }
		})
		res.status(200).json(user)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
exports.updateUser = async (req, res) => {
	try {
		const payload = req.payload;
		if (parseInt(payload.id) !== parseInt(req.params.id)) {
			return res.status(403).json({ message: "You can not update other user" })
		}
		await User.update(req.body, { where: { id: req.params.id } })
		res.status(200).json({ message: 'Updated successfully' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
exports.deleteUser = async (req, res) => {
	try {
		const payload = req.payload;
		if (parseInt(payload.id) !== parseInt(req.params.id)) {
			return res.status(403).json({ message: "You can not update other user" })
		}
		await User.update(req.body, { where: { id: req.params.id } })
		res.status(200).json({ message: 'Updated successfully' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}