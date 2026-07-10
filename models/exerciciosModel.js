import Database from '../utils/database.js';
const conexao = new Database();

class ExerciciosModel {

    #exe_id;
    #exe_nome;
    #exe_musculo;
    #exe_imagem;

    get exe_id(){return this.#exe_id};
    set exe_id(val){this.#exe_id = val};

    get exe_nome(){return this.#exe_nome};
    set exe_nome(val){this.#exe_nome = val};

    get exe_musculo(){return this.#exe_musculo};
    set exe_musculo(val){this.#exe_musculo = val};

    get exe_imagem(){return this.#exe_imagem};
    set exe_imagem(val){this.#exe_imagem = val};

    constructor(exe_id, exe_nome, exe_musculo, exe_imagem) {
        this.#exe_id = exe_id;
        this.#exe_nome = exe_nome;
        this.#exe_musculo = exe_musculo;
        this.#exe_imagem = exe_imagem;
    }

    async listarExercicios(parametro, busca) {
        let sql = null;
        if(parametro == "id") {
            sql = "select * from tb_exercicios where exe_id like ?";
        } else if(parametro == "nome") {
            sql = "select * from tb_exercicios where exe_nome like ?";
        } else if(parametro == "musculo") {
            sql = "select * from tb_exercicios where exe_musculo like ?";
        } else if(parametro == "tudo") {
            sql = 'select * from tb_exercicios';
        }

        if(sql != null) {
            let rows = await conexao.ExecutaComando(sql, [`%${busca}%`]);
            let listaExercicios = [];
            for(let i = 0; i < rows.length; i++){
                let row = rows[i];
                listaExercicios.push(
                    new ExerciciosModel(row['exe_id'], 
                    row['exe_nome'], row['exe_musculo'], row['exe_imagem'])
                );
            }

            return listaExercicios;
        } else {
            return null;
        }
    }

    async cadastrarExercicio() {
        // let result = null;

        // if(this.#exe_id == 0) {
        //     let sql = "insert into tb_exercicios (exe_nome, exe_musculo, exe_imagem) values (?, ?, ?)";
        //     let valores = [this.#exe_nome, this.#exe_musculo, this.#exe_imagem];
    
        //     result = await conexao.ExecutaComandoNonQuery(sql, valores);
        // }

        // return result;
    }

    async alterarExercicio() {
        // let result = null;

        // let sql;
        // let valores;
        // if(this.#exe_imagem == null) {
        //     sql = "update tb_exercicios set exe_nome = ?, exe_musculo = ? where exe_id = ?";
        //     valores = [this.#exe_nome, this.#exe_musculo, this.#exe_id];
        // } else {
        //     sql = "update tb_exercicios set exe_nome = ?, exe_musculo = ?, exe_imagem = ? where exe_id = ?";
        //     valores = [this.#exe_nome, this.#exe_musculo, this.#exe_imagem, this.#exe_id];
        // }

        // result = await conexao.ExecutaComandoNonQuery(sql, valores);

        // return result;
    }

    async excluirExercicio(id) {
        // let result = null;

        // let sql = "delete from tb_exercicios where exe_id = ?"
        // let valores = [id];

        // result = await conexao.ExecutaComandoNonQuery(sql, valores);

        // return result;
    }

    toJSON() {
        return {
            exe_id: this.exe_id,
            exe_nome: this.#exe_nome,
            exe_musculo: this.#exe_musculo,
            exe_imagem: this.#exe_imagem
        };
    }
}

export default ExerciciosModel;