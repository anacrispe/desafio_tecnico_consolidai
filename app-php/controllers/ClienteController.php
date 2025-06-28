<?php
require_once __DIR__ . '/../models/Cliente.php';

class ClienteController {

    //Tras a lista de clientes para a tela principal
    public function index() {
        $clientes = Cliente::getAll();
        include __DIR__ . '/../views/clientes/list.php';
    }


    //verificando se os dados estão sendo preenchidos corretamente
    public function save($data = null) {
        $data = $data ?? $_POST;

        if (empty($data)) {
            http_response_code(400);
            echo 'Dados inválidos';
            return;
        }

        //tratando CPF
        $data['cpf'] = preg_replace('/\D/', '', $data['cpf']);


        //Tratativa dos dados para cadastro
        try {
            if (!empty($data['id'])) {
                $ok = Cliente::update($data['id'], $data);
            } else {
                $ok = Cliente::create($data);
            }

            if ($ok) {
                echo 'OK';
            } else {
                http_response_code(500);
                echo 'Erro ao salvar';
            }
        } catch (PDOException $e) {
            http_response_code(500);
            if ($e->getCode() == '23000') {
                if (strpos($e->getMessage(), 'cpf') !== false) {
                    echo 'CPF já cadastrado anteriormente!';
                } elseif (strpos($e->getMessage(), 'email') !== false) {
                    echo 'Email já cadastrado anteriormente!';
                } else {
                    echo 'Já existe um cadastro com esses dados!';
                }
            } else {
                echo 'Erro no banco: ' . $e->getMessage();
            }
        }
    }


    //deletar usuario (mantendo dado no banco)
    public function delete() {
        $id = $_GET['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo 'ID inválido';
            return;
        }

        try {
            $ok = Cliente::softDelete($id);

            if ($ok) {
                echo 'OK';
            } else {
                http_response_code(500);
                echo 'Erro ao excluir';
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo 'Erro no banco: ' . $e->getMessage();
        }
    }
}
