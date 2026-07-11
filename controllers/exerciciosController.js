import ExerciciosModel from '../models/exerciciosModel.js';

class ExerciciosController {

    constructor() {

    }

    async listarView(req, res) {
        let listaExercicios = new ExerciciosModel();
        listaExercicios = await listaExercicios.listarExercicios("tudo");
        res.render('exercicios/listar', { listaExercicios: listaExercicios });
    }

    async listarExercicios(req, res){
        let busca = req.query.busca;
        let parametros = req.query.parametros;

        if (!parametros) {
            parametros = [];
        } else if (!Array.isArray(parametros)) {
            parametros = [parametros];
        }
        
        let exercicio = new ExerciciosModel();
        let mapa = new Map();

        for(let i = 0; i < parametros.length; i++) {
            let listaExercicios = await exercicio.listarExercicios(parametros[i], busca);
            for(let j = 0; j < listaExercicios.length; j++) {
                mapa.set(listaExercicios[j].exe_id, listaExercicios[j]);
            }
        }

        res.send([...mapa.values()]);
    }

    async cadastrarView(req, res) {
        res.render('exercicios/cadastrar');
    }

    async cadastrarExercicio(req, res) {
        let ok = false;
        
        const { nome, musculo } = req.body;
        const file = req.file;
        if (nome && musculo && file) {
            const buffer = file.buffer;
    
            let exercicio = new ExerciciosModel(0, nome, musculo, buffer);
            ok = await exercicio.cadastrarExercicio();
        }

        res.send({ ok: ok });
    }

    async alterarView(req, res) {
        // if(req.params != null && req.params.id != null){  
        //     let avaliacao = new AvaliacoesModel();       
        //     avaliacao = await avaliacao.listarAvaliacoes("id", req.params.id);
        //     if(avaliacao.length > 0) {
        //         let assinante = new AssinantesModel();
        //         let listaAssinantes = await assinante.listarAssinantes("tudo");

        //         avaliacao[0].ava_data = new Date(avaliacao[0].ava_data).toISOString().split("T")[0];
        //         res.render('avaliacoes/alterar', { listaAssinantes: listaAssinantes, avaliacao: avaliacao });
        //     } else {
        //         res.render('home/erroUrl');
        //     }
        // }
    }

    async alterarExercicio(req, res){
        // let ok = false;

        // const { id, cpf, data } = req.body;
        // if (id && cpf && data) {
        //     let avaliacao;
        //     if(req.file) {
        //         const buffer = req.file.buffer;
        //         avaliacao = new AvaliacoesModel(Number(id), cpf, data, buffer);
        //     } else {
        //         avaliacao = new AvaliacoesModel(Number(id), cpf, data, null);
        //     }

        //     ok = await avaliacao.alterarAvaliacao();
        // }

        // res.send({ ok: ok });
    }

    async excluirExercicio(req, res){
        // let ok = false;
        // if(req.body.id != null && req.body.id > 0){
        //     let avaliacao = new AvaliacoesModel();       
        //     ok = avaliacao.excluirAvaliacao(req.body.id);
        // }
        // res.send({ ok: ok });
    }

    async baixarExercicio(req, res) {
        // let id = req.params.id;
    
        // let avaliacao = new AvaliacoesModel();
        // avaliacao = await avaliacao.listarAvaliacoes("id", id);
    
        // if(avaliacao != null || avaliacao.length != 0) {
        //     let pdfBuffer = avaliacao[0].ava_pdf;
    
        //     res.setHeader("Content-Type", "application/pdf");
        //     res.setHeader(
        //         "Content-Disposition",
        //         `attachment; filename=avaliacao_${id}.pdf`
        //     );
        
        //     res.send(pdfBuffer);
        // } else {
        //     res.render('home/erroUrl');
        // }
    }

    async checarImg(req, res) {
        let ok = false;
        if(req.query.img != null && req.query.img != undefined) {
            let img = req.query.img.toLowerCase()
            if(img.endsWith('.png') || img.endsWith('.jpeg') || img.endsWith('.jpg')) {
                ok = true;
            }
        }
        res.send({ ok: ok });
    }
}

export default ExerciciosController;