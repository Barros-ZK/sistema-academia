import Database from '../utils/database.js';
const conexao = new Database();

class AssinantesModel {

    #ass_id;
    #ass_cpf;
    #ass_nome;
    #ass_telefone;

    get ass_id(){return this.#ass_id};
    set ass_id(val){this.#ass_id = val};

    get ass_cpf(){return this.#ass_cpf};
    set ass_cpf(val){this.#ass_cpf = val};

    get ass_nome(){return this.#ass_nome};
    set ass_nome(val){this.#ass_nome = val};

    get ass_telefone(){return this.#ass_telefone};
    set ass_telefone(val){this.#ass_telefone = val};


    constructor(ass_id, ass_cpf, ass_nome, ass_telefone) {
        this.#ass_id = ass_id;
        this.#ass_cpf = ass_cpf;
        this.#ass_nome = ass_nome;
        this.#ass_telefone = ass_telefone;
    }

    async listarAssinantes(parametro, busca) {
        let sql = null;
        if(parametro == "cpf") {
            sql = "select * from tb_assinantes where ass_cpf like ?";
        } else if(parametro == "nome") {
            sql = "select * from tb_assinantes where ass_nome like ?";
        } else if(parametro == "telefone") {
            sql = "select * from tb_assinantes where ass_telefone like ?";
        } else if(parametro == "tudo") {
            sql = 'select * from tb_assinantes';
        }

        if(sql != null) {
            let rows = await conexao.ExecutaComando(sql, [`%${busca}%`]);

            let listaAssinantes = [];
            for(let i = 0; i < rows.length; i++){
                let row = rows[i];
                listaAssinantes.push(
                    new AssinantesModel(row['ass_id'], row['ass_cpf'], 
                    row['ass_nome'], row['ass_telefone'])
                );
            }

            return listaAssinantes;
        } else {
            return null;
        }
    }

    async cadastrarAssinante() {
        let result = false;

        let sql = "insert into tb_assinantes (ass_cpf, ass_nome, ass_telefone) values (?, ?, ?)";
        let valores = [this.#ass_cpf, this.#ass_nome, this.#ass_telefone];

        result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    // async buscarUsuario(id){
    //     let sql = "select * from tb_usuariomecanica where usu_id = ?"
    //     let valores = [id];

    //     let rows = await conexao.ExecutaComando(sql, valores);
    //     if(rows.length > 0){
    //         return new UsuarioModel(rows[0]["usu_id"], rows[0]["usu_nome"], rows[0]["usu_email"], rows[0]["usu_senha"], rows[0]["usu_ativo"],
    //         rows[0]["per_id"]);
    //     }
    //     return null;
    // }

    // async deletarUsuario(usuarioId) {
    //     let sql = "delete from tb_usuariomecanica where usu_id = ?"
    //     let valores = [usuarioId];

    //     let result = conexao.ExecutaComandoNonQuery(sql, valores);

    //     return result;
    // }

    // async autenticarUsuario(email, senha){
    //     let sql = "select * from tb_usuariomecanica where usu_email = ? and usu_senha = ? and usu_ativo = 'S'"
    //     let valores = [email, senha];
    //     let rows = await conexao.ExecutaComando(sql, valores);
    //     if(rows.length > 0){
    //         return new UsuarioModel(rows[0]["usu_id"], rows[0]["usu_nome"], rows[0]["usu_email"], rows[0]["usu_senha"], rows[0]["usu_ativo"],
    //         rows[0]["per_id"]);
    //     }
        
    //     return null;
    // }

    toJSON() {
        return {
            ass_id: this.#ass_id,
            ass_cpf: this.ass_cpf,
            ass_nome: this.#ass_nome,
            ass_telefone: this.#ass_telefone
        };
    }
}

export default AssinantesModel;