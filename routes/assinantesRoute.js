const express = require('express');
const AssinantesController = require('../controllers/assinantesController');

const router = express.Router();
let ctrl = new AssinantesController();

router.get('/', ctrl.listarView);
router.get('/listar', ctrl.listarAssinantes);
// router.get('/criar', ctrl.criarView);
// router.get('/alterar/:id', ctrl.alterarView);
// router.post('/criar', ctrl.gravarUsuario);
// router.post('/excluir', ctrl.deletarUsuario);
// router.post('/alterar', ctrl.alterarUsuario);
module.exports = router;