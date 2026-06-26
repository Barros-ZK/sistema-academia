import Database from '../utils/database.js';
const conexao = new Database();

class FuncionarioModel {

    #fun_id;
    #fun_cpf;
    #fun_nome;
    #fun_telefone;
    #fun_senha;
    #fun_cargo;
    #fun_ativo;

    get fun_id(){return this.#fun_id};
    set fun_id(val){this.#fun_id = val};

    get fun_cpf(){return this.#fun_cpf};
    set fun_cpf(val){this.#fun_cpf = val};

    get fun_nome(){return this.#fun_nome};
    set fun_nome(val){this.#fun_nome = val};

    get fun_telefone(){return this.#fun_telefone};
    set fun_telefone(val){this.#fun_telefone = val};

    get fun_senha(){return this.#fun_senha};
    set fun_senha(val){this.#fun_senha = val};

    get fun_cargo(){return this.#fun_cargo};
    set fun_cargo(val){this.#fun_cargo = val};

    get fun_ativo(){return this.#fun_ativo};
    set fun_ativo(val){this.#fun_ativo = val};

    constructor(fun_id, fun_cpf, fun_nome, fun_telefone, fun_senha, fun_cargo, fun_ativo) {
        this.#fun_id = fun_id;
        this.#fun_cpf = fun_cpf;
        this.#fun_nome = fun_nome;
        this.#fun_telefone = fun_telefone;
        this.#fun_senha = fun_senha;
        this.#fun_cargo = fun_cargo;
        this.#fun_ativo = fun_ativo;
    }

    async buscarFuncionario(id){
        let sql = "select * from tb_funcionarios where fun_id = ?"
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new FuncionarioModel(rows[0]["fun_id"], rows[0]["fun_cpf"], rows[0]["fun_nome"], rows[0]["fun_telefone"], rows[0]["fun_senha"], rows[0]["fun_cargo"], rows[0]["fun_ativo"]);
        }
        
        return null;
    }

    // async listarUsuarios() {
    //     let sql = 'select * from tb_usuariomecanica u inner join tb_perfilmecanica p on u.per_id = p.per_id';
    //     let rows = await conexao.ExecutaComando(sql);

    //     let listaUsuarios = [];

    //     for(let i = 0; i<rows.length; i++){
    //         let row = rows[i];
    //         listaUsuarios.push(
    //             new UsuarioModel(row['usu_id'], row['usu_nome'], 
    //             row['usu_email'], row['usu_senha'], 
    //             row['usu_ativo'], row['per_id'], row['per_nome'])
    //         );
    //     }

    //     return listaUsuarios;
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

    async autenticarFuncionario(telefone, senha){
        let sql = "select * from tb_funcionarios where fun_telefone = ? and fun_senha = ?"
        let valores = [telefone, senha];
        
        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new FuncionarioModel(rows[0]["fun_id"], rows[0]["fun_cpf"], rows[0]["fun_nome"], rows[0]["fun_telefone"], rows[0]["fun_senha"], rows[0]["fun_cargo"], rows[0]["fun_ativo"]);
        }
        
        return null;
    }
}

export default FuncionarioModel;