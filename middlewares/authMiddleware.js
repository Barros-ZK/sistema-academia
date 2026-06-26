import FuncionarioModel from '../models/funcionarioModel.js';

class AuthMiddleware {

    async verificarUsuarioLogado(req, res, next) {
        if(req.cookies != undefined && req.cookies.funcionarioLogado != null){
            let funcionarioId = req.cookies.funcionarioLogado;
            let funcionario = new FuncionarioModel();
            funcionario = await funcionario.buscarFuncionario(funcionarioId);
            if(funcionario != null && funcionario.fun_ativo == "S") {
                res.locals.funcionario = funcionario.fun_nome;
                next();
            }
            else{
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    }

    async verificarUsuarioDono(req, res, next) {
        let funcionarioId = req.cookies.funcionarioLogado;
        let funcionario = new FuncionarioModel();
        funcionario = await funcionario.buscarFuncionario(funcionarioId);
        if(funcionario != null && funcionario.fun_cargo == "Dono") {
            next();
        }
        else{
            res.redirect("/acessoRestrito");
        }
    }
}

export default AuthMiddleware;