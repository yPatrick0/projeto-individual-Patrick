var database = require("../database/config")

function protegerTexto(texto) {
    var textoProtegido = texto.replaceAll("\\", "\\\\");
    textoProtegido = textoProtegido.replaceAll("'", "''");
    return textoProtegido;
}

function buscarPorEmail(email) {
    var instrucaoSql = `
        SELECT id FROM usuario WHERE email = '${protegerTexto(email)}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email);
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario
        WHERE email = '${protegerTexto(email)}' AND senha = '${protegerTexto(senha)}';
    `;
    console.log("Executando a instrução SQL de login para o e-mail: " + email);
    return database.executar(instrucaoSql);
}

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
