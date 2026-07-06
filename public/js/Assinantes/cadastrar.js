document.addEventListener("DOMContentLoaded", function() {

    var btnCadastrar = document.getElementById("btnCadastrar");

    btnCadastrar.addEventListener("click", function() {
        cadastrarAssinante();
    })
})

async function cadastrarAssinante() {
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
        if(validarCPF(inputCpf.value)) {
            let resposta = await fetch("/assinantes/listar?busca=" + inputCpf.value + "&parametros=cpf");
            resposta = await resposta.json();

            if(resposta.length == 0) {
                resposta = await fetch("/funcionarios/listar?busca=" + inputCpf.value + "&parametros=cpf");
                resposta = await resposta.json();

                if(resposta.length == 0) {
                    var data = {
                        cpf: inputCpf.value,
                        nome: inputNome.value,
                        telefone: inputTelefone.value
                    };
            
                    fetch('/assinantes/cadastrar', { 
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
                            inputCpf.value = "";
                            inputNome.value = "";
                            inputTelefone.value = "";
            
                            document.getElementById("alertaSucesso").innerText = "Assinante cadastrado com sucesso!";
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
                } else { //cpf cadastrado como funcionario
                    document.getElementById("inputCpf").classList.add("campoErro");
                    document.getElementById("erros").innerText = "CPF já cadastrado como funcionário";
                    document.getElementById("erros").style = "display: block";
                }
            } else { //cpf cadastrado como assinante
                document.getElementById("inputCpf").classList.add("campoErro");
                document.getElementById("erros").innerText = "CPF já cadastrado, revise-o:";
                document.getElementById("erros").style = "display: block";
            }
        } else { //cpf invalido
            document.getElementById("inputCpf").classList.add("campoErro");
            document.getElementById("erros").innerText = "CPF inválido, revise-o:";
            document.getElementById("erros").style = "display: block";
        }
    }
    else{ //campos preenchidos incorretamente
        mostrarErros(listaErros)
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
    document.getElementById("inputCpf").classList.remove("campoErro");
    document.getElementById("inputNome").classList.remove("campoErro");
    document.getElementById("inputTelefone").classList.remove("campoErro");

    document.getElementById("erros").style = "display: none";
    document.getElementById("alertaSucesso").style = "display: none";
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) 
        sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) 
        sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}