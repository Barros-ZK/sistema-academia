document.addEventListener("DOMContentLoaded", function() {

    let btnExcluir = document.querySelectorAll(".btnExcluir");

    for(let i = 0; i < btnExcluir.length; i++){
        btnExcluir[i].addEventListener("click", excluirAssinante);
    }

    let btnBuscar = document.querySelector("#btnBuscar");

    btnBuscar.addEventListener("click", function() {
        let busca = document.querySelector("#txtBusca").value;
        let parametros = [];
        if(document.querySelector("#cpf").checked) {
            parametros.push("cpf");
        }
        if(document.querySelector("#nome").checked) {
            parametros.push("nome");
        }
        if(document.querySelector("#telefone").checked) {
            parametros.push("telefone");
        }
        listarAssinantes(busca, parametros);
    })

    function listarAssinantes(busca, parametros) {
        let paramsBusca = new URLSearchParams();

        if(busca == "") {
            paramsBusca.append("parametros", "tudo");
            parametros = [];
        } else {
            paramsBusca.append("busca", busca);
        }

        for(let i = 0; i < parametros.length; i++) {
            paramsBusca.append("parametros", parametros[i]);
        }

        fetch("/assinantes/listar?" + paramsBusca.toString())
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(corpo) {
            montarTabela(corpo);
        })
    }

    function montarTabela(lista) {
        let html = "";

        for(let i = 0; i < lista.length; i++) {
            html += `<tr>
                        <td>${lista[i].ass_cpf}</td>
                        <td>${lista[i].ass_nome}</td>
                        <td>${lista[i].ass_telefone}</td>
                        <td>
                            <div>
                                <button data-id="${lista[i].ass_cpf}" title="Excluir" class="btn btn-danger btnExcluir"><i class="fas fa-trash"></i></button>
                                <a href="/assinantes/alterar/${lista[i].ass_cpf}" title="Editar" class="btn btn-primary">
                                    <i class="fas fa-pen"></i>
                                </a>
                            </div>
                        </td>
                    </tr>`;
        }

        document.querySelector("#tabela > tbody").innerHTML = html;
    }

    function excluirAssinante() {
        if(confirm("Tem certeza que deseja excluir esse assinante?")){
            let id = this.dataset.id;
            var data = {
                ass_id: id
            }
            fetch("/assinantes/excluir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(function(r) {
                return r.json();
            }).then(function(r) {
                if(r.ok){
                    window.location.reload();
                }
            }).catch(function(e) {
                console.log(e);
            })
        }
    }
})