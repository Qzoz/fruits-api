import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT}`);
});
