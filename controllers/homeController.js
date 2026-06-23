class HomeController {

    constructor() {

    }
    
    homeView(req, res){
        res.render('home/index');
    }

    acessoRestritoView(req, res) {
        res.render('home/acessoRestrito');
    }

}
module.exports = HomeController;