import FuncionarioModel from '../models/funcionarioModel.js';

class AuthMiddleware {

    async verificarUsuarioLogado(req, res, next) {
        if(req.cookies != undefined && req.cookies.funcionarioLogado != null){
            let funcionarioCpf = req.cookies.funcionarioLogado;
            let funcionario = new FuncionarioModel();
            funcionario = await funcionario.buscarCpfExato(funcionarioCpf);
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
        let funcionarioCpf = req.cookies.funcionarioLogado;
        let funcionario = new FuncionarioModel();
        funcionario = await funcionario.buscarCpfExato(funcionarioCpf);
        if(funcionario != null && funcionario.fun_cargo == "Dono") {
            next();
        }
        else{
            res.redirect("/acessoRestrito");
        }
    }
}

export default AuthMiddleware;