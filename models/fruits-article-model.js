import { nanoid } from 'nanoid';
import moment from 'moment';
import FruitsArticleDB from './../db/fruits-article/fruits-article-db.js';
import DataErrorGen from '../misc/db-data-error.js';

const ID_KEY = '_id';
const DATA_LIMIT = 100;

export default {
	initialize: function () {
		const dataOrError = FruitsArticleDB.readJSON();
		if (DataErrorGen.hasError(dataOrError)) {
			return DataErrorGen.getControllerError(dataOrError);
		}
		const data = DataErrorGen.getData(dataOrError);
		if (data && data.length) {
			for (let article of data) {
				if (!(ID_KEY in article)) {
					article[ID_KEY] = nanoid();
				}
			}
		}
		const writtenOrError = FruitsArticleDB.writeJSON(data);
		if (DataErrorGen.hasError(writtenOrError)) {
			return DataErrorGen.getControllerError(writtenOrError);
		}
		return DataErrorGen.getControllerData(DataErrorGen.getData(writtenOrError));
	},
	getAllArticles: function () {
		const dataOrError = FruitsArticleDB.readJSON();
		if (DataErrorGen.hasError(dataOrError)) {
			return DataErrorGen.getControllerError(dataOrError);
		}
		return DataErrorGen.getControllerData(dataOrError);
	},
	getArticleById: function (id) {
		const dataOrError = FruitsArticleDB.readJSON();
		if (DataErrorGen.hasError(dataOrError)) {
			return DataErrorGen.getControllerError(dataOrError);
		}
		const data = DataErrorGen.getData(dataOrError);
		const objectFound = data.find((each) => each[ID_KEY] === id);
		if (objectFound) {
			return DataErrorGen.getControllerData(objectFound);
		} else {
			return DataErrorGen.getControllerError(null, `No article found for ID: ${id}`);
		}
	},
	addArticle: function (article) {
		const dataOrError = FruitsArticleDB.readJSON();
		if (DataErrorGen.hasError(dataOrError)) {
			return DataErrorGen.getControllerError(dataOrError);
		}
		let data = DataErrorGen.getData(dataOrError);
		if (!data) {
			data = [];
		}
		if (data.length < DATA_LIMIT) {
			data.push(article);
			const writtenOrError = FruitsArticleDB.writeJSON(data);
			if (DataErrorGen.hasError(writtenOrError)) {
				return DataErrorGen.getControllerError(writtenOrError);
			}
			return DataErrorGen.getControllerData(article);
		} else {
			return DataErrorGen.getControllerError(null, `Maximum limit of Articles: ${DATA_LIMIT}`);
		}
	},
	updateArticle: function (id, article) {
		const dataOrError = FruitsArticleDB.readJSON();
		if (DataErrorGen.hasError(dataOrError)) {
			return DataErrorGen.getControllerError(dataOrError);
		}
		const data = DataErrorGen.getData(dataOrError);
		let foundItem = null;
		if (data && data.length) {
			foundItem = data.find((each) => each[ID_KEY] === id);
			if (!foundItem) {
				return DataErrorGen.getControllerError(null, `No article found for ID: ${id}`);
			}
		} else {
			return DataErrorGen.getControllerError(null, 'No article to update');
		}
		if (foundItem) {
			foundItem.url = article.url;
			foundItem.title = article.title;
			foundItem.description = article.description;
		}
		const writtenOrError = FruitsArticleDB.writeJSON(data);
		if (DataErrorGen.hasError(writtenOrError)) {
			return DataErrorGen.getControllerError(writtenOrError);
		}
		return DataErrorGen.getControllerData(foundItem);
	},
	deleteArticleById: function (id) {
		const dataOrError = FruitsArticleDB.readJSON();
		if (DataErrorGen.hasError(dataOrError)) {
			return DataErrorGen.getControllerError(dataOrError);
		}
		const data = DataErrorGen.getData(dataOrError);
		let splicedItem = null;
		if (data && data.length) {
			const itemIndex = data.findIndex((each) => each[ID_KEY] === id);
			if (itemIndex >= 0) {
				splicedItem = data.splice(itemIndex, 1)[0];
			} else {
				return DataErrorGen.getControllerError(null, `No article found for ID: ${id}`);
			}
		} else {
			return DataErrorGen.getControllerError(null, 'No article to delete');
		}
		const writtenOrError = FruitsArticleDB.writeJSON(data);
		if (DataErrorGen.hasError(writtenOrError)) {
			return DataErrorGen.getControllerError(writtenOrError);
		}
		return DataErrorGen.getControllerData(splicedItem);
	},
};

export class Article {
	constructor(url, title, description) {
		this.url = url;
		this.title = title;
		this.description = description;
	}

	assignId() {
		this._id = nanoid();
	}

	assignDate() {
		const currentMoment = moment();
		this.date_month = currentMoment.month() + 1;
		this.date_day = currentMoment.date();
	}
}
