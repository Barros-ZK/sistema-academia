document.addEventListener("DOMContentLoaded", function() {

    var btnCadastrar = document.getElementById("btnCadastrar");

    btnCadastrar.addEventListener("click", function() {
        cadastrarExercicio();
    })

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

async function cadastrarExercicio() {
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
    if(inputImagem.value == "" || inputImagem.value == undefined || inputImagem.value == null){
        listaErros.push("inputImagem");
    }

    if(listaErros.length == 0){
        let resposta = await fetch("/exercicios/checarImg?img=" + inputImagem.files[0].name);
        resposta = await resposta.json();

        if(resposta.ok) {
            const formData = new FormData();
            formData.append("nome", inputNome.value);
            formData.append("musculo", selectMusculo.value);
            formData.append("imagem", inputImagem.files[0]);

            fetch('/exercicios/cadastrar', { 
                method: "POST",
                body: formData
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {          
                if(r.ok) {
                    inputNome.value = "";
                    selectMusculo.value = "0";
                    inputImagem.value = "";

                    document.getElementById("alertaSucesso").innerText = "Exercício cadastrado com sucesso!";
                    document.getElementById("alertaSucesso").style = "display: block";
                    document.getElementById("divPrevia").style = "display: none";
                }
                else {
                    document.getElementById("erros").innerText = "Houve um problema durante o cadastro, tente novamente";
                    document.getElementById("erros").style = "display: block";
                }
            })
            .catch(e=> {
                console.log(e);
            })
        } else { //não é uma imagem
            document.getElementById("inputImagem").classList.add("campoErro");
            document.getElementById("erros").innerText = "Por-favor, selecione uma imagem (PNG, JPEG, JPG)";
            document.getElementById("erros").style = "display: block";
        }
    } else {
        mostrarErros(listaErros);
    }
}

function mostrarErros(lista) {
    for(let i = 0; i < lista.length; i++){
        document.getElementById(lista[i]).classList.add("campoErro");
    }

    document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";
    document.getElementById("erros").style = "display: block";
}

function limparErros() {
    document.getElementById("inputNome").classList.remove("campoErro");
    document.getElementById("selectMusculo").classList.remove("campoErro");
    document.getElementById("inputImagem").classList.remove("campoErro");

    document.getElementById("erros").style = "display: none";
    document.getElementById("alertaSucesso").style = "display: none";
}