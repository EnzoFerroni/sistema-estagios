"use client";
import { useEffect, useState } from "react";

const API_URL = "https://psychic-fishstick-w6ppqw44wrjhxpp-8080.app.github.dev";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", cnpj: "", endereco: "", setor: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Removido bloqueio de acesso para não-admins
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/empresas`)
      .then((res) => res.json())
      .then(setEmpresas);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/empresas/${editId}`
      : `${API_URL}/empresas/cadastro`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ nome: "", email: "", senha: "", cnpj: "", endereco: "", setor: "" });
        setEditId(null);
        fetch(`${API_URL}/empresas`)
          .then((res) => res.json())
          .then(setEmpresas);
      });
  }

  function handleEdit(empresa) {
    setForm({
      nome: empresa.nome || "",
      email: empresa.email || "",
      senha: "",
      cnpj: empresa.cnpj || "",
      endereco: empresa.endereco || "",
      setor: empresa.setor || ""
    });
    setEditId(empresa.id);
  }

  function handleDelete(id) {
    fetch(`${API_URL}/empresas/${id}`, { method: "DELETE" })
      .then(() => fetch(`${API_URL}/empresas`))
      .then((res) => res.json())
      .then(setEmpresas);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Empresas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, color: '#222' }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, color: '#222' }} />
        <input name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required type="password" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 100, color: '#222' }} />
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 100, color: '#222' }} />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, color: '#222' }} />
        <input name="setor" placeholder="Setor" value={form.setor} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 100, color: '#222' }} />
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', cursor: 'pointer' }}>{editId ? "Atualizar" : "Cadastrar"}</button>
        {editId && <button type="button" onClick={() => { setForm({ nome: "", email: "", senha: "", cnpj: "", endereco: "", setor: "" }); setEditId(null); }} style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>}
      </form>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Nome</th>
              <th style={{ padding: 10 }}>Email</th>
              <th style={{ padding: 10 }}>CNPJ</th>
              <th style={{ padding: 10 }}>Endereço</th>
              <th style={{ padding: 10 }}>Setor</th>
              <th style={{ padding: 10 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((e) => (
              <tr key={e.id}>
                <td style={{ padding: 8, textAlign: 'center', color: '#222' }}>{e.id}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.nome}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.email}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.cnpj}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.endereco}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.setor}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEdit(e)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', marginRight: 6, cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(e.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
