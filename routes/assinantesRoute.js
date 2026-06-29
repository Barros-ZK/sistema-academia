import express from 'express';
import AssinantesController from '../controllers/assinantesController.js';
import HomeController from '../controllers/homeController.js';

const router = express.Router();
let ctrl = new AssinantesController();
let homeCtrl = new HomeController();

router.get('/', ctrl.listarView);
router.get('/listar', ctrl.listarAssinantes);
router.get('/cadastrar', ctrl.cadastrarView);
router.get('/alterar', homeCtrl.erroUrlView);
router.get('/alterar/:cpf', ctrl.alterarView);
router.post('/cadastrar', ctrl.cadastrarAssinante);
router.post('/alterar', ctrl.alterarAssinante);
// router.post('/excluir', ctrl.deletarUsuario);
export default router;