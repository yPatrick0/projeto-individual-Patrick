function mostrarMensagemLogin(texto, tipo) {
    let aviso = document.getElementById("aviso-login");
    aviso.innerHTML = texto;
    aviso.className = "aviso aviso-" + tipo;
}

function entrar() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let botao = document.getElementById("botao-entrar");

    if (email == "" || senha == "") {
        mostrarMensagemLogin("Preencha o e-mail e a senha.", "erro");
    } else {
        botao.disabled = true;
        mostrarMensagemLogin("Entrando...", "info");

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (usuario) {
                    sessionStorage.ID_USUARIO = usuario.id;
                    sessionStorage.NOME_USUARIO = usuario.nome;
                    sessionStorage.EMAIL_USUARIO = usuario.email;

                    mostrarMensagemLogin("Login feito! Abrindo o painel...", "sucesso");
                    setTimeout(function () {
                        window.location = "dashboard.html";
                    }, 1000);
                });
            } else {
                resposta.text().then(function (texto) {
                    mostrarMensagemLogin(texto, "erro");
                    botao.disabled = false;
                });
            }
        }).catch(function (erro) {
            console.log(erro);
            mostrarMensagemLogin("Não foi possível falar com o servidor. Confira se o npm start está rodando na pasta web-data-viz.", "erro");
            botao.disabled = false;
        });
    }
}
