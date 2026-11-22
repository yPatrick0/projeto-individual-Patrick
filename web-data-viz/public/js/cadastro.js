// ============================================================
// CADASTRO - valida o formulário e envia para a API
// Fluxo: cadastro.html -> fetch -> /usuarios/cadastrar
//        -> usuarioController -> usuarioModel -> tabela usuario
// ============================================================

// Regras da senha: dois vetores na mesma ordem (como personagens/nomes no jogo da memória).
// idsDasRegras guarda o id de cada <li> do cadastro.html.
let idsDasRegras = ["regra-tamanho", "regra-maiuscula", "regra-minuscula", "regra-numero", "regra-especial"];

// Confere a senha letra por letra e devolve um vetor com true/false para cada regra,
// na mesma ordem de idsDasRegras.
function conferirRegrasDaSenha(senha) {
    let temMaiuscula = false;
    let temMinuscula = false;
    let temNumero = false;
    let temEspecial = false;

    for (let i = 0; i < senha.length; i++) {
        let letra = senha[i];

        if (letra >= "A" && letra <= "Z") {
            temMaiuscula = true;
        } else if (letra >= "a" && letra <= "z") {
            temMinuscula = true;
        } else if (letra >= "0" && letra <= "9") {
            temNumero = true;
        } else {
            temEspecial = true;   // tudo que não é letra nem número (! @ # $ % ...)
        }
    }

    return [senha.length >= 8, temMaiuscula, temMinuscula, temNumero, temEspecial];
}

// Conta quantas regras a senha cumpre (de 0 a 5)
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

// Roda a cada tecla digitada na senha (oninput no cadastro.html)
function verificarSenha() {
    let senha = document.getElementById("senha").value;
    let regras = conferirRegrasDaSenha(senha);

    // 1) Marca cada regra como cumprida (✓) ou faltando (✗)
    for (let i = 0; i < idsDasRegras.length; i++) {
        let item = document.getElementById(idsDasRegras[i]);
        if (regras[i]) {
            item.className = "regra-ok";
        } else {
            item.className = "regra-falta";
        }
    }

    // 2) Calcula a força: fraca (0 a 2), média (3 ou 4), forte (5)
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

    // A confirmação depende da senha, então confere de novo
    verificarConfirmacao();
}

// Roda a cada tecla digitada na confirmação
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

// Confere se o texto tem um caractere (ex.: "@"), olhando letra por letra
function contemCaractere(texto, caractere) {
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] == caractere) {
            return true;
        }
    }
    return false;
}

// O e-mail precisa ter @ e ponto
function emailValido(email) {
    return contemCaractere(email, "@") && contemCaractere(email, ".");
}

// Roda a cada tecla digitada no e-mail
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
    aviso.className = "aviso aviso-" + tipo;   // aviso-erro, aviso-sucesso ou aviso-info
}

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirmacao = document.getElementById("confirmacao-senha").value;

    // Validações em JavaScript, antes de chamar a API
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
