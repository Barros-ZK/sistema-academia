import AvaliacoesModel from '../models/avaliacoesModel.js';
import AssinantesModel from '../models/assinantesModel.js';

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
    
            let avaliacao = new AvaliacoesModel(0, cpf, data, buffer);
            ok = await avaliacao.cadastrarAvaliacao();
        }

        res.send({ ok: ok });
    }

    async alterarView(req, res) {
        if(req.params != null && req.params.id != null){  
            let avaliacao = new AvaliacoesModel();       
            avaliacao = await avaliacao.listarAvaliacoes("id", req.params.id);
            if(avaliacao.length > 0) {
                let assinante = new AssinantesModel();
                let listaAssinantes = await assinante.listarAssinantes("tudo");

                avaliacao[0].ava_data = new Date(avaliacao[0].ava_data).toISOString().split("T")[0];
                res.render('avaliacoes/alterar', { listaAssinantes: listaAssinantes, avaliacao: avaliacao });
            } else {
                res.render('home/erroUrl');
            }
        }
    }

    async alterarAvaliacao(req, res){
        let ok = false;

        const { id, cpf, data } = req.body;
        if (id && cpf && data) {
            let avaliacao;
            if(req.file) {
                const buffer = req.file.buffer;
                avaliacao = new AvaliacoesModel(Number(id), cpf, data, buffer);
            } else {
                avaliacao = new AvaliacoesModel(Number(id), cpf, data, null);
            }

            ok = await avaliacao.alterarAvaliacao();
        }

        res.send({ ok: ok });
    }

    async excluirAvaliacao(req, res){
        let ok = false;
        if(req.body.id != null && req.body.id > 0){
            let avaliacao = new AvaliacoesModel();       
            ok = avaliacao.excluirAvaliacao(req.body.id);
        }
        res.send({ ok: ok });
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
            if(avaliacao == 1) {
                ok = true;
            }
        }
        res.send({ ok: ok });
    }

    async checarPdf(req, res) {
        let ok = false;
        if(req.query.pdf != null && req.query.pdf != undefined) {
            if(req.query.pdf.toLowerCase().endsWith('.pdf')) {
                ok = true;
            }
        }
        res.send({ ok: ok });
    }
}

export default AvaliacoesController;