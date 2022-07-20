const FruitsArticleModel = require('./../models/fruits-article-model');
const DataErrorGen = require('./../db/db-data-error/db-data-error');

module.exports = {
	getAll: function (req, res) {
		const dataOrError = FruitsArticleModel.getAllArticles();
		if (DataErrorGen.hasError(dataOrError)) {
			res.status(501).json(dataOrError);
		} else {
			res.status(200).json(dataOrError);
		}
	},
	get: function (req, res) {},
	add: function (req, res) {},
	delete: function (req, res) {},
	update: function (req, res) {},
};
