const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const bcrypt = require('bcrypt');
const User = sequelize.define('User', {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	underscored: true,
	tableName: "users"
});
User.beforeCreate(async (user) => {
	if (user.password) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	}
});

User.beforeUpdate(async (user) => {
	if (user.changed('password')) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	}
});
module.exports = User;
