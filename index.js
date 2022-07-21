import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(
	cors({
		origin: '*',
		optionsSuccessStatus: 200,
	})
);
app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT}`);
});
