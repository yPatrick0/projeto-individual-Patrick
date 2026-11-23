# Fontes das imagens

Consulta e preparação dos retratos: **18/11/2026**.
Os arquivos são locais; o site não depende dos servidores de origem para exibi-los.
Personagens e imagens da série pertencem aos respectivos titulares de direitos.
Listar uma fonte não equivale a obter licença: revisar permissões antes de publicar o projeto.

## Fotos atuais fornecidas pelo autor em ZIP (19/11/2026)

Os cinco JPEGs abaixo foram copiados sem recorte, conversão ou alteração dos bytes
do ZIP `imgs personagens.zip` fornecido pelo autor. O enquadramento é feito no CSS
com `object-fit: cover` e posições por personagem, mantendo chapéu e coroas visíveis.
Origem anterior ao ZIP e permissão de publicação não foram informadas.

| Arquivo local | Arquivo no ZIP | Personagem |
| --- | --- | --- |
| `finn.jpeg` | `IMG_4275.jpeg` | Finn |
| `jake.jpeg` | `IMG_4276.jpeg` | Jake |
| `bmo.jpeg` | `IMG_4277.jpeg` | BMO |
| `princesa-jujuba.jpeg` | `IMG_4278.jpeg` | Princesa Jujuba |
| `rei-gelado.jpeg` | `IMG_4279.jpeg` | Rei Gelado |

Cartões da inicial e cartas reveladas usam os mesmos arquivos. Sequência de Ooo
reutiliza `finn.jpeg`, `jake.jpeg` e `bmo.jpeg`; não possui botões de Jujuba ou Rei
Gelado. Naquela substituição, Marceline foi preservada e `IMG_4280.jpeg`, também
presente no ZIP, não foi utilizado porque não fazia parte da correspondência
solicitada. Cenários, destaque principal e verso foram preservados.

### Atualização da Marceline pelo ZIP específico (19/11/2026)

`marceline.jpeg` é a cópia integral de `IMG_4280.jpeg` (896 × 945px), recebido no ZIP
`foto marceline.zip` fornecido pelo autor. SHA256 conferido: bytes iguais ao original.
O cartão, as duas cartas do par e o botão da Sequência de Ooo usam esse mesmo arquivo.
O CSS utiliza `object-fit: cover` e `object-position: 50% 20%`, sem distorcer a foto,
mantendo o rosto, o chapéu e parte do baixo visíveis. A imagem antiga foi preservada.
Origem anterior ao ZIP e permissão de publicação não foram informadas.

## Retratos WebP anteriores preservados

Todos os arquivos `*-rosto.webp` têm 480 × 480 pixels. Cada imagem foi examinada e
recortada individualmente; as duas cartas de cada par referenciam exatamente o mesmo
arquivo. As coordenadas abaixo são `(x, y, largura, altura)` na imagem de origem.
Recortes ampliados não acrescentam detalhes à resolução da fonte.

| Arquivo local | Origem | Preparação |
| --- | --- | --- |
| `finn-rosto.webp` | `finn.webp`, recebido no ZIP `Prototipo_Hora_de_Aventura_Editavel.zip` | Recorte `(125, 65, 310, 310)`, preservando chapéu e rosto |
| `jake-rosto.webp` | `jake.webp`, recebido no mesmo ZIP | Recorte `(15, 80, 300, 298)`, destacando rosto e focinho |
| `marceline-rosto.webp` | `marceline.webp`, recebido no mesmo ZIP | Recorte `(290, 100, 310, 310)`, mostrando rosto, cabelo e parte do baixo |
| `bmo-rosto.webp` | [Página do PNG Mart](https://www.pngmart.com/image/207563) · [PNG baixado](https://www.pngmart.com/files/13/Adventure-Time-BMO-Background-PNG.png) | Recorte `(260, 50, 560, 560)`; fundo verde-claro para a transparência |
| `rei-gelado-rosto.webp` | [Página do arquivo na Wikipédia](https://en.wikipedia.org/wiki/File:Ice_King.png) · [PNG baixado](https://upload.wikimedia.org/wikipedia/en/7/78/Ice_King.png) | Recorte `(25, 0, 245, 245)`; fundo azul-claro, preservando a coroa |
| `princesa-jujuba-rosto.webp` | [Página do PNG Mart](https://www.pngmart.com/image/208937) · [PNG baixado](https://www.pngmart.com/files/13/Adventure-Time-Princess-Transparent-Background.png) | Recorte `(380, 80, 460, 460)`; fundo rosa-claro, cabelo e coroa destacados |

As páginas do PNG Mart descrevem as imagens como destinadas a uso pessoal;
isso não estabelece autorização para redistribuição pública ou uso comercial.
A imagem do Rei Gelado aparece na Wikipédia em inglês como material de personagem
protegido por direitos autorais, não como uma fotografia de licença livre.

## Imagens anteriores preservadas

Os oito WebP originais continuam nesta pasta para preservar o protótipo histórico.
O protótipo fornecido indicava a [página da série na Apple TV](https://tv.apple.com/br/show/hora-de-aventura/umc.cmc.379m2it2q2g5zi6dwqi84cwpw)
como referência geral. Essa indicação não foi confirmada como URL individual de
cada imagem, nem como licença. `destaque.webp` e `marceline-rei-gelado.webp`
continuam sendo usados nas seções de apresentação da página principal.

## Verso das cartas

`verso-ooo.svg`: composição geométrica criada em código pelo assistente OpenCode
(GPT-6.1 Sol), com losango, estrelas e o nome do cenário “Ooo”. Não foi baixada de
terceiros e não é uma reprodução de logotipo oficial.

Em 19/11/2026, na adoção do nome **Memórias de Aventura**, somente o texto visível
do verso foi atualizado para a marca em duas linhas. Nome técnico do arquivo,
cores e composição geométrica foram preservados.

## Cenários incorporados do visual do Claude (20/11/2026)

Recebidos em `projeto-individual-Patrick (3).zip`. O documento de fontes do ZIP
informa que foram enviados pelo autor ao Claude em 19/11/2026. Isso não comprova
a origem anterior nem a permissão de publicação. Os três WebP foram importados
sem nova conversão, ampliação ou alteração dos bytes.

| Arquivo em `cenarios/` | Resolução real | Uso |
| --- | --- | --- |
| `casa-na-arvore.webp` | 1042 × 587px | Apresentação da inicial, cadastro e login |
| `casa-na-arvore-por-do-sol.webp` | 1200 × 675px | Minha história |
| `ceu-noturno.webp` | 1200 × 675px | Memória e página da Sequência |

Segundo o registro do ZIP, a casa com céu rosa veio de uma imagem de 1045 × 596px,
recortada para retirar bordas pretas; os outros dois cenários não foram recortados.
Esses originais anteriores à conversão não estavam no ZIP.

### Comparação e limitações de qualidade

- Os 20 arquivos JPEG/WebP já existentes são idênticos aos correspondentes do ZIP:
  não havia versões melhores desses mesmos arquivos no pacote. As seis fotos atuais
  foram preservadas; o Rei Gelado tem a menor largura (512 × 697px).
- `destaque.webp` tem 576 × 675px e `marceline-rei-gelado.webp`, 950 × 534px.
  São suficientes para os tamanhos comuns em CSS, mas não garantem nitidez em telas
  de alta densidade. O recorte de `cover` também pode ampliar partes da imagem.
- Os três cenários continuam limitados em monitores grandes. No Chrome a 1920px,
  a área de fundo chegou a aproximadamente 1905px de largura; a casa rosa é ampliada
  cerca de 1,83 vez e os demais cenários, pelo menos 1,59 vez. Não houve upscale
  artificial nem promessa de qualidade Full HD.
- A imagem local `Downloads/442432.jpg` (1920 × 1080px) foi comparada visualmente,
  mas descartada: a disposição da casa, montanhas e nuvens difere da cena rosa.
  Não seria uma versão maior da mesma composição.
- Buscas via DuckDuckGo localizaram candidatos, incluindo
  [casa ao pôr do sol no Wallpapers.com](https://wallpapers.com/wallpapers/adventure-time-treehouseat-sunset-gbudnmyfusgmer1e.html),
  [casa no UHD Paper](https://www.uhdpaper.com/2024/11/3703b-adventure-time-tree-house-sunset.html?m=0)
  e [céu noturno no Wallpaperbetter](https://www.wallpaperbetter.com/en/hd-wallpaper-wlohb).
  As páginas de download, além de WallpaperAccess, WallpaperCave e Pinterest,
  falharam por erros de transporte/conexão; Python e PowerShell também registraram
  falhas de validação de certificado. Google exigiu JavaScript; a busca integrada
  retornou cancelamento. Nenhuma versão maior pôde ser baixada e confirmada como
  a mesma cena. Não foram desabilitadas verificações de segurança.
- Conferidos carregamento e aparência no Chrome em computador e celular.
  Em cadastro/login até 800px, o cenário fica em uma faixa de 600px de altura
  no fim da página, com transição para o fundo claro. Isso reduz a ampliação
  excessiva causada por `cover` na página inteira, sem criar detalhes novos.
  A melhoria da resolução das três cenas permanece pendente de originais maiores
  ou de acesso a uma fonte que permita baixar e comparar os arquivos.

## Dados da série recebidos com a nova inicial

A ficha fornecida pelo Claude informa criação por Pendleton Ward, exibição original
no Cartoon Network de 2010 a 2018, 10 temporadas e 283 episódios, além de
*Terras Distantes* (2020–2021) e *Fionna e Cake* (estreia em 2023).
Os anos das continuações não pretendem descrever seu estado atual de produção.
Fontes indicadas no ZIP (consulta declarada pelo Claude em 19/11/2026, não
revalidada independentemente nesta integração):

- [Adventure Time — Wikipédia](https://en.wikipedia.org/wiki/Adventure_Time)
- [Adventure Time Wiki](https://adventuretime.fandom.com/wiki/Adventure_Time)
- [TV Tropes — franquia](https://www.tvtropes.org/pmwiki/pmwiki.php/Franchise/AdventureTime)

Revisão pelo autor pendente, inclusive a forma de contar episódios/segmentos.

## Ampliação dos cenários (21/11/2026)

A pedido do autor, os três cenários foram ampliados pelo Claude para 2400px de largura,
porque eram esticados quase 2 vezes em telas Full HD e ficavam borrados.
Processo, feito com OpenCV: limpeza leve de artefatos de compressão (filtro bilateral),
ampliação em duas etapas com Lanczos e nitidez leve (unsharp mask).

- `casa-na-arvore.webp`: 1042 × 587px → 2400 × 1352px
- `casa-na-arvore-por-do-sol.webp`: 1200 × 675px → 2400 × 1350px
- `ceu-noturno.webp`: 1200 × 675px → 2400 × 1350px

É uma ampliação artificial: os contornos ficam mais definidos, mas nenhum detalhe novo
é criado. Os arquivos menores anteriores foram removidos do repositório para não duplicar imagens.
A solução definitiva continua sendo baixar versões maiores das mesmas cenas
(candidatos listados acima) e substituir estes arquivos mantendo os mesmos nomes.

## Nova imagem de destaque (22/11/2026)

`destaque.webp` foi trocada por uma imagem de Finn e Jake sentados num tronco na floresta, enviada pelo autor na conversa com o assistente (Claude). A imagem original (768 × 1136px) foi recortada para 768 × 900px, mantendo os dois personagens no centro, e salva em WebP com o mesmo nome, por isso a página inicial, o cadastro e o login usam a nova imagem sem mudança no HTML ou no CSS. Origem e permissão de publicação não foram informadas. A versão anterior continua no histórico do Git.
