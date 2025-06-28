<?php
require_once __DIR__ . '/../config/db.php';

//classe que realiza o CRUD no DB

class Cliente { 

    //Busca todos os clientes que não foram excluidos
    public static function getAll() {
        $db = Database::connect();
        $stmt = $db->query("SELECT id, nome, cpf, email, status, data_alteracao FROM cliente WHERE status != 'excluido'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //consulta um cliente especifico que não esteja com o status de excluido
    public static function getById($id) {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT id, nome, cpf, email, status, data_alteracao FROM cliente WHERE id = ? AND status != 'excluido'");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    //Cadastra novos clientes
    public static function create($data) {
        $db = Database::connect();
        $stmt = $db->prepare("INSERT INTO cliente (nome, cpf, email, status) VALUES (?, ?, ?, ?)");
        return $stmt->execute([
            $data['nome'],
            $data['cpf'],
            $data['email'],
            $data['status'] ?? 'ativo'
        ]);
    }
    
    //Atualiza dados dos clientes
    public static function update($id, $data) {
        $db = Database::connect();
        $stmt = $db->prepare("UPDATE cliente SET nome = ?, cpf = ?, email = ?, status = ?, data_alteracao = NOW() WHERE id = ?");
        return $stmt->execute([
            $data['nome'],
            $data['cpf'],
            $data['email'],
            $data['status'],
            $id
        ]);
    }

    //Exclui clientes da lista, porém mantem na base de dados como status de excluido. mantendo o registro do mesmo
    public static function softDelete($id) {
        $db = Database::connect();
        $stmt = $db->prepare("UPDATE cliente SET status = 'excluido', data_alteracao = NOW() WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
