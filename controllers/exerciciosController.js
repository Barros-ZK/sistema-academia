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
        if(req.params != null && req.params.id != null){  
            let exercicio = new ExerciciosModel()      
            exercicio = await avaliacao.listarAvaliacoes("id", req.params.id);
            if(exercicio.length > 0) {
                let musculos = ["Bíceps", "Tríceps", "Antebraço", "Ombro", "Peito", "Costa", "Abdômen", "Quadríceps", "Isquiotibiais", "Glúteo", "Panturrilha", "Miscelânea"];
                res.render('exercicios/alterar', { musculos: musculos, exercicio: exercicio });
            } else {
                res.render('home/erroUrl');
            }
        }
    }

    async alterarExercicio(req, res){
        let ok = false;

        const { id, nome, musculo } = req.body;
        if (id && nome && musculo) {
            let exercicio;
            if(req.file) {
                const buffer = req.file.buffer;
                exercicio = new ExerciciosModel(Number(id), nome, musculo, buffer);
            } else {
                exercicio = new ExerciciosModel(Number(id), nome, musculo, null);
            }

            ok = await exercicio.alterarExercicio();
        }

        res.send({ ok: ok });
    }

    async excluirExercicio(req, res){
        let ok = false;
        if(req.body.id != null && req.body.id > 0){
            let exercicio = new ExerciciosModel();       
            ok = exercicio.excluirExercicio(req.body.id);
        }
        res.send({ ok: ok });
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