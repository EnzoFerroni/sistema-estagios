"use client";
import { useEffect, useState } from "react";

const API_URL = "https://psychic-fishstick-w6ppqw44wrjhxpp-8080.app.github.dev";

export default function VagasPage() {
  const [vagas, setVagas] = useState([]);
  const [form, setForm] = useState({ titulo: "", descricao: "", empresa: null });
  const [empresas, setEmpresas] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Removido bloqueio de acesso para não-admins
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/vagas`).then((res) => res.json()).then(setVagas);
    fetch(`${API_URL}/empresas`).then((res) => res.json()).then(setEmpresas);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEmpresaChange(e) {
    setForm({ ...form, empresa: empresas.find(emp => emp.id == e.target.value) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/vagas/${editId}`
      : `${API_URL}/vagas`;
    const body = { ...form, empresa: form.empresa };
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ titulo: "", descricao: "", empresa: null });
        setEditId(null);
        fetch(`${API_URL}/vagas`).then((res) => res.json()).then(setVagas);
      });
  }

  function handleEdit(vaga) {
    setForm({ ...vaga, empresa: vaga.empresa });
    setEditId(vaga.id);
  }

  function handleDelete(id) {
    fetch(`${API_URL}/vagas/${id}`, { method: "DELETE" })
      .then(() => fetch(`${API_URL}/vagas`))
      .then((res) => res.json())
      .then(setVagas);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Vagas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }} />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }} />
        <select name="empresa" value={form.empresa?.id || ""} onChange={handleEmpresaChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }}>
          <option value="">Selecione a empresa</option>
          {empresas.map((e) => (
            <option key={e.id} value={e.id}>{e.nome}</option>
          ))}
        </select>
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', cursor: 'pointer' }}>{editId ? "Atualizar" : "Cadastrar"}</button>
        {editId && <button type="button" onClick={() => { setForm({ titulo: "", descricao: "", empresa: null }); setEditId(null); }} style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>}
      </form>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Título</th>
              <th style={{ padding: 10 }}>Descrição</th>
              <th style={{ padding: 10 }}>Empresa</th>
              <th style={{ padding: 10 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map((v) => (
              <tr key={v.id}>
                <td style={{ padding: 8, textAlign: 'center', color: '#222' }}>{v.id}</td>
                <td style={{ padding: 8, color: '#222' }}>{v.titulo}</td>
                <td style={{ padding: 8, color: '#222' }}>{v.descricao}</td>
                <td style={{ padding: 8, color: '#222' }}>{v.empresa?.nome}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEdit(v)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', marginRight: 6, cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(v.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
