import express from 'express';
import AvaliacoesController from '../controllers/avaliacoesController.js';
import HomeController from '../controllers/homeController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
let ctrl = new AvaliacoesController;
let homeCtrl = new HomeController();

router.get('/', ctrl.listarView);
router.get('/listar', ctrl.listarAvaliacoes);
router.get('/cadastrar', ctrl.cadastrarView);
router.get('/alterar', homeCtrl.erroUrlView);
router.get('/alterar/:id', ctrl.alterarView);
router.get('/download', homeCtrl.erroUrlView);
router.get('/download/:id', ctrl.baixarAvaliacao);
router.get('/checarData', ctrl.checarData);
router.get('/checarPdf', ctrl.checarPdf);
router.post('/cadastrar', upload.single('pdf'), ctrl.cadastrarAvaliacao);
router.post('/alterar', upload.single('pdf'), ctrl.alterarAvaliacao);
router.post('/excluir', ctrl.deletarAvaliacao);
export default router;