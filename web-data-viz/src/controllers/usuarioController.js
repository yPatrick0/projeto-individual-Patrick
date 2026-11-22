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

// Confere se o texto tem um caractere (ex.: "@"), olhando letra por letra
function contemCaractere(texto, caractere) {
    for (var i = 0; i < texto.length; i++) {
        if (texto[i] == caractere) {
            return true;
        }
    }
    return false;
}

// Mesmas regras do medidor de senha do cadastro (public/js/cadastro.js):
// 8+ caracteres, letra maiúscula, letra minúscula, número e caractere especial
function senhaForte(senha) {
    var temMaiuscula = false;
    var temMinuscula = false;
    var temNumero = false;
    var temEspecial = false;

    for (var i = 0; i < senha.length; i++) {
        var letra = senha[i];

        if (letra >= "A" && letra <= "Z") {
            temMaiuscula = true;
        } else if (letra >= "a" && letra <= "z") {
            temMinuscula = true;
        } else if (letra >= "0" && letra <= "9") {
            temNumero = true;
        } else {
            temEspecial = true;
        }
    }

    return senha.length >= 8 && temMaiuscula && temMinuscula && temNumero && temEspecial;
}

function cadastrar(req, res) {
    // Valores enviados pelo cadastro.html (js/cadastro.js)
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Validações (o navegador também valida, mas a API confere de novo)
    if (nome == undefined || nome.length < 2) {
        res.status(400).send("Informe um nome com pelo menos 2 letras.");
    } else if (email == undefined || !contemCaractere(email, "@") || !contemCaractere(email, ".")) {
        res.status(400).send("Informe um e-mail válido.");
    } else if (senha == undefined || !senhaForte(senha)) {
        res.status(400).send("A senha precisa ter 8+ caracteres, letra maiúscula, letra minúscula, número e caractere especial.");
    } else if (nome.length > 80 || email.length > 100 || senha.length > 50) {
        res.status(400).send("Algum campo passou do tamanho máximo.");
    } else {

        // Primeiro confere se o e-mail já está cadastrado
        usuarioModel.buscarPorEmail(email)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(409).send("Este e-mail já está cadastrado.");
                } else {
                    usuarioModel.cadastrar(nome, email, senha)
                        .then(function (resultadoCadastro) {
                            res.status(201).json(resultadoCadastro);
                        })
                        .catch(function (erro) {
                            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            })
            .catch(function (erro) {
                console.log("\nHouve um erro ao conferir o e-mail! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
}
