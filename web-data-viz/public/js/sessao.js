// ============================================================
// SESSÃO DO USUÁRIO (login)
// Depois do login, js/login.js guarda no sessionStorage:
//   ID_USUARIO, NOME_USUARIO e EMAIL_USUARIO
// O sessionStorage é apagado quando a aba do navegador é fechada.
// ============================================================

function usuarioLogado() {
    return sessionStorage.ID_USUARIO != undefined;
}

// Usada no dashboard: quem não fez login volta para a tela de login
function validarSessao() {
    if (!usuarioLogado()) {
        window.location = "login.html";
    }
}

function sair() {
    sessionStorage.clear();
    window.location = "index.html";
}

// Troca os botões "Entrar / Criar conta" por "Olá, nome / Sair"
// quando a pessoa já está logada.
function mostrarUsuarioNoMenu(idDoElemento) {
    let elemento = document.getElementById(idDoElemento);
    if (elemento == null || !usuarioLogado()) {
        return;
    }

    let primeiroNome = sessionStorage.NOME_USUARIO.split(" ")[0];
    elemento.innerHTML = '<span class="nav-ola">Olá, ' + primeiroNome + '</span>'
        + '<button class="button secondary" type="button" onclick="sair()">Sair</button>';
}
