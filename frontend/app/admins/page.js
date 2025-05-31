"use client";
import { useEffect, useState } from "react";

const API_URL = "https://psychic-fishstick-w6ppqw44wrjhxpp-8080.app.github.dev";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Removido bloqueio de acesso para não-admins
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/admins`)
      .then((res) => res.json())
      .then(setAdmins);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/admins/${editId}`
      : `${API_URL}/admins/cadastro`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ nome: "", email: "", senha: "" });
        setEditId(null);
        fetch(`${API_URL}/admins`)
          .then((res) => res.json())
          .then(setAdmins);
      });
  }

  function handleEdit(admin) {
    setForm({
      nome: admin.nome || "",
      email: admin.email || "",
      senha: "",
    });
    setEditId(admin.id);
  }

  function handleDelete(id) {
    fetch(`${API_URL}/admins/${id}`, { method: "DELETE" })
      .then(() => fetch(`${API_URL}/admins`))
      .then((res) => res.json())
      .then(setAdmins);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Administradores</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }} />
        <input name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required type="password" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 100 }} />
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', cursor: 'pointer' }}>{editId ? "Atualizar" : "Cadastrar"}</button>
        {editId && <button type="button" onClick={() => { setForm({ nome: "", email: "", senha: "" }); setEditId(null); }} style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>}
      </form>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Nome</th>
              <th style={{ padding: 10 }}>Email</th>
              <th style={{ padding: 10 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id}>
                <td style={{ padding: 8, textAlign: 'center', color: '#222' }}>{a.id}</td>
                <td style={{ padding: 8, color: '#222' }}>{a.nome}</td>
                <td style={{ padding: 8, color: '#222' }}>{a.email}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEdit(a)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', marginRight: 6, cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(a.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
