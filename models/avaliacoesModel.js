import Database from '../utils/database.js';
const conexao = new Database();

class AvaliacoesModel {

    #ava_id;
    #ass_cpf;
    #ava_data;
    #ava_pdf;

    get ava_id(){return this.#ava_id};
    set ava_id(val){this.#ava_id = val};

    get ass_cpf(){return this.#ass_cpf};
    set ass_cpf(val){this.#ass_cpf = val};

    get ava_data(){return this.#ava_data};
    set ava_data(val){this.#ava_data = val};

    get ava_pdf(){return this.#ava_pdf};
    set ava_pdf(val){this.#ava_pdf = val};

    constructor(ava_id, ass_cpf, ava_data, ava_pdf) {
        this.#ava_id = ava_id;
        this.#ass_cpf = ass_cpf;
        this.#ava_data = ava_data;
        this.#ava_pdf = ava_pdf;
    }

    async listarAvaliacoes(parametro, busca) {
        let sql = null;
        if(parametro == "id") {
            sql = "select * from tb_avaliacoes where ava_id like ?";
        } else if(parametro == "cpf") {
            sql = "select * from tb_avaliacoes where ass_cpf like ?";
        } else if(parametro == "data") {
            sql = "select * from tb_avaliacoes where ava_data like ?";
        } else if(parametro == "tudo") {
            sql = 'select * from tb_avaliacoes';
        }

        if(sql != null) {
            let rows = await conexao.ExecutaComando(sql, [`%${busca}%`]);
            let listaAvaliacoes = [];
            for(let i = 0; i < rows.length; i++){
                let row = rows[i];
                listaAvaliacoes.push(
                    new AvaliacoesModel(row['ava_id'], 
                    row['ass_cpf'], row['ava_data'], row['ava_pdf'])
                );
            }

            return listaAvaliacoes;
        } else {
            return null;
        }
    }

    async cadastrarAvaliacao() {
        let result = null;

        let sql = "insert into tb_avaliacoes (ass_cpf, ava_data, ava_pdf) values (?, ?, ?)";
        let valores = [this.#ass_cpf, this.#ava_data, this.#ava_pdf];

        result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterarAvaliacao() {
        let result = null;

        let sql = "update tb_avaliacoes set ass_cpf = ?, ava_data = ?, ava_pdf where ava_id = ?";
        let valores = [this.#ass_cpf, this.#ava_data, this.#ava_pdf, this.#ava_id];

        result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletarAvaliacao(id) {
        let result = null;

        let sql = "delete from tb_avaliacoes where ava_id = ?"
        let valores = [id];

        result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async checarData(data) {
        let result = null;

        let sql = "select if(? > curdate(), 0, 1)"
        result = await conexao.ExecutaComando(sql, [data]);

        return result;
    }

    toJSON() {
        return {
            ava_id: this.ava_id,
            ass_cpf: this.#ass_cpf,
            ava_data: this.#ava_data,
            ava_pdf: this.#ava_pdf
        };
    }
}

export default AvaliacoesModel;