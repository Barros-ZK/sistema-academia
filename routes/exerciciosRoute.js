import express from 'express';
import ExerciciosController from '../controllers/exerciciosController.js';
import HomeController from '../controllers/homeController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
let ctrl = new ExerciciosController;
let homeCtrl = new HomeController();

router.get('/', ctrl.listarView);
router.get('/listar', ctrl.listarExercicios);
router.get('/cadastrar', ctrl.cadastrarView);
router.get('/alterar', homeCtrl.erroUrlView);
router.get('/alterar/:id', ctrl.alterarView);
router.get('/download', homeCtrl.erroUrlView);
router.get('/checarImg', ctrl.checarImg);
router.post('/cadastrar', upload.single('img'), ctrl.cadastrarExercicio);
router.post('/alterar', upload.single('img'), ctrl.alterarExercicio);
router.post('/excluir', ctrl.excluirExercicio);
export default router;