//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
//definindo rotas
const homeRouter = require('./routes/homeRoute');
const assinantesRouter = require('./routes/assinantesRoute');

const funcionariosRouter = require('./routes/funcionariosRoute');
const loginRouter = require('./routes/loginRoute');
const AuthMiddleware = require('./middlewares/authMiddleware');

const app = express();
//configurando a nossa pasta public
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
//configurando nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');
app.set('views', './views');
//define um title generico para todas as nossas páginas, a variavel title será chamada no nosso arquivo layout na tag title
app.locals.title = "Sistema Academia";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//configurando página de layout
app.set('layout', './layout');
app.use(expressLayouts);
//definindo as rotas que o nosso sistema vai reconhecer através da url do navegador e os middlewares
app.use('/login', loginRouter);

let auth = new AuthMiddleware();
app.use(auth.verificarUsuarioLogado);

app.use('/', homeRouter);
// app.use('/assinantes', assinantesRouter);

// app.use(auth.verificarUsuarioDono);
// app.use('/funcionarios', funcionariosRouter);

const server = app.listen('5000', function() {
    console.log('Servidor web iniciado');
});