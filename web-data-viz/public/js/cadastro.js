// ============================================================
// CADASTRO - valida o formulário e envia para a API
// Fluxo: cadastro.html -> fetch -> /usuarios/cadastrar
//        -> usuarioController -> usuarioModel -> tabela usuario
// ============================================================

function mostrarMensagemCadastro(texto, tipo) {
    let aviso = document.getElementById("aviso-cadastro");
    aviso.innerHTML = texto;
    aviso.className = "aviso aviso-" + tipo;   // aviso-erro ou aviso-sucesso
}

function cadastrar() {
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let confirmacao = document.getElementById("confirmacao-senha").value;

    // Validações em JavaScript, antes de chamar a API
    if (nome == "" || email == "" || senha == "" || confirmacao == "") {
        mostrarMensagemCadastro("Preencha todos os campos.", "erro");
    } else if (nome.length < 2) {
        mostrarMensagemCadastro("O nome precisa ter pelo menos 2 letras.", "erro");
    } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        mostrarMensagemCadastro("Digite um e-mail válido, com @ e ponto.", "erro");
    } else if (senha.length < 6) {
        mostrarMensagemCadastro("A senha precisa ter pelo menos 6 caracteres.", "erro");
    } else if (senha != confirmacao) {
        mostrarMensagemCadastro("As senhas não são iguais.", "erro");
    } else {
        enviarCadastro(nome, email, senha);
    }

    return false;   // impede o formulário de recarregar a página
}

function enviarCadastro(nome, email, senha) {
    let botao = document.getElementById("botao-cadastrar");
    botao.disabled = true;
    mostrarMensagemCadastro("Cadastrando...", "info");

    fetch(enderecoApi("/usuarios/cadastrar"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            mostrarMensagemCadastro("Cadastro feito! Levando você para o login...", "sucesso");
            setTimeout(function () {
                window.location = "login.html";
            }, 1500);
        } else {
            // A API explica o motivo (ex.: e-mail já cadastrado)
            resposta.text().then(function (texto) {
                mostrarMensagemCadastro(texto, "erro");
                botao.disabled = false;
            });
        }
    }).catch(function (erro) {
        console.log(erro);
        mostrarMensagemCadastro("Não foi possível falar com o servidor. Confira se o npm start está rodando na pasta web-data-viz.", "erro");
        botao.disabled = false;
    });
}
