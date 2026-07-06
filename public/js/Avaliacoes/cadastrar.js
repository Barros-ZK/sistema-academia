document.addEventListener("DOMContentLoaded", function() {

    var btnCadastrar = document.getElementById("btnCadastrar");

    btnCadastrar.addEventListener("click", function() {
        cadastrarAvaliacao();
    })
})

async function cadastrarAvaliacao() {
    limparErros();
    
    var selectCpf = document.getElementById("selectCpf");
    var inputData = document.getElementById("inputData");
    var inputPdf = document.getElementById("inputPdf");

    var listaErros = [];

    if(selectCpf.value == "0" || selectCpf.value == undefined || selectCpf.value == null){
        listaErros.push("selectCpf");
    }
    if(inputData.value == "" || inputData.value == undefined || inputData.value == null){
        listaErros.push("inputData");
    }
    if(inputPdf.value == "" || inputPdf.value == undefined || inputPdf.value == null){
        listaErros.push("inputPdf");
    }

    if(listaErros.length == 0){
        var hoje = new Date();
        var dd = String(hoje.getDate()).padStart(2, '0');
        var mm = String(hoje.getMonth() + 1).padStart(2, '0');
        var aaaa = hoje.getFullYear();
        hoje = aaaa + '-' + mm + '-' + dd;
        if(inputData.value <= hoje) {
            let resposta = await fetch("/avaliacoes/checarData?data=" + inputData.value);
            resposta = await resposta.json();

            if(resposta.ok) { 
                resposta = await fetch("/avaliacoes/checarPdf?pdf=" + inputPdf.value);
                resposta = await resposta.json();

                if(resposta.ok) {
                    const formData = new FormData();
                    formData.append("cpf", selectCpf.value);
                    formData.append("data", inputData.value);
                    formData.append("pdf", inputPdf.files[0]);
            
                    fetch('/avaliacoes/cadastrar', { 
                        method: "POST",
                        body: formData
                    })
                    .then(r=> {
                        return r.json();
                    })
                    .then(r=> {          
                        if(r.ok) {
                            selectCpf.value = "0";
                            inputData.value = "";
                            inputPdf.value = "";
            
                            document.getElementById("alertaSucesso").innerText = "Avaliação cadastrada com sucesso!";
                            document.getElementById("alertaSucesso").style = "display: block";
                        }
                        else{
                            document.getElementById("erros").innerText = "Houve um problema durante o cadastro, tente novamente";
                            document.getElementById("erros").style = "display: block";
                        }
                    })
                    .catch(e=> {
                        console.log(e);
                    })
                } else { //não é um arquivo pdf
                    document.getElementById("inputPdf").classList.add("campoErro");
                    document.getElementById("erros").innerText = "Por-favor, selecione um arquivo PDF";
                    document.getElementById("erros").style = "display: block";
                }
            } else { //data no futuro pelo banco de dados
                document.getElementById("inputData").classList.add("campoErro");
                document.getElementById("erros").innerText = "A data informada está no futuro, corrija-a:";
                document.getElementById("erros").style = "display: block";
            }
        } else { //data no futuro pelo navegador
            document.getElementById("inputData").classList.add("campoErro");
            document.getElementById("erros").innerText = "A data informada está no futuro, corrija-a:";
            document.getElementById("erros").style = "display: block";
        }
    } else{ //campos preenchidos incorretamente
        mostrarErros(listaErros);
    }
}

function mostrarErros(lista) {
    for(let i = 0; i < lista.length; i++){
        document.getElementById(lista[i]).classList.add("campoErro");
    }

    document.getElementById("erro").innerText = "Preencha corretamente os campos destacados abaixo:";
    document.getElementById("erro").style = "display: block";
}

function limparErros() {
    document.getElementById("selectCpf").classList.remove("campoErro");
    document.getElementById("inputData").classList.remove("campoErro");
    document.getElementById("inputPdf").classList.remove("campoErro");

    document.getElementById("erro").style = "display: none";
    document.getElementById("alertaSucesso").style = "display: none";
}