// Abrir modal para novo cliente
function novoCliente() {
  $('#clienteModalLabel').text('Novo Cliente');
  $('#clienteId').val('');
  $('#clienteNome').val('');
  $('#clienteCpf').val('');
  $('#clienteEmail').val('');
  $('#clienteStatus').val('ativo');

  const modal = new bootstrap.Modal(document.getElementById('clienteModal'));
  modal.show();
}

// Abrir modal para editar cliente
function editarCliente(id, nome, cpf, email, status) {
  $('#clienteModalLabel').text('Editar Cliente');
  $('#clienteId').val(id);
  $('#clienteNome').val(nome);
  $('#clienteCpf').val(formatarCPF(cpf));
  $('#clienteEmail').val(email);
  $('#clienteStatus').val(status);

  const modal = new bootstrap.Modal(document.getElementById('clienteModal'));
  modal.show();

  // Após preencher, já valida nome, CPF e Email
  $('#clienteNome').trigger('blur');
  $('#clienteCpf').trigger('blur');
  $('#clienteEmail').trigger('blur');
}

// Submeter formulário via AJAX
$('#clienteForm').on('submit', function(e) {
  e.preventDefault();

  const dados = $(this).serialize();
  const $btnSalvar = $('#clienteForm button[type="submit"]');

  $.ajax({
    url: 'index.php?action=save',
    type: 'POST',
    data: dados,
    beforeSend: () => {
      $btnSalvar
        .prop('disabled', true)
        .html('<i class="fa fa-spinner fa-spin me-2"></i> Salvando...');
    }
  })
  .done(() => {
    Swal.fire({
      icon: 'success',
      title: 'Salvo com sucesso!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => window.location = 'index.php');
  })
  .fail((xhr) => {
    Swal.fire({
      icon: 'error',
      title: 'Erro ao salvar',
      text: xhr.responseText || 'Erro inesperado!'
    });
  })
  .always(() => {
    $btnSalvar
      .prop('disabled', false)
      .html('<i class="fa fa-check me-2"></i> Salvar'); // Volta ao normal
  });
});


// Excluir cliente com confirmação
function excluirCliente(id) {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Essa ação não poderá ser desfeita!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      $.post('index.php?action=delete&id=' + id)
        .done(() => {
          Swal.fire({
            icon: 'success',
            title: 'Excluído!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => window.location = 'index.php');
        })
        .fail((xhr) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao excluir',
            text: xhr.responseText || 'Erro inesperado!'
          });
        });
    }
  });
}

// Limpa modal ao fechar
document.getElementById('clienteModal').addEventListener('hidden.bs.modal', () => {
  $('#clienteModalLabel').text('Novo Cliente');
  $('#clienteId').val('');
  $('#clienteNome').val('');
  $('#clienteCpf').val('');
  $('#clienteEmail').val('');
  $('#clienteStatus').val('ativo');
  $('#clienteNome').val('').removeClass('is-valid is-invalid');
  $('#clienteCpf').val('').removeClass('is-valid is-invalid');
  $('#clienteEmail').val('').removeClass('is-valid is-invalid');
});

function formatarCPF(cpf) {
  let v = cpf.replace(/\D/g, '').substr(0,11);
  if (v.length > 9) return v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  if (v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  if (v.length > 3) return v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  return v;
}


// Valida nome (Pelo menos duas palavras com no mínimo duas letras)
function validarNome(nome) {
  nome = nome.trim();
  
  // Regex: duas ou mais palavras, cada uma com pelo menos 2 letras
  const re = /^([A-Za-zÀ-ÿ]{2,}\s+){1,}[A-Za-zÀ-ÿ]{2,}$/;
  
  return re.test(nome);
}

$('#clienteNome').on('input blur', function() {
  const nome = $(this).val().trim();
  if (nome.length > 0) {
    const valido = validarNome(nome);
    $(this).toggleClass('is-valid', valido).toggleClass('is-invalid', !valido);
  } else {
    $(this).removeClass('is-valid is-invalid');
  }

  atualizarStatusBotaoSalvar();
});




// Formata e valida CPF
function validarNumeroCPF(cpf) {
  cpf = cpf.replace(/\D/g,'');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma=0, resto;
  for (let i=1; i<=9; i++) soma += parseInt(cpf.charAt(i-1)) * (11-i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i=1; i<=10; i++) soma += parseInt(cpf.charAt(i-1)) * (12-i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  return resto == parseInt(cpf.charAt(10));
}

$('#clienteCpf').on('input blur', function(e) {
  const val = $(this).val().replace(/\D/g,'').substr(0,11);
  const formatado = formatarCPF(val);
  $(this).val(formatado);

  if (val.length === 11 || e.type === 'blur') {
    const valido = validarNumeroCPF(val);
    $(this).toggleClass('is-valid', valido).toggleClass('is-invalid', !valido);
  } else {
    $(this).removeClass('is-valid is-invalid');
  }

  atualizarStatusBotaoSalvar();
});


//Valida E-Mail
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

$('#clienteEmail').on('input blur', function(e) {
  const email = $(this).val().trim();
  if (email.length > 0 && (e.type === 'blur' || email.includes('@'))) {
    const valido = validarEmail(email);
    $(this).toggleClass('is-valid', valido).toggleClass('is-invalid', !valido);
  } else {
    $(this).removeClass('is-valid is-invalid');
  }

  atualizarStatusBotaoSalvar();
});


function atualizarStatusBotaoSalvar() {
  const cpfValido = $('#clienteCpf').hasClass('is-valid');
  const emailValido = $('#clienteEmail').hasClass('is-valid');
  const nomeValido = $('#clienteNome').hasClass('is-valid');
  const statusValido = $('#clienteStatus').val().trim().length > 0;

  const tudoOk = cpfValido && emailValido && nomeValido && statusValido;
  $('#clienteForm button[type="submit"]').prop('disabled', !tudoOk);
}




function formatarData(data) {
  if (!data || typeof data !== 'string') return '';
  
  const partes = data.trim().split(' ');
  const dataPart = partes[0];
  const horaPart = partes[1] || '';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataPart) && !/^\d{4}-\d{2}-\d{2} /.test(data)) {
    return data;
  }

  const [ano, mes, dia] = dataPart.split('-');
  return horaPart ? `${dia}/${mes}/${ano} ${horaPart}` : `${dia}/${mes}/${ano}`;
}


// Loader no Ajax
$(document).ajaxStart(() => $('#loaderOverlay').show());
$(document).ajaxStop(() => $('#loaderOverlay').hide());
