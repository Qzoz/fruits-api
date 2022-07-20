const router = require('express').Router();
const FruitsArticleController = require('../controllers/fruits-article-controller');

router.get('', FruitsArticleController.getAll);

router.get('/:id', FruitsArticleController.get);

router.post('', FruitsArticleController.add);

router.put('/:id', FruitsArticleController.update);

router.delete('/:id', FruitsArticleController.delete);

module.exports = router;
