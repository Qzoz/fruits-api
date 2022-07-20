import FruitsArticleModel, { Article } from './../models/fruits-article-model.js';
import DataErrorGen from '../misc/db-data-error.js';

function handleErrorAndData(res, error, data, customErrorCode = 501) {
	if (error) {
		res.status(customErrorCode).json(error);
	} else {
		res.status(200).json(data);
	}
}

export default {
	init: function (req, res) {
		const [error, data] = FruitsArticleModel.initialize();
		handleErrorAndData(res, error, data);
	},
	getAll: function (req, res) {
		const [error, data] = FruitsArticleModel.getAllArticles();
		handleErrorAndData(res, error, data);
	},
	// :id
	get: function (req, res) {
		const [error, data] = FruitsArticleModel.getArticleById(req.params.id);
		handleErrorAndData(res, error, data, 404);
	},
	// url, title, description
	add: function (req, res) {
		if (req.body && req.body.url && req.body.title && req.body.description) {
			const article = new Article(req.body.url, req.body.title, req.body.description);
			article.assignId();
			article.assignDate();
			const [error, data] = FruitsArticleModel.addArticle(article);
			handleErrorAndData(res, error, data, 400);
		} else {
			handleErrorAndData(res, DataErrorGen.generateError('Incomplete request body. It should be of type {url, title, description}'), null, 400);
		}
	},
	// url, title, description
	update: function (req, res) {
		if (req.body && req.body.url && req.body.title && req.body.description) {
			const article = new Article(req.body.url, req.body.title, req.body.description);
			const [error, data] = FruitsArticleModel.updateArticle(req.params.id, article);
			handleErrorAndData(res, error, data, 400);
		} else {
			handleErrorAndData(res, DataErrorGen.generateError('Incomplete request body. It should be of type {url, title, description}'), null, 400);
		}
	},
	delete: function (req, res) {
		const [error, data] = FruitsArticleModel.deleteArticleById(req.params.id);
		handleErrorAndData(res, error, data, 404);
	},
};
