const express = require('express');
const cors = require('cors');
const app = express();
/**
 * cors
 */
app.use(cors())
/**
 * body parser
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const sequelize = require('./config/db.config')

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const routes = require('./routes')
app.use(routes)
const port = 2349;
app.listen(port, () => {
	sequelize.sync().then(() => console.log('Database synced.'));
	console.log(`Server running on port ${port}.`);
});
