import React from 'react';
import type { Produto } from '../types/Produto';

interface Props {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onDelete: (id: number) => void;
}

const ProdutosList: React.FC<Props> = ({ produtos, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Data Alteração</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-muted py-3">
                Nenhum produto cadastrado.
              </td>
            </tr>
          ) : (
            produtos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.descricao}</td>
                <td>R$ {Number(p.preco).toFixed(2)}</td>
                <td>{p.estoque}</td>
                <td>{p.status}</td>
                <td>{new Date(p.data_alteracao ?? '').toLocaleString('pt-BR')}</td>
                <td>
                  <i className="bi bi-pencil-square text-primary me-2" onClick={() => onEdit(p)} style={{ cursor: 'pointer' }}></i>
                  <i className="bi bi-trash text-danger" onClick={() => { if (p.id !== undefined) onDelete(p.id); }} style={{ cursor: 'pointer' }}></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
     </table>
    </div>
  );
};

export default ProdutosList;
