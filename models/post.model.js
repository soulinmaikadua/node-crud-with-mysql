const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Post = sequelize.define('Post', {
	title: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
	},
	published: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	user: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "users",
			key: 'id'
		}
	}
}, {
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	underscored: true,
	tableName: "posts"
});
module.exports = Post;
