const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Post = sequelize.define('Post', {
	title: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
	},
}, {
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	underscored: true,
	tableName: "posts"
});

module.exports = Post;
