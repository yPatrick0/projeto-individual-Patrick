var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || email == "") {
        res.status(400).send("Informe o e-mail.");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Informe a senha.");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);

                    if (resultadoAutenticar.length == 1) {
                        // Devolve só o que a tela precisa (a senha não volta para o navegador)
                        res.json({
                            id: resultadoAutenticar[0].id,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("E-mail e/ou senha inválido(s).");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// Mesmas regras do medidor de senha do cadastro (public/js/cadastro.js)
function senhaForte(senha) {
    return senha.length >= 8 &&
        /[A-Z]/.test(senha) &&
        /[a-z]/.test(senha) &&
        /[0-9]/.test(senha) &&
        /[^A-Za-z0-9]/.test(senha);
}

function cadastrar(req, res) {
    // Valores enviados pelo cadastro.html (js/cadastro.js)
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Validações (o navegador também valida, mas a API confere de novo)
    if (nome == undefined || nome.trim().length < 2) {
        res.status(400).send("Informe um nome com pelo menos 2 letras.");
    } else if (email == undefined || email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        res.status(400).send("Informe um e-mail válido.");
    } else if (senha == undefined || !senhaForte(senha)) {
        res.status(400).send("A senha precisa ter 8+ caracteres, letra maiúscula, letra minúscula, número e caractere especial.");
    } else if (nome.length > 80 || email.length > 100 || senha.length > 50) {
        res.status(400).send("Algum campo passou do tamanho máximo.");
    } else {

        usuarioModel.cadastrar(nome.trim(), email.trim(), senha)
            .then(
                function (resultado) {
                    res.status(201).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    // 1062 = valor repetido em coluna UNIQUE (o e-mail já existe)
                    if (erro.errno == 1062) {
                        res.status(409).send("Este e-mail já está cadastrado.");
                    } else {
                        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                        res.status(500).json(erro.sqlMessage);
                    }
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}
