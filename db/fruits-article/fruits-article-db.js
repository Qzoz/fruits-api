let fs = require('fs');
let path = require('path');
let DataErrorGen = require('./../db-data-error/db-data-error');

const FILE_NAME = path.join(__dirname, 'fruits-article.json');

module.exports = {
	readJSON: function () {
		try {
			const fileContent = fs.readFileSync(FILE_NAME).toString();
			const json = JSON.parse(fileContent);
			return DataErrorGen.generateData(json);
		} catch (error) {
			return DataErrorGen.generateError(error);
		}
	},
	writeJSON: function (jsonInput) {},
};
