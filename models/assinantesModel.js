const Database = require('../utils/database');
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
        let guarda = 0;
        if(parametro == "cpf") {
            let sql = "select * from tb_assinantes where ass_cpf like '%?%'";
            guarda = 1;
        } else if(parametro == "nome") {
            let sql = "select * from tb_assinantes where ass_nome like '%?%'";
            guarda = 1;
        } else if(parametro == "telefone") {
            let sql = "select * from tb_assinantes where ass_telefone like '%?%'";
            guarda = 1;
        } else if(parametro == "tudo") {
            let sql = 'select * from tb_assinantes';
            guarda = 1;
        }

        if(guarda == 1) {
            let rows = await conexao.ExecutaComando(sql, [busca]);

            let listaAssinantes = [];
            for(let i = 0; i<rows.length; i++){
                let row = rows[i];
                listaAssinantes.push(
                    new UsuarioModel(row['ass_id'], row['ass_cpf'], 
                    row['ass_nome'], row['ass_telefone'])
                );
            }

            return listaAssinantes;
        } else {
            return null;
        }
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

    // async gravarUsuario() {
    //     let result = false;
    //     if(this.#usuarioId == 0){
    //         let sql = "insert into tb_usuariomecanica (usu_nome, usu_email, usu_senha, usu_ativo, per_id) values (?, ?, ?, ?, ?)";
    //         let valores = [this.#usuarioNome, this.#usuarioEmail, this.#usuarioSenha, this.#usuarioAtivo, this.#perfilId];
    
    //         result = await conexao.ExecutaComandoNonQuery(sql, valores);
    //     }
    //     else{
    //         let sql = "update tb_usuariomecanica set usu_nome = ?, usu_email = ?, usu_senha = ?, usu_ativo = ?, per_id = ? where usu_id = ?";
    //         let valores = [this.#usuarioNome, this.#usuarioEmail, this.#usuarioSenha, this.#usuarioAtivo, this.#perfilId, this.#usuarioId];

    //         result = await conexao.ExecutaComandoNonQuery(sql, valores);
    //     }

    //     return result;

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

}

module.exports = AssinantesModel;