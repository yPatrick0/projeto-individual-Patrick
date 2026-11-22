var database = require("../database/config")

// Protege o texto antes de colocar na instrução SQL.
// Percorre o texto letra por letra (como um vetor) e monta um texto novo:
// - o apóstrofo ' vira '' (ex.: "D'Ávila")
// - a barra invertida \ vira \\
// Assim o que a pessoa digita nunca quebra nem muda o comando SQL.
function protegerTexto(texto) {
    var textoProtegido = "";

    for (var i = 0; i < texto.length; i++) {
        var letra = texto[i];

        if (letra == "'") {
            textoProtegido = textoProtegido + "''";
        } else if (letra == "\\") {
            textoProtegido = textoProtegido + "\\\\";
        } else {
            textoProtegido = textoProtegido + letra;
        }
    }

    return textoProtegido;
}

// Confere se já existe um usuário com este e-mail (usado antes do cadastro)
function buscarPorEmail(email) {
    var instrucaoSql = `
        SELECT id FROM usuario WHERE email = '${protegerTexto(email)}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Login: procura um usuário com este e-mail e senha
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email);
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario
        WHERE email = '${protegerTexto(email)}' AND senha = '${protegerTexto(senha)}';
    `;
    console.log("Executando a instrução SQL de login para o e-mail: " + email);
    return database.executar(instrucaoSql);
}

// Cadastro: grava um novo usuário na tabela usuario
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email);

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${protegerTexto(nome)}', '${protegerTexto(email)}', '${protegerTexto(senha)}');
    `;
    console.log("Executando a instrução SQL de cadastro para o e-mail: " + email);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    buscarPorEmail,
    cadastrar
};
