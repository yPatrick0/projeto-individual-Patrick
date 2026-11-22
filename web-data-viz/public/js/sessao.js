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

function mostrarUsuarioNoMenu(idDoElemento) {
    let elemento = document.getElementById(idDoElemento);
    if (elemento == null || !usuarioLogado()) {
        return;
    }

    let primeiroNome = sessionStorage.NOME_USUARIO.split(" ")[0];
    elemento.innerHTML = '<span class="nav-ola">Olá, ' + primeiroNome + '</span>'
        + '<button class="button secondary" type="button" onclick="sair()">Sair</button>';
}
