// ============================================================
// ENDEREÇO DA API (servidor Node do Web Data Viz)
// O servidor precisa estar ligado com "npm start" em web-data-viz.
//
// Todas as chamadas vão para http://localhost:3333, então o site
// funciona aberto pelo próprio servidor, pelo Live Server
// (127.0.0.1:5500) ou direto do arquivo. Isso funciona porque o
// app.js do Web Data Viz usa cors().
// ============================================================
const ENDERECO_DO_SERVIDOR = "http://localhost:3333";

// Ex.: enderecoApi("/usuarios/cadastrar") -> "http://localhost:3333/usuarios/cadastrar"
function enderecoApi(caminho) {
    return ENDERECO_DO_SERVIDOR + caminho;
}
