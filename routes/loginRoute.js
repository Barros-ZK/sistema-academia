const express = require('express')
const LoginController = require('../controllers/loginController');

const router = express.Router();

let ctrl = new LoginController();

router.get('/', ctrl.loginView);
router.get('/logout', ctrl.logout);
router.post('/login', ctrl.autenticarFuncionario);

module.exports = router;