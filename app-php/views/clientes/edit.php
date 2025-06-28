<div class="modal fade" id="clienteModal" tabindex="-1" aria-labelledby="clienteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form class="modal-content" id="clienteForm" method="POST">
      <div class="modal-header">
        <h5 class="modal-title" id="clienteModalLabel">Novo Cliente</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="id" id="clienteId">
        <div class="mb-3">
          <label class="form-label">Nome</label>
          <input type="text" class="form-control" id="clienteNome" name="nome" placeholder="Nome completo" required >
          <div class="invalid-feedback">Digite nome e sobrenome</div>
          <div class="valid-feedback">Nome válido.</div>
        </div>
        <div class="mb-3">
          <label class="form-label">CPF</label>
          <input type="text" class="form-control" id="clienteCpf" name="cpf" placeholder="formato: 000.000.000-00" required>
          <div class="invalid-feedback">CPF inválido.</div>
          <div class="valid-feedback">CPF válido.</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" id="clienteEmail" name="email" placeholder="formato: *@*.com*" required>
          <div class="invalid-feedback">Email inválido.</div>
          <div class="valid-feedback">Email válido.</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Status</label>
          <select class="form-select" id="clienteStatus" name="status">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-success">Salvar</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </form>
  </div>
</div>
