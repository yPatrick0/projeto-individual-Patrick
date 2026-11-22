var database = require("../database/config")

// Protege o texto antes de colocar na instrução SQL:
// - a barra invertida \ vira \\
// - o apóstrofo ' vira '' (ex.: "D'Ávila")
// Assim o que a pessoa digita nunca quebra nem muda o comando SQL.
function protegerTexto(texto) {
    return String(texto).replace(/\\/g, "\\\\").replace(/'/g, "''");
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
    cadastrar
};
