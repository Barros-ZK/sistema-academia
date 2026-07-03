//importando os packages instalados
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';

//definindo rotas
import homeRouter from './routes/homeRoute.js';
import assinantesRouter from './routes/assinantesRoute.js';
import avaliacoesRouter from './routes/avaliacoesRoute.js';
import funcionariosRouter from './routes/funcionariosRoute.js';
import loginRouter from './routes/loginRoute.js';
import AuthMiddleware from './middlewares/authMiddleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
//configurando a nossa pasta public
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

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
app.use('/assinantes', assinantesRouter);
app.use('/avaliacoes', avaliacoesRouter);

app.use(auth.verificarUsuarioDono);
app.use('/funcionarios', funcionariosRouter);

const server = app.listen('5000', function() {
    console.log('Sistema web iniciado');
});