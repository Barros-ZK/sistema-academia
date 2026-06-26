import express from 'express';
import LoginController from '../controllers/loginController.js';

const router = express.Router();

let ctrl = new LoginController();

router.get('/', ctrl.loginView);
router.get('/logout', ctrl.logout);
router.post('/login', ctrl.autenticarFuncionario);

export default router;