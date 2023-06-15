const { QueryTypes } = require("sequelize")
const sequelize = require("../config/db.config")
const Post = require('../models/post.model')

exports.createPost = async (req, res) => {
	try {
		const data = {
			...req.body,
			user: req.payload.id,
		}
		const post = await Post.create(data)
		res.status(200).json(post)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}

}

exports.getAllPosts = async (req, res) => {
	try {
		const query = `SELECT posts.id, posts.title, posts.description, posts.published, posts.created_at, posts.updated_at, users.id as user_id, users.first_name, users.last_name FROM posts INNER JOIN users ON posts.user = users.id WHERE posts.user=${req.payload.id}`;
		const posts = await sequelize.query(query, { type: QueryTypes.SELECT })
		res.status(200).json(posts)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}

}
exports.getPost = async (req, res) => {
	try {
		const query = `SELECT posts.id, posts.title, posts.description, posts.published, posts.created_at, posts.updated_at, users.id as user_id, users.first_name, users.last_name FROM posts INNER JOIN users ON posts.user = users.id WHERE posts.id=${req.params.id} AND posts.user = ${req.payload.id}`
		const post = await sequelize.query(query, { type: QueryTypes.SELECT })
		res.status(200).json(post[0])
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
exports.updatePost = async (req, res) => {
	try {
		const payload = req.payload;
		if (parseInt(payload.id) !== parseInt(req.params.id)) {
			return res.status(403).json({ message: "You can not update other user" })
		}
		await Post.update(req.body, { where: { id: req.params.id } })
		res.status(200).json({ message: 'Updated successfully' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
exports.deletePost = async (req, res) => {
	try {
		const payload = req.payload;
		if (parseInt(payload.id) !== parseInt(req.params.id)) {
			return res.status(403).json({ message: "You can not delete other user" })
		}
		await Post.update(req.body, { where: { id: req.params.id } })
		res.status(200).json({ message: 'Deleted successfully' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}