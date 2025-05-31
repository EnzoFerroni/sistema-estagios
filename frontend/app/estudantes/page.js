"use client";
import { useEffect, useState } from "react";

function getCodespaceApiUrl() {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const match = host.match(/^([a-z0-9-]+)-3000\.app\.github\.dev$/);
    if (match && match[1]) {
      return `https://${match[1]}-8080.app.github.dev`;
    }
  }
  return '';
}
const API_URL = getCodespaceApiUrl();

export default function EstudantesPage() {
  const [estudantes, setEstudantes] = useState([]);
  const [form, setForm] = useState({ nome: "", sobrenome: "", email: "", cargo: "", sobreMim: "", senha: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Removido bloqueio de acesso para não-admins
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/estudantes`)
      .then((res) => res.json())
      .then(setEstudantes);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/estudantes/${editId}`
      : `${API_URL}/estudantes/cadastro`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ nome: "", sobrenome: "", email: "", cargo: "", sobreMim: "", senha: "" });
        setEditId(null);
        fetch(`${API_URL}/estudantes`)
          .then((res) => res.json())
          .then(setEstudantes);
      });
  }

  function handleEdit(estudante) {
    setForm({
      nome: estudante.nome || "",
      sobrenome: estudante.sobrenome || "",
      email: estudante.email || "",
      cargo: estudante.cargo || "",
      sobreMim: estudante.sobreMim || "",
      senha: ""
    });
    setEditId(estudante.id);
  }

  function handleDelete(id) {
    fetch(`${API_URL}/estudantes/${id}`, { method: "DELETE" })
      .then(() => fetch(`${API_URL}/estudantes`))
      .then((res) => res.json())
      .then(setEstudantes);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Estudantes</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, color: '#222' }} />
        <input name="sobrenome" placeholder="Sobrenome" value={form.sobrenome} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, color: '#222' }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, color: '#222' }} />
        <input name="cargo" placeholder="Cargo" value={form.cargo} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 100, color: '#222' }} />
        <input name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required type="password" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 100, color: '#222' }} />
        <textarea name="sobreMim" placeholder="Sobre Mim" value={form.sobreMim} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, color: '#222' }} />
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', cursor: 'pointer' }}>{editId ? "Atualizar" : "Cadastrar"}</button>
        {editId && <button type="button" onClick={() => { setForm({ nome: "", sobrenome: "", email: "", cargo: "", sobreMim: "", senha: "" }); setEditId(null); }} style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>}
      </form>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Nome</th>
              <th style={{ padding: 10 }}>Sobrenome</th>
              <th style={{ padding: 10 }}>Email</th>
              <th style={{ padding: 10 }}>Cargo</th>
              <th style={{ padding: 10 }}>Sobre mim</th>
              <th style={{ padding: 10 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(estudantes) ? estudantes : []).map((e) => (
              <tr key={e.id}>
                <td style={{ padding: 8, textAlign: 'center', color: '#222' }}>{e.id}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.nome}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.sobrenome}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.email}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.cargo}</td>
                <td style={{ padding: 8, color: '#222' }}>{e.sobreMim}</td>
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
