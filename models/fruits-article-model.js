const FruitsArticleDB = require('./../db/fruits-article/fruits-article-db');
const DataErrorGen = require('./../db/db-data-error/db-data-error');

module.exports = {
	getAllArticles: function () {
		const dataOrError = FruitsArticleDB.readJSON();
		if (DataErrorGen.hasError(dataOrError)) {
			return dataOrError;
		} else {
			return DataErrorGen.getData(dataOrError);
		}
	},
};
