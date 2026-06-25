const FuncionarioModel = require("../models/funcionarioModel");

class HomeController {

    constructor() {

    }
    
    async homeView(req, res){
        res.render('home/index');
    }

    async acessoRestritoView(req, res) {
        res.render('home/acessoRestrito');
    }

}
module.exports = HomeController;