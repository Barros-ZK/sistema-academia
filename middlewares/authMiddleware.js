const FuncionarioModel = require("../models/funcionarioModel");
const UsuarioModel = require("../models/funcionarioModel");

class AuthMiddleware {

    async verificarUsuarioLogado(req, res, next) {
        if(req.cookies != undefined && req.cookies.funcionarioLogado != null){
            let funcionarioId = req.cookies.funcionarioLogado;
            let funcionario = new FuncionarioModel();
            funcionario = await funcionario.buscarFuncionario(funcionarioId);
            if(funcionario != null && funcionario.fun_ativo == "S") {
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

module.exports = AuthMiddleware;