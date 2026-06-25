const FuncionarioModel = require("../models/funcionarioModel");

class LoginController {

    constructor() {

    }

    async logout(req, res){
        res.clearCookie("funcionarioLogado");
        res.redirect("/login");
        res.end();
    } 

    async loginView(req, res) {
        res.render('login/index', { layout: 'login/index' });
    }

    async autenticarFuncionario(req, res) {
        if(req.body.inputTelefone != "" 
        && req.body.inputSenha != ""){
            let funcionario = new FuncionarioModel();
            funcionario = await funcionario.autenticarFuncionario(req.body.inputTelefone, req.body.inputSenha);
            if(funcionario != null) {
                if(funcionario.fun_ativo == "S") {
                    res.cookie("funcionarioLogado", funcionario.fun_id);
                    res.redirect('/');  
                } else {
                    res.render('login/index', { msgErro: "Funcionário não está mais ativo", layout: 'login/index' })
                }
            }
            else{
                res.render('login/index', { msgErro: "Telefone ou senha inválidos", layout: 'login/index' })
            }
            
        }
        else {
            res.render('login/index', { msgErro: "Preencha os campos corretamente", layout: 'login/index' })
        }
    }
}

module.exports = LoginController;