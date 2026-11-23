function usuarioLogado() {
    return sessionStorage.ID_USUARIO != undefined;
}

function validarSessao() {
    if (!usuarioLogado()) {
        window.location = "login.html";
    }
}

function sair() {
    sessionStorage.clear();
    window.location = "index.html";
}

function primeiroNome() {
    let nome = sessionStorage.NOME_USUARIO;
    let primeiro = "";

    for (let i = 0; i < nome.length; i++) {
        if (nome[i] == " ") {
            return primeiro;
        }
        primeiro += nome[i];
    }
    return primeiro;
}

function mostrarUsuarioNoMenu(idDoElemento) {
    let elemento = document.getElementById(idDoElemento);
    if (elemento == null || !usuarioLogado()) {
        return;
    }

    elemento.innerHTML = '<span class="nav-ola">Olá, ' + primeiroNome() + '</span>'
        + '<button class="button secondary" type="button" onclick="sair()">Sair</button>';
}
