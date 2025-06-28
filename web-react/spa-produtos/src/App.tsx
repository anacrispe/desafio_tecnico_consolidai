import React, { useEffect, useState } from 'react';
import ProdutosList from './components/ProdutosList';
import ProdutoForm from './components/ProdutoForm';
import type { Produto } from './types/Produto';
import api from './services/api';

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<Produto | null>(null);

  // Carrega os produtos da API
  const carregarProdutos = async () => {
    try {
      const { data } = await api.get('/produtos');
      console.log('Produtos carregados:', data);
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Salva um produto (novo ou edição)
  const salvarProduto = async (produto: Produto) => {
    try {
      if (produto.id) {
        await api.put(`/produtos/${produto.id}`, produto);
      } else {
        await api.post('/produtos', produto);
      }
      setEditando(null);
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  // Exclui um produto
  const excluirProduto = async (id: number) => {
    try {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {editando ? (
          <>
            <h1 className="mb-4">
              {editando.id ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>
            <div className="form-container">
              <ProdutoForm
                produto={editando}
                onSave={salvarProduto}
                onCancel={() => setEditando(null)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="m-0"> Produtos</h1>
              <button
                className="btn btn-primary"
                onClick={() =>
                  setEditando({
                    nome: '',
                    preco: 0,
                    estoque: 0,
                    descricao: '',
                    status: 'ativo'
                  })
                }
              >
                <i className="bi bi-plus"></i> Novo Produto
              </button>
            </div>

            <ProdutosList
              produtos={produtos}
              onEdit={setEditando}
              onDelete={excluirProduto}
            />
          </>
        )}
      </div>
    </div>
  );

};

export default App;
