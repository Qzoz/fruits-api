const router = require('express').Router();
const FruitsArticleController = require('../controllers/fruits-article-controller');

router.get('/article', FruitsArticleController.getAll);

router.get('/article/:id', FruitsArticleController.get);

router.post('/article', FruitsArticleController.add);

router.put('/article/:id', FruitsArticleController.update);

router.delete('/article/:id', FruitsArticleController.delete);

module.exports = router;
