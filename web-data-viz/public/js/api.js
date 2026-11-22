// ============================================================
// ENDEREÇO DA API (servidor Node do Web Data Viz)
// O servidor precisa estar ligado com "npm start" em web-data-viz.
//
// - Página aberta pelo próprio servidor (http://localhost:3333):
//   usa o mesmo endereço, ex.: "/usuarios/cadastrar".
// - Página aberta pelo Live Server (127.0.0.1:5500) ou direto
//   do arquivo (file:///...): manda para http://localhost:3333.
//   Isso funciona porque o app.js usa cors().
// ============================================================
const ENDERECO_DO_SERVIDOR = "http://localhost:3333";

function enderecoApi(caminho) {
    if (window.location.port == "3333") {
        return caminho;
    }
    return ENDERECO_DO_SERVIDOR + caminho;
}
