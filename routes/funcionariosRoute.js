import express from 'express';
import FuncionariosController from '../controllers/funcionariosController.js';

const router = express.Router();
let ctrl = new FuncionariosController();

// router.get('/', ctrl.listarView);
router.get('/listar', ctrl.listarFuncionarios);
// router.get('/cadastrar', ctrl.cadastrarView);
// router.get('/alterar/:cpf', ctrl.alterarView);
// router.post('/cadastrar', ctrl.cadastrarAssinante);
// router.post('/alterar', ctrl.alterarAssinante);
// router.post('/excluir', ctrl.deletarUsuario);
export default router;