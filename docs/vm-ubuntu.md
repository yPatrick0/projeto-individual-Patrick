# Banco na VM Linux (Ubuntu)

O MySQL do Memórias de Aventura roda numa máquina virtual Ubuntu na VirtualBox. A API Node.js continua no Windows e se conecta ao banco da VM pela rede.

```
Navegador → API Node.js (Windows, porta 3333) → MySQL (VM Ubuntu, porta 3306)
```

## 1. Instalar o MySQL na VM

No terminal do Ubuntu:

```bash
sudo apt update
sudo apt install mysql-server git -y
sudo systemctl status mysql
```

O status precisa aparecer como `active (running)`. Para sair da tela do status, aperte `q`.

## 2. Criar o banco com o script do projeto

```bash
git clone https://github.com/yPatrick0/projeto-individual-Patrick.git
cd projeto-individual-Patrick
sudo mysql < banco-de-dados/script.sql
```

Conferir se as tabelas foram criadas:

```bash
sudo mysql -e "USE memorias_aventura; SHOW TABLES; SELECT id, episodio FROM mensagem;"
```

## 3. Criar um usuário para a API

```bash
sudo mysql
```

```sql
CREATE USER 'aventura'@'%' IDENTIFIED BY 'escolha_uma_senha';
GRANT ALL PRIVILEGES ON memorias_aventura.* TO 'aventura'@'%';
FLUSH PRIVILEGES;
EXIT;
```

A senha escolhida vai só no `.env.dev` do seu computador, nunca no GitHub.

## 4. Liberar o MySQL para fora da VM

Por padrão o MySQL só aceita conexões da própria VM. Abra o arquivo de configuração:

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Troque a linha `bind-address = 127.0.0.1` por `bind-address = 0.0.0.0`. Salve com Ctrl + O, Enter e saia com Ctrl + X. Depois reinicie o serviço:

```bash
sudo systemctl restart mysql
```

## 5. Redirecionar a porta na VirtualBox

Com a VM em rede NAT: **Configurações → Rede → Adaptador 1 → Avançado → Redirecionamento de Portas**. Adicione a regra:

| Nome | Protocolo | IP do hospedeiro | Porta do hospedeiro | Porta do convidado |
|---|---|---|---|---|
| mysql | TCP | 127.0.0.1 | 3307 | 3306 |

A porta 3307 é usada no Windows para não brigar com um MySQL que já esteja instalado nele.

## 6. Apontar a API para a VM

No arquivo `web-data-viz/.env.dev` do Windows:

```
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=memorias_aventura
DB_USER=aventura
DB_PASSWORD=a_senha_do_passo_3
```

Depois, dentro de `web-data-viz`, rode `npm start` e abra `http://localhost:3333`. Se o cadastro e o dashboard funcionarem, a API está falando com o banco da VM.

## Teste rápido pelo Workbench

No MySQL Workbench, crie uma conexão com host `127.0.0.1`, porta `3307` e usuário `aventura`. Se conectar, a rede e o usuário estão certos.

## Problemas comuns

| Erro | O que conferir |
|---|---|
| `ECONNREFUSED` no `npm start` | A VM está ligada? O MySQL está `active`? A regra de porta foi salva? |
| `Access denied for user` | Usuário e senha do `.env.dev` iguais aos do passo 3. |
| `Host is not allowed to connect` | O usuário foi criado com `'%'` e o `bind-address` está `0.0.0.0`. |
