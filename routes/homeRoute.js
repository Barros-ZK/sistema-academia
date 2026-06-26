import express from 'express';
import HomeController from '../controllers/homeController.js';

const router = express.Router();

let ctrl = new HomeController();

router.get('/', ctrl.homeView);
router.get('/acessoRestrito', ctrl.acessoRestritoView);
export default router;