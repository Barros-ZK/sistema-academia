import AvaliacoesModel from '../models/avaliacoesModel.js';

class AvaliacoesController {

    constructor() {

    }

    async listarView(req, res) {
        let avaliacao = new AvaliacoesModel();
        let listaAvaliacoes = await avaliacao.listarAvaliacoes("tudo");
        res.render('avaliacoes/listar', { listaAvaliacoes: listaAvaliacoes });
    }

    async listarAvaliacoes(req, res){
        let busca = req.query.busca;
        let parametros = req.query.parametros;

        if (!parametros) {
            parametros = [];
        } else if (!Array.isArray(parametros)) {
            parametros = [parametros];
        }
        
        let avaliacao = new AvaliacoesModel();
        let mapa = new Map();

        for(let i = 0; i < parametros.length; i++) {
            let listaAvaliacoes = await avaliacao.listarAvaliacoes(parametros[i], busca);
            for(let j = 0; j < listaAvaliacoes.length; j++) {
                mapa.set(listaAvaliacoes[j].ava_id, listaAvaliacoes[j]);
            }
        }

        res.send([...mapa.values()]);
    }

    async cadastrarView(req, res) {
        let assinante = new AssinantesModel();
        let listaAssinantes = await assinante.listarAssinantes("tudo");
        res.render('avaliacoes/cadastrar', { listaAssinantes: listaAssinantes });
    }

    async cadastrarAvaliacao(req, res) {
        let ok = false;
        
        const { cpf, data } = req.body;
        const file = req.file;
        if (cpf && data && file) {
            const buffer = file.buffer;
    
            let assinante = new AssinantesModel(cpf, data, buffer);
            ok = await assinante.cadastrarAssinante();
        }

        res.send({ ok: ok })
    }

    async alterarView(req, res) {
        if(req.params != null && req.params.cpf != null){  
            let assinante = new AssinantesModel();        
            assinante = await assinante.listarAssinantes("cpf", req.params.cpf);
            if(assinante.length > 0) {
                res.render('assinantes/alterar', { assinante: assinante });
            } else {
                res.render('home/erroUrl');
            }
        }
    }

    async alterarAvaliacao(req, res){
        let ok = false;
        if(req.body != null) {
            let assinante = new AssinantesModel();
            assinante = await assinante.listarAssinantes("cpf", req.body.cpf);
            if(assinante != null && assinante.length > 0 && req.body.nome != null && req.body.telefone != null) {
                assinante = new AssinantesModel(req.body.cpf, req.body.nome, req.body.telefone);
                ok = await assinante.alterarAssinante();
            }
        }

        res.send({ ok: ok })
    }

    async deletarAvaliacao(req, res){
        let ok = false;
        if(req.body.cpf != null && req.body.cpf > 11111111111){
            let assinante = new AssinantesModel();
            ok = assinante.deletarAssinante(req.body.cpf);
        }
        res.send({ ok: ok })
    }

    async baixarAvaliacao(req, res) {
        let id = req.params.id;
    
        let avaliacao = new AvaliacoesModel();
        avaliacao = await avaliacao.listarAvaliacoes("id", id);
    
        if(avaliacao != null || avaliacao.length != 0) {
            let pdfBuffer = avaliacao[0].ava_pdf;
    
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=avaliacao_${id}.pdf`
            );
        
            res.send(pdfBuffer);
        } else {
            res.render('home/erroUrl');
        }
    }

    async checarData(req, res) {
        let ok = false;
        if(req.query.data != null && req.query.data != undefined) {
            let avaliacao = new AvaliacoesModel();
            avaliacao = await avaliacao.checarData(req.query.data);
            if(avaliacao == 0) {
                ok = true;
            }
        }
        res.send({ ok: ok });
    }

    async checarPdf(req, res) {
        let ok = false;
        if(req.query.pdf != null && req.query.pdf != undefined) {
            if('.pdf'.exec(inputPdf.value)) {
                ok = true;
            }
        }
        res.send({ ok: ok });
    }
}

export default AvaliacoesController;