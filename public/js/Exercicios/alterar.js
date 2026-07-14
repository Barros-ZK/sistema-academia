document.addEventListener("DOMContentLoaded", function() {

    var btnAlterar = document.getElementById("btnAlterar");

    btnAlterar.addEventListener("click", function() {
        alterarExercicio();
    });

    var checkbox = document.getElementById("checkbox");

    checkbox.addEventListener('change', function() {
        if(this.checked) {
            document.getElementById("inputImagem").disabled = true;
            document.getElementById("inputImagem").value = "";
        } else {
            document.getElementById("inputImagem").disabled = false;
        }
    });

    var inputImagem = document.getElementById("inputImagem");
    inputImagem.addEventListener("change", carregarPrevia);
})

function carregarPrevia() {
    if(this.files.length > 0) {
        let img = document.getElementById("previaImagem");
        let urlImg = URL.createObjectURL(this.files[0]);
        img.src = urlImg;
        document.getElementById("divPrevia").style = "display: block";
    }
}

async function alterarExercicio() {
    limparErros();
    
    var inputNome = document.getElementById("inputNome");
    var selectMusculo = document.getElementById("selectMusculo");
    var inputImagem = document.getElementById("inputImagem");

    var listaErros = [];

    if(inputNome.value == "" || inputNome.value == undefined || inputNome.value == null){
        listaErros.push("inputNome");
    }
    if(selectMusculo.value == "0" || selectMusculo.value == undefined || selectMusculo.value == null){
        listaErros.push("selectMusculo");
    }
    if(!document.getElementById("checkbox").checked) {
        if(inputImagem.value == "" || inputImagem.value == undefined || inputImagem.value == null){
            listaErros.push("inputImagem");
        }
    }

    if(listaErros.length == 0){
        let guarda = 0;
        const formData = new FormData();
        if(document.getElementById("checkbox").checked) { //manter a imagem
            formData.append("id", document.getElementById("exeId").innerText);
            formData.append("nome", inputNome.value);
            formData.append("musculo", selectMusculo.value);
        } else { //alterar a imagem
            resposta = await fetch("/exercicios/checarImg?img=" + inputImagem.files[0].name);
            resposta = await resposta.json();

            if(resposta.ok) {
                formData.append("id", document.getElementById("exeId").innerText);
                formData.append("nome", inputNome.value);
                formData.append("musculo", selectMusculo.value);
                formData.append("imagem", inputImagem.files[0]);
            } else { //não é uma imagem nos padrões
                document.getElementById("inputImagem").classList.add("campoErro");
                document.getElementById("erros").innerText = "Por-favor, selecione uma imagem (PNG, JPEG, JPG)";
                document.getElementById("erros").style = "display: block";
                guarda = 1;
            }
        }

        if(guarda == 0) {
            fetch('/exercicios/alterar', { 
                method: "POST",
                body: formData
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {          
                if(r.ok) {
                    alert("Exercício alterado com sucesso!");
                    window.location.href = "/exercicios";
                }
                else{
                    document.getElementById("erros").innerText = "Erro ao alterar exercício!";
                    document.getElementById("erros").style = "display: block";
                }
            })
            .catch(e=> {
                console.log(e);
            })
        }
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
    document.getElementById("selectCpf").classList.remove("campoErro");
    document.getElementById("inputData").classList.remove("campoErro");
    document.getElementById("inputPdf").classList.remove("campoErro");

    document.getElementById("erros").style = "display: none";
    document.getElementById("alertaSucesso").style = "display: none";
}