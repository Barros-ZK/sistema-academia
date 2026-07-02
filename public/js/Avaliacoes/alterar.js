document.addEventListener("DOMContentLoaded", function() {


    var btnAlterar = document.getElementById("btnAlterar");


    btnAlterar.addEventListener("click", function() {
        alterarAssinante();
    })
})

function alterarAssinante() {

    limparErros();
    
    var inputCpf = document.getElementById("inputCpf");
    var inputNome = document.getElementById("inputNome");
    var inputTelefone = document.getElementById("inputTelefone");

    var listaErros = [];

    if(inputCpf.value == "" || inputCpf.value == undefined || inputCpf.value == null){
        listaErros.push("inputCpf");
    }
    if(inputNome.value == "" || inputNome.value == undefined || inputNome.value == null){
        listaErros.push("inputNome");
    }
    if(inputTelefone.value == "" || inputTelefone.value == undefined || inputTelefone.value == null){
        listaErros.push("inputTelefone");
    }

    if(listaErros.length == 0){

        var data = {
            cpf: inputCpf.value,
            nome: inputNome.value,
            telefone: inputTelefone.value
        };

        fetch('/assinantes/alterar', { 
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {          
            if(r.ok) {

                alert("Assinante alterado com sucesso!");
                window.location.href = "/assinantes";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao alterar assinante!";
                document.getElementById("erros").style = "display: block";
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }
    else{
        mostrarErros(listaErros)
    }
}

function mostrarErros(lista) {
    for(let i = 0; i<lista.length; i++){
        document.getElementById(lista[i]).classList.add("campoErro");

        document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";
        document.getElementById("erros").style= "display: block";
    }
}

function limparErros() {
    document.getElementById("inputCpf").classList.remove("campoErro");
    document.getElementById("inputNome").classList.remove("campoErro");
    document.getElementById("inputTelefone").classList.remove("campoErro");

    document.getElementById("erros").style = "display: none";
    document.getElementById("alertaSucesso").style = "display: none";
}