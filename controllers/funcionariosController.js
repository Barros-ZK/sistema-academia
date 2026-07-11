import FuncionariosModel from '../models/funcionarioModel.js';

class FuncionariosController {

    constructor() {

    }

    // async listarView(req, res) {
    //     let listaAssinantes = new AssinantesModel();
    //     listaAssinantes = await assinante.listarAssinantes("tudo");
    //     res.render('assinantes/listar', { listaAssinantes: listaAssinantes });
    // }

    async listarFuncionarios(req, res){
        let busca = req.query.busca;
        let parametros = req.query.parametros;

        if (!parametros) {
            parametros = [];
        } else if (!Array.isArray(parametros)) {
            parametros = [parametros];
        }
        
        let funcionario = new FuncionariosModel();
        let mapa = new Map();

        for (let i = 0; i < parametros.length; i++) {
            let listaFuncionarios = await funcionario.listarFuncionarios(parametros[i], busca);
            for(let j = 0; j < listaFuncionarios.length; j++) {
                mapa.set(listaFuncionarios[j].fun_cpf, listaFuncionarios[j]);
            }
        }

        res.send([...mapa.values()]);
    }

    // async cadastrarView(req, res) {
    //     res.render('assinantes/cadastrar');
    // }

    // async cadastrarAssinante(req, res) {
    //     let ok = false;
    //     if(req.body != null) {
    //         if(req.body.cpf != null && req.body.nome != null && req.body.telefone != null) {
    //             let assinante = new AssinantesModel(req.body.cpf, req.body.nome, req.body.telefone);
    //             ok = assinante.cadastrarAssinante();
    //         }
    //     }

    //     res.send({ ok: ok })
    // }

    // async alterarView(req, res) {
    //     if(req.params != null && req.params.cpf != null){  
    //         let assinante = new AssinantesModel();        
    //         assinante = await assinante.listarAssinantes("cpf", req.params.cpf);
    //         res.render('assinantes/alterar', { assinante: assinante });
    //     }
    // }
    
    // async alterarAssinante(req, res){
    //     let ok = false;
    //     if(req.body != null) {
    //         let assinante = new AssinantesModel();
    //         assinante = assinante.listarAssinantes("cpf", req.body.cpf);
    //         if(assinante != null) {
    //             if(assinante.length > 0 && req.body.nome != null && req.body.telefone != null) {
    //                 let assinante = new AssinantesModel(req.body.cpf, req.body.nome, req.body.telefone);
    //             }
    //             ok = assinante.alterarAssinante();
    //         }
    //     }

    //     res.send({ ok: ok })
    // }

    // async deletarUsuario(req, res){
    //     let ok = false;
    //     if(req.body.usuarioId != null && req.body.usuarioId > 0){
    //         let usuarioModel = new UsuarioModel();
    //         ok = usuarioModel.deletarUsuario(req.body.usuarioId);
    //     }
    //     res.send({ok: ok})
    // }
}

export default FuncionariosController;