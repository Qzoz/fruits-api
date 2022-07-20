let express = require('express');
let bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api', require('./routes/routes'));

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT}`);
});
