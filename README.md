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


//////////////////////////////




*🛢️ Banco de dados

🔹 MySQL (Clientes)

Para rodar localmente o banco de clientes no MySQL:

sql
-- Criar banco de dados 
CREATE DATABASE IF NOT EXISTS desafio_cliente CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Selecionar o banco de dados
USE desafio_cliente;

-- Criar tabela de cliente
CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('ativo', 'inativo', 'excluido') NOT NULL DEFAULT 'ativo',
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);




📂 Estrutura do projeto

desafio_tecnico_consolidai\
  
├── app-php\  -> Aplicação PHP (MVC + MySQL) para CRUD de clientes  
│   └── ...  




## Utilização



## Funcionamento
