# Desafio técnico
Pra realização desse teste o candidato deverá realizar um fork do repositório, realizar o teste inserindo os arquivos dentro do mesmo repositório e ao finalizar todo o teste deverá realizar um Pull Request para o repositório original.

Desenvolver uma aplicação web simples para gerenciar **clientes** e **produtos**, utilizando uma **API principal em Node.js**

## 📚 O que você irá construir

## 1. 📦 CRUD de Produtos (Node.js + PostgreSQL)
Desenvolver uma **API RESTful** em **Node.js + Express**, responsável por gerenciar os dados de produtos.

- Salvar os dados no banco **PostgreSQL**
- A API deve retornar os dados **do PostgreSQL**
- Endpoints obrigatórios:
  - `GET /produtos`
  - `GET /produtos/:id`
  - `POST /produtos`
  - `PUT /produtos/:id`
  - `DELETE /produtos/:id`

## 2. 👤 CRUD de Clientes (PHP 7.4 + MySQL)
Desenvolver uma Aplicação Web Simples(2 paginas: uma de listagem e outra de edição, sem necessidade de login), utilizando PHP e uma estrutura básica em MVC (sem a utilização de frameworks para o backend). A aplicação deve exibir uma listagem de registros de **CLIENTES**, em formato de “table”, onde cada um destes, poderão sofrer todas as operações básicas de CRUD, **UTILIZAR O BANCO MYSQL**.

O layout da aplicação deverá ser responsivo / adaptativo e utilizar o Boostrap para tal. Deve ser utilizado AJAX nas operações de CRUD utilizando jQuery.

- 📄 Página 1: Listagem de clientes (com filtro e tabela responsiva) - adicionar uma coluna para excluir o cliente e outra coluna  editar o cliente
- 📄 Página 2: Edição de clientes
- Não mostrar clientes excluidos 

## 3. 💻 SPA em React
Implemente uma SPA moderna em React, que:
- Consuma os endpoints de produtos da **API Node.js**
- Faça CRUD completo de produtos
- Utilize Axios ou fetch
- O layout da aplicação deverá ser responsivo / adaptativo
- Não mostrar produtos excluidos
  
## 4. Estrutura básica das tabelas
### produtos (PostgreSQL)
- id
- nome
- preco
- estoque
- descricao
- status  (ativo, inativo, excluido)
- data_alteracao

### clientes (MYSQL)
- id
- nome
- cpf
- email
- status (ativo, inativo, excluido)
- data_alteracao

**Para o teste ser válido, o candidato deverá preencher toda a documentação básica dentro deste mesmo arquivo README.md informando todos os tópicos necessários pra ser executado no ambiente do testador.**

Em casos de problema de execução do ambiente do avaliador, o teste poderá ser desconsiderado.

# Requisitos

1. PHP 7.4;
2. MySQL >= 5.6;
3. Jquery
4. Bootstrap.
5. Git / Github.
6. NodeJs
7. Express
8. React

## Instalação

*Ambiente de produção
```bash
php -v
> Esperado: PHP >= 7.4  
*Se não tiver instalado, baixe em: https://www.php.net/downloads.php*  
  

mysql --version
> Esperado: MySQL >= 5.6  
*Se não tiver instalado, baixe em: https://dev.mysql.com/downloads/*  
  
OU 

xampp 8.2.12

/////////////////////////////////////

node -v
> Esperado: Node.js >= 14  
*Se não tiver instalado, baixe em: https://nodejs.org/*  



npm -v
> Esperado: NPM compatível com seu Node.js


psql --version
> Esperado: PostgreSQL >= 17  
*Se não tiver instalado, baixe em: https://www.postgresql.org/download/*  


//////////////////////////////

### 📂 Estrutura do projeto

desafio-tecnico\
├── api-node\     ← API RESTful (Node.js + Express + PostgreSQL) para CRUD de produtos  
│   └── ...  
├── app-php\      ← Aplicação PHP (MVC + MySQL) para CRUD de clientes  
│   └── ...  
└── web-react\    ← SPA em React para interface do CRUD de produtos  
    └── ...  
```



*🛢️ Banco de dados

🔹 MySQL (Clientes)

Para rodar localmente o banco de clientes no MySQL:

sql
- Criar banco de dados 
CREATE DATABASE IF NOT EXISTS desafio_cliente CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

- Selecionar o banco de dados
USE desafio_cliente;

- Criar tabela de cliente
CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('ativo', 'inativo', 'excluido') NOT NULL DEFAULT 'ativo',
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

#### 🔹 PostgreSQL (Produto)

Para rodar localmente o banco de produtos no PostgreSQL:

sql
- Criar banco de dados
CREATE DATABASE desafio_produto;

- Conectar ao banco
\c desafio_produtos;

- Criar tabela de produto
CREATE TABLE IF NOT EXISTS produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
    estoque INT NOT NULL CHECK (estoque >= 0),
    descricao TEXT,
    status VARCHAR(10) NOT NULL DEFAULT 'ativo',
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


>  Os scripts SQL estão disponíveis no projeto em:

desafio-tecnico/
├── api-node/
│   └── database/
│   │    └── schema.sql  ← Script para PostgreSQL
│   └── .env             ← ⚠️ Configure o user, password e nome do banco PostgreSQL
├── app-php/
│   └── database/
│   │    └── schema.sql  ← Script para MySQL
│              
└── web-react/
    └── ...
```
> **⚠️ Importante: O nome do banco, user e password *devem* ser configurados no arquivo .env**


### 📦 Instalação dos serviços

#### 🔹 API Node

```bash
cd api-node
npm install

```

Para iniciar:
```bash
node src/app.js
```
 A API ficará disponível em: http://localhost:3000/produtos  


#### 🔹 App PHP + MySQL

```bash
cd app-php
php -S 0.0.0.0:8080
```
> Acesse no navegador: http://localhost:8080  
Obs: caso a porta 8080 esteja sendo utilizada por outro serviço altere-a para 8081, 8082, etc.


#### 🔹 SPA React
```bash
cd web-react/spa-produtos
npm install
npm run dev
```
> Acesse no navegador: http://localhost:5173  
Atenção: o React precisa da API Node.js ativa para funcionar corretamente (http://localhost:3000).




## Utilização

* Abra o navegador e acesse os links
  * http://localhost:5173  → SPA React (CRUD Produtos)
  * http://localhost:8080  → App PHP (CRUD Clientes)



## Funcionamento
O projeto possui três camadas principais:  
 * API Node.js → expõe os dados dos produtos (PostgreSQL)
 * SPA React → interface moderna para CRUD de produtos
 * App PHP → interface para CRUD de clientes (MySQL)  

> Cada uma pode ser executada independentemente para facilitar testes e manutenção.