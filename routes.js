import { Router } from 'express';
import FruitsArticleController from './controllers/fruits-article-controller.js';

const router = Router();

router.get('/article/init', FruitsArticleController.init);

router.get('/article', FruitsArticleController.getAll);

router.get('/article/:id', FruitsArticleController.get);

router.post('/article', FruitsArticleController.add);

router.put('/article/:id', FruitsArticleController.update);

router.delete('/article/:id', FruitsArticleController.delete);

export default router;
