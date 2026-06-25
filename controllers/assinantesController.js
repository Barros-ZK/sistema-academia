const AssinantesModel = require('../models/assinantesModel');

class AssinantesController {

    constructor() {

    }

    async listarView(req, res) {
        let assinante = new AssinantesModel();
        let listaAssinantes = await assinante.listarAssinantes("tudo");
        res.render('assinantes/listar', { listaAssinantes: listaAssinantes });
    }

    async listarAssinantes(req, res){
        let busca = req.query.busca;
        let parametros = req.query.parametros;
        let assinante = new AssinantesModel();
        let retorno = [];

        for(let i = 0; i < parametros.length; i++) {
            let listaAssinantes = await assinante.listarAssinantes(parametros[i], busca);
            
            let retornoSet = new Set([ ...retorno, ...listaAssinantes]);
            retorno = [...retornoSet];
        }

        res.send(retorno);
    }

    // async deletarUsuario(req, res){
    //     let ok = false;
    //     if(req.body.usuarioId != null && req.body.usuarioId > 0){
    //         let usuarioModel = new UsuarioModel();
    //         ok = usuarioModel.deletarUsuario(req.body.usuarioId);
    //     }
    //     res.send({ok: ok})
    // }

    // async criarView(req, res) {
    //     //chame o método que lista os perfis
    //     let perfilModel = new PerfilModel();
    //     let listaPerfil = await perfilModel.listar();
    //     res.render('usuarios/criar', { lista: listaPerfil });
    // }

    // async alterarView(req, res) {
    //     let usuarioModel = new UsuarioModel();
    //     if(req.params != null && req.params.id != null){
    //         let cripto = new Criptografia();
    //         let usuarioId = cripto.descriptografa(req.params.id);           
    //         usuarioModel = await usuarioModel.buscarUsuario(usuarioId);
    //     }
    //     let perfilModel = new PerfilModel();
    //     let listaPerfil = await perfilModel.listar();
    //     res.render('usuarios/alterar', { lista: listaPerfil, usuAlteracao: usuarioModel });
    // }

    // async alterarUsuario(req, res){
    //     let ok = false;
    //     if(req.body != null) {
    //         if(req.body.id > 0 && req.body.nome != null && req.body.email != null && req.body.senha != null && req.body.confSenha != null && req.body.perfilId != null && req.body.ativo != null) {
    //             if(req.body.senha == req.body.confSenha && req.body.perfilId > 0) {
    //                 let ativo = req.body.ativo ? "S" : "N";
    //                 let cripto = new Criptografia()
    //                 let usuario = new UsuarioModel(req.body.id, req.body.nome, req.body.email, req.body.senha, ativo, req.body.perfilId);
    //                 usuario.usuarioId = cripto.descriptografa(req.body.id);
    //                 ok = usuario.gravarUsuario();
    //             }
    //         }
    //     }

    //     res.send({ ok: ok})
    // }

    // async gravarUsuario(req, res) {
    //     let ok = false;
    //     if(req.body != null) {
    //         if(req.body.nome != null && req.body.email != null && req.body.senha != null && req.body.confSenha != null && req.body.perfilId != null && req.body.ativo != null) {
    //             if(req.body.senha == req.body.confSenha && req.body.perfilId > 0) {
    //                 let ativo = req.body.ativo ? "S" : "N";
    //                 let usuario = new UsuarioModel(0, req.body.nome, req.body.email, req.body.senha, ativo, req.body.perfilId);
    //                 ok = usuario.gravarUsuario();
    //             }
    //         }
    //     }

    //     res.send({ ok: ok})
    // }
}

module.exports = AssinantesController;