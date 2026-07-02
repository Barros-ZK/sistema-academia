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
                                <button data-cpf="${lista[i].ass_cpf}" title="Excluir" class="btn btn-danger btnExcluir"><i class="fas fa-trash"></i></button>
                                <a href="/assinantes/alterar/${lista[i].ass_cpf}" title="Editar" class="btn btn-primary">
                                    <i class="fas fa-pen"></i>
                                </a>
                            </div>
                        </td>
                    </tr>`;
        }

        document.querySelector("#tabela > tbody").innerHTML = html;

        let btnExcluir = document.querySelectorAll(".btnExcluir");
        for(let i = 0; i < btnExcluir.length; i++){
            btnExcluir[i].addEventListener("click", excluirAssinante);
        }
    }

    function excluirAssinante() {
        if(confirm("Tem certeza que deseja excluir esse assinante?")){
            let cpf = this.dataset.cpf;
            var data = {
                cpf: cpf
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

    function deleteColumn(ws, colIndex) {
        const range = XLSX.utils.decode_range(ws['!ref']); // Get worksheet range
    
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = colIndex; C < range.e.c; ++C) {
                const thisCell = XLSX.utils.encode_cell({ r: R, c: C });
                const nextCell = XLSX.utils.encode_cell({ r: R, c: C + 1 });
    
                // Shift cell value left
                ws[thisCell] = ws[nextCell];
            }
            // Delete last cell in the row
            const lastCell = XLSX.utils.encode_cell({ r: R, c: range.e.c });
            delete ws[lastCell];
        }
    
        // Update worksheet range
        range.e.c--;
        ws['!ref'] = XLSX.utils.encode_range(range);
    }

    document.getElementById("sheetjsexport").addEventListener('click', function() {
        /* Create worksheet from HTML DOM TABLE */
        var wb = XLSX.utils.table_to_book(document.getElementById("tabela"));
        
        var ws = wb.Sheets[wb.SheetNames[0]]; // first worksheet
        deleteColumn(ws, 3);

        /* Export to file (start a download) */
        XLSX.writeFile(wb, "Assinantes.xlsx");
    });
})