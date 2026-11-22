let idsDasRegras = ["regra-tamanho", "regra-maiuscula", "regra-minuscula", "regra-numero", "regra-especial"];

let letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
let numeros = "0123456789";

function conferirRegrasDaSenha(senha) {
    let temMaiuscula = false;
    let temMinuscula = false;
    let temNumero = false;
    let temEspecial = false;

    for (let i = 0; i < senha.length; i++) {
        let letra = senha[i];

        if (letrasMaiusculas.includes(letra)) {
            temMaiuscula = true;
        } else if (letrasMinusculas.includes(letra)) {
            temMinuscula = true;
        } else if (numeros.includes(letra)) {
            temNumero = true;
        } else {
            temEspecial = true;
        }
    }

    return [senha.length >= 8, temMaiuscula, temMinuscula, temNumero, temEspecial];
}

function contarRegrasCumpridas(senha) {
    let regras = conferirRegrasDaSenha(senha);
    let cumpridas = 0;
    for (let i = 0; i < regras.length; i++) {
        if (regras[i]) {
            cumpridas++;
        }
    }
    return cumpridas;
}

function verificarSenha() {
    let senha = document.getElementById("senha").value;
    let regras = conferirRegrasDaSenha(senha);

    for (let i = 0; i < idsDasRegras.length; i++) {
        let item = document.getElementById(idsDasRegras[i]);
        if (regras[i]) {
            item.className = "regra-ok";
        } else {
            item.className = "regra-falta";
        }
    }

    let cumpridas = contarRegrasCumpridas(senha);
    let barra = document.getElementById("barra-forca");
    let texto = document.getElementById("texto-forca");

    barra.style.width = (cumpridas / idsDasRegras.length * 100) + "%";

    if (senha == "") {
        barra.className = "barra-forca";
        texto.innerHTML = "Força da senha: digite uma senha";
    } else if (cumpridas <= 2) {
        barra.className = "barra-forca forca-fraca";
        texto.innerHTML = "Força da senha: <strong>fraca</strong>";
    } else if (cumpridas <= 4) {
        barra.className = "barra-forca forca-media";
        texto.innerHTML = "Força da senha: <strong>média</strong>";
    } else {
        barra.className = "barra-forca forca-forte";
        texto.innerHTML = "Força da senha: <strong>forte</strong>";
    }

    verificarConfirmacao();
}

function verificarConfirmacao() {
    let senha = document.getElementById("senha").value;
    let confirmacao = document.getElementById("confirmacao-senha").value;
    let dica = document.getElementById("dica-confirmacao");

    if (confirmacao == "") {
        dica.innerHTML = "";
        dica.className = "dica-campo";
    } else if (senha == confirmacao) {
        dica.innerHTML = "✓ As senhas são iguais";
        dica.className = "dica-campo dica-ok";
    } else {
        dica.innerHTML = "✗ As senhas ainda não são iguais";
        dica.className = "dica-campo dica-falta";
    }
}

function emailValido(email) {
    return email.includes("@") && email.includes(".");
}

function verificarEmail() {
    let email = document.getElementById("email").value;
    let dica = document.getElementById("dica-email");

    if (email == "") {
        dica.innerHTML = "";
        dica.className = "dica-campo";
    } else if (!emailValido(email)) {
        dica.innerHTML = "✗ O e-mail precisa ter @ e ponto (ex.: finn@email.com)";
        dica.className = "dica-campo dica-falta";
    } else {
        dica.innerHTML = "✓ E-mail no formato certo";
        dica.className = "dica-campo dica-ok";
    }
}

function mostrarMensagemCadastro(texto, tipo) {
    let aviso = document.getElementById("aviso-cadastro");
    aviso.innerHTML = texto;
    aviso.className = "aviso aviso-" + tipo;
}

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirmacao = document.getElementById("confirmacao-senha").value;

    if (nome == "" || email == "" || senha == "" || confirmacao == "") {
        mostrarMensagemCadastro("Preencha todos os campos.", "erro");
    } else if (nome.length < 2) {
        mostrarMensagemCadastro("O nome precisa ter pelo menos 2 letras.", "erro");
    } else if (!emailValido(email)) {
        mostrarMensagemCadastro("Digite um e-mail válido, com @ e ponto.", "erro");
    } else if (contarRegrasCumpridas(senha) < idsDasRegras.length) {
        mostrarMensagemCadastro("A senha ainda não está forte. Veja os itens com ✗ abaixo da senha.", "erro");
    } else if (senha != confirmacao) {
        mostrarMensagemCadastro("As senhas não são iguais.", "erro");
    } else {
        enviarCadastro(nome, email, senha);
    }

    return false;
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
