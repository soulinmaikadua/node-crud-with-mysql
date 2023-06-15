const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model')
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
// Define the association
// Post.belongsTo(User, { foreignKey: 'user' });
module.exports = Post;
