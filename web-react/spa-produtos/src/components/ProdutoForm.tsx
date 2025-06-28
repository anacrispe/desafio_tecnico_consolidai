import React, { useState, useEffect } from 'react';

interface Produto {
  id?: number;
  nome: string;
  preco: number;
  estoque: number;
  descricao: string;
  status: string;
}

interface Props {
  produto: Produto | null;
  onSave: (produto: Produto) => void;
  onCancel: () => void;
}

const ProdutoForm: React.FC<Props> = ({ produto, onSave, onCancel }) => {
  const [form, setForm] = useState<Produto>({
    nome: '',
    preco: 0,
    estoque: 0,
    descricao: '',
    status: 'ativo'
  });

  useEffect(() => {
    if (produto) setForm(produto);
  }, [produto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'preco' || name === 'estoque' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input type="text" className="form-control" name="nome" value={form.nome} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Preço</label>
        <input type="number" className="form-control" name="preco" value={form.preco} onChange={handleChange} step="0.01" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Estoque</label>
        <input type="number" className="form-control" name="estoque" value={form.estoque} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea className="form-control" name="descricao" value={form.descricao} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select className="form-select" name="status" value={form.status} onChange={handleChange}>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary me-2">Salvar</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ProdutoForm;
