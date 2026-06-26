import AssinantesModel from '../models/assinantesModel.js';

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

        if (!parametros) {
            parametros = [];
        } else if (!Array.isArray(parametros)) {
            parametros = [parametros];
        }
        
        let assinante = new AssinantesModel();
        let mapa = new Map();

        for (let i = 0; i < parametros.length; i++) {
            let listaAssinantes = await assinante.listarAssinantes(parametros[i], busca);
            for(let j = 0; j < listaAssinantes.length; j++) {
                mapa.set(listaAssinantes[j].ass_id, listaAssinantes[j]);
            }
        }

        res.send([...mapa.values()]);
    }

    async cadastrarView(req, res) {
        res.render('assinantes/cadastrar');
    }

    async cadastrarAssinante(req, res) {
        let ok = false;
        if(req.body != null) {
            if(req.body.cpf != null && req.body.nome != null && req.body.telefone != null) {
                let assinante = new AssinantesModel(0, req.body.cpf, req.body.nome, req.body.telefone);
                ok = assinante.cadastrarAssinante();
            }
        }

        res.send({ ok: ok})
    }

    // async deletarUsuario(req, res){
    //     let ok = false;
    //     if(req.body.usuarioId != null && req.body.usuarioId > 0){
    //         let usuarioModel = new UsuarioModel();
    //         ok = usuarioModel.deletarUsuario(req.body.usuarioId);
    //     }
    //     res.send({ok: ok})
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
}

export default AssinantesController;