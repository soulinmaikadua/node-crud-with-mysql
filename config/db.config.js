const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('post', 'root', '', {
	host: '127.0.0.1',
	dialect: 'mysql',
	port: 3306,
	logging: false
});

sequelize
	.authenticate()
	.then(() => console.log('Database connected.'))
	.catch((err) => console.error('Error connecting to database:', err));

module.exports = sequelize