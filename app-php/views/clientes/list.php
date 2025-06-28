<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Clientes - Desafio Técnico</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
   
</head>



<body class="container mt-4">

<?php 

//formatar cpf com caracteres corretos
function formatarCPF($cpf) {
  $cpf = preg_replace('/\D/', '', $cpf);
  if (strlen($cpf) !== 11) return $cpf;
  return preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '$1.$2.$3-$4', $cpf);
}

//formatar data e hora para inserir no banco de dados
function formatarData($data) {
  if (!$data) return '';
  $dt = DateTime::createFromFormat('Y-m-d H:i:s', $data);
  if (!$dt) return $data; // formato incorreto
  return $dt->format('d/m/Y H:i');
}
?>

  <div class="d-flex justify-content-between align-items-center mb-3">
 
    <h1 class="m-0">Clientes</h1>
    <button class="btn btn-primary" onclick="novoCliente()">
        <i class="fa fa-plus"></i> Adicionar Cliente
    </button>
  </div>

  <div class="table-container">
  <table class="table table-custom border">
    <thead>
      <tr>
        <th>ID</th><th>Nome</th><th>CPF</th><th>Email</th><th>Status</th><th>Última Alteração</th><th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <?php if (empty($clientes)): ?>
        <tr>
          <td colspan="7" class="text-center text-muted py-3">Nenhum cliente cadastrado.</td>
        </tr>
      <?php else: ?>
        <?php foreach ($clientes as $c): ?>
        <tr>
          <td><?php echo $c['id'] ?></td>
          <td><?php echo $c['nome'] ?></td>
          <td><?php echo formatarCPF($c['cpf']) ?></td>
          <td><?php echo $c['email'] ?></td>
          <td><?php echo $c['status'] ?></td>
          <td><?php echo formatarData($c['data_alteracao']) ?></td>
          <td>
            <i class="fa-regular fa-pen-to-square mx-2 pointer text-primary" onclick="editarCliente('<?php echo $c['id'] ?>','<?php echo htmlspecialchars($c['nome']) ?>','<?php echo $c['cpf'] ?>','<?php echo htmlspecialchars($c['email']) ?>','<?php echo $c['status'] ?>')"></i>
            <i class="fa-regular fa-trash-can mx-2 pointer text-danger" onclick="excluirCliente('<?php echo $c['id'] ?>')"></i>
          </td>
        </tr>
        <?php endforeach; ?>
      <?php endif; ?>
    </tbody>
  </table>
  </div>
  <?php include 'edit.php'; ?>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/clientes.js" defer></script>
</body>
</html>
