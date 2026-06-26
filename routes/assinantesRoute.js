import express from 'express';
import AssinantesController from '../controllers/assinantesController.js';

const router = express.Router();
let ctrl = new AssinantesController();

router.get('/', ctrl.listarView);
router.get('/listar', ctrl.listarAssinantes);
router.get('/cadastrar', ctrl.cadastrarView);
// router.get('/alterar/:id', ctrl.alterarView);
router.post('/cadastrar', ctrl.cadastrarAssinante);
// router.post('/excluir', ctrl.deletarUsuario);
// router.post('/alterar', ctrl.alterarUsuario);
export default router;