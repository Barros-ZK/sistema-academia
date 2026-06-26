import FuncionarioModel from "../models/funcionarioModel.js";

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
export default HomeController;