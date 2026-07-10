document.addEventListener("DOMContentLoaded", function() {

    let btnExcluir = document.querySelectorAll(".btnExcluir");
    for(let i = 0; i < btnExcluir.length; i++){
        btnExcluir[i].addEventListener("click", excluirExercicio);
    }

    let btnBuscar = document.querySelector("#btnBuscar");

    btnBuscar.addEventListener("click", function() {
        let busca = document.querySelector("#txtBusca").value;
        let parametros = [];
        if(document.querySelector("#id").checked) {
            parametros.push("id");
        }
        if(document.querySelector("#nome").checked) {
            parametros.push("nome");
        }
        if(document.querySelector("#musculo").checked) {
            parametros.push("musculo");
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

        fetch("/exercicios/listar?" + paramsBusca.toString())
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
                        <td>${lista[i].exe_id}</td>
                        <td>${lista[i].exe_nome}</td>
                        <td>${lista[i].exe_musculo}</td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-eye"></i></button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><img class="dropdown-item" width="20" src="${lista[i].exe_imagem}"/></div>
                            </div>
                        </td>
                        <td>
                            <div>
                                <button data-id="${lista[i].exe_id}" title="Excluir" class="btn btn-danger btnExcluir"><i class="fas fa-trash"></i></button>
                                <a href="/Exercicios/alterar/${lista[i].exe_id}" title="Alterar" class="btn btn-secondary"><i class="fas fa-pen"></i></a>
                            </div>
                        </td>
                    </tr>`;
        }

        document.querySelector("#tabela > tbody").innerHTML = html;

        let btnExcluir = document.querySelectorAll(".btnExcluir");
        for(let i = 0; i < btnExcluir.length; i++){
            btnExcluir[i].addEventListener("click", excluirExercicio);
        }
    }

    function excluirExercicio() {
        if(confirm("Tem certeza que deseja excluir esse exercício?")){
            let id = this.dataset.id;
            var data = {
                id: id
            }
            fetch("/exercicios/excluir", {
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
        deleteColumn(ws, 4);

        /* Export to file (start a download) */
        XLSX.writeFile(wb, "Avaliacoes.xlsx");
    });
})