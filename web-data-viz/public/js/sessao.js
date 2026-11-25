let primeiroNome = "";

function validarSessao() {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location = "login.html";
    }
}

function sair() {
    sessionStorage.clear();
    window.location = "index.html";
}

function pegarPrimeiroNome() {
    let nome = sessionStorage.NOME_USUARIO;
    let i = 0;
    primeiroNome = "";

    while (i < nome.length && nome[i] != " ") {
        primeiroNome += nome[i];
        i++;
    }
}

function mostrarUsuarioNoMenu(idDoElemento) {
    let elemento = document.getElementById(idDoElemento);

    if (elemento != null && sessionStorage.ID_USUARIO != undefined) {
        pegarPrimeiroNome();
        elemento.innerHTML = '<span class="nav-ola">Olá, ' + primeiroNome + '</span>'
            + '<button class="button secondary" type="button" onclick="sair()">Sair</button>';
    }
}
