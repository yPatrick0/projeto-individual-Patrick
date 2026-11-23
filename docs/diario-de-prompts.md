# Diário de Prompts

Registro do uso de IA no projeto **Memórias de Aventura**. Ferramentas: ChatGPT, OpenCode (GPT-6.1 Sol) e Claude (Claude Opus 5.5). O registro detalhado está em [`historico/diario-de-prompts-completo.md`](historico/diario-de-prompts-completo.md).

| # | O que pedi | Como a IA ajudou | O que aprendi |
|---|---|---|---|
| 1 | "Me ajuda a organizar as pastas do projeto." | Sugeriu e explicou a estrutura. | `public/` é o site, `src/` é a API, e o `.gitignore` protege o `.env.dev`. |
| 2 | "Traz o Web Data Viz da turma para o meu projeto." | Copiou a API da turma. | O caminho rota → controller → model → banco, e os comandos `npm start` e Ctrl + C. |
| 3 | "Transforma o meu protótipo na página inicial e cria um jogo da memória." | Montou a página e o jogo. | Vetores, `Math.random()` para embaralhar e `if` para conferir os pares. |
| 4 | "Cria um jogo de sequência com os personagens." | Criou a Sequência. | `.push()` para aumentar a sequência e `setTimeout` para o tempo de cada personagem. |
| 5 | "Refaz a documentação com a minha história, seguindo o exemplo." | Organizou o texto no modelo da SPTech. | O que cada parte do escopo precisa responder. |
| 6 | "Cria o banco com 3 tabelas." | Escreveu o `script.sql`. | PRIMARY KEY, FOREIGN KEY e o relacionamento 1:N. |
| 7 | "Faz o cadastro, o login e o dashboard funcionarem com a API." | Ligou as páginas à API e me guiou nos testes. | `fetch`, `INSERT`/`SELECT` e `sessionStorage`. |
| 8 | "Por que a minha conta nova já tem dados no painel?" | Explicou e filtrou por usuário. | `WHERE fk_usuario` e o Chart.js. |
| 9 | "Quero ver a força da senha e o que falta nela." | Fez a validação. | `for` com `senha[i]` e `.includes()`. |
| 10 | "Me dá ideias para mostrar a frase e o episódio." | Criou a carta e o álbum. | `if` para escolher a carta pelo desempenho e LEFT JOIN no álbum. |
| 11 | "Usa só comandos da aula e tira os comentários." | Revisou o código com os guias do Moodle. | Os comandos dos guias de Algoritmos e Strings. |
| 12 | "Cria o DER das 3 tabelas no meu MySQL." | Gerou o DER no Workbench. | Database → Reverse Engineer. |
| 13 | "Troca a imagem, escurece os fundos e atualiza a documentação." | Fez os ajustes de imagem e CSS. | Máscara com `rgba(0,0,0,.25)`. |
| 14 | "Coloca um timer nos dois minijogos mostrando o tempo que passou." | Criou o cronômetro nos dois jogos. | `setTimeout` repetido a cada 1 segundo, `Math.floor` e `%` para mostrar minutos e segundos. |
| 15 | "Usa as fotos novas nas cartas e mostra em todas a frase, a lição, o episódio em português e onde assistir." | Trocou as fotos, colocou os títulos em português e "HBO Max e YouTube". | Os dados de cada carta ficam num vetor de objetos (`mensagensDosEpisodios`), e a carta só lê esses campos. |
