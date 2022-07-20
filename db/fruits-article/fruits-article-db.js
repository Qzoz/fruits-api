import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import DataErrorGen from '../../misc/db-data-error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_NAME = path.join(__dirname, 'fruits-article.json');

export default {
	readJSON: function () {
		try {
			const fileContent = fs.readFileSync(FILE_NAME).toString();
			const json = JSON.parse(fileContent);
			return DataErrorGen.generateData(json);
		} catch (error) {
			return DataErrorGen.generateError(error);
		}
	},
	writeJSON: function (jsonInput) {
		try {
			const jsonString = JSON.stringify(jsonInput);
			fs.writeFileSync(FILE_NAME, jsonString);
			return DataErrorGen.generateData({ fileUpdated: true });
		} catch (error) {
			return DataErrorGen.generateError(error);
		}
	},
};
