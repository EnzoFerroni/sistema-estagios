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

export default function GerenciarVagasEmpresaPage() {
  const [vagas, setVagas] = useState([]);
  const [form, setForm] = useState({ titulo: "", descricao: "", competencia: "" });
  const [editId, setEditId] = useState(null);
  const [estudantesPorVaga, setEstudantesPorVaga] = useState({});
  const [msg, setMsg] = useState("");
  const [vagasAbertas, setVagasAbertas] = useState({});
  const empresaId = typeof window !== 'undefined' ? localStorage.getItem("id") : null;

  useEffect(() => {
    if (!empresaId) return;
    fetch(`${API_URL}/vagas?empresaId=${empresaId}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setVagas(data);
        else setVagas([]);
      });
  }, [empresaId]);

  function atualizarVagas() {
    fetch(`${API_URL}/vagas?empresaId=${empresaId}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setVagas(data);
        else setVagas([]);
      });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/vagas/${editId}` : `${API_URL}/vagas`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, empresa: { id: empresaId } }),
    })
      .then(r => r.json())
      .then(() => {
        setForm({ titulo: "", descricao: "", competencia: "" });
        setEditId(null);
        setMsg(editId ? "Vaga atualizada!" : "Vaga criada!");
        atualizarVagas();
      });
  }

  function handleEdit(vaga) {
    setForm({ titulo: vaga.titulo, descricao: vaga.descricao, competencia: vaga.competencia });
    setEditId(vaga.id);
  }

  function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta vaga?")) return;
    fetch(`${API_URL}/vagas/${id}`, { method: "DELETE" })
      .then(() => {
        setMsg("Vaga excluída!");
        atualizarVagas();
      });
  }

  function toggleInscritos(vagaId) {
    setVagasAbertas((prev) => {
      const aberto = !prev[vagaId];
      if (aberto && !estudantesPorVaga[vagaId]) {
        // Busca inscritos apenas se ainda não buscou
        fetch(`${API_URL}/inscricoes/vaga/${vagaId}`)
          .then(r => r.json())
          .then(data => {
            setEstudantesPorVaga((old) => ({ ...old, [vagaId]: data }));
          });
      }
      return { ...prev, [vagaId]: aberto };
    });
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 32, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Gerenciar Vagas da Empresa</h1>
      {msg && <div style={{ color: msg.includes("excluída") ? '#d32f2f' : '#388e3c', marginBottom: 18, textAlign: 'center', fontWeight: 600 }}>{msg}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 6px #0001' }}>
        <h3 style={{ color: '#1976d2', marginBottom: 16 }}>{editId ? "Editar Vaga" : "Nova Vaga"}</h3>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Título</label>
          <input name="titulo" value={form.titulo} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Descrição</label>
          <textarea name="descricao" value={form.descricao} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, minHeight: 60, color: '#222', background: '#fff' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Competência</label>
          <input name="competencia" value={form.competencia} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button type="submit" style={{ flex: 1, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, boxShadow: '0 2px 8px #0001', cursor: 'pointer' }}>{editId ? "Salvar" : "Criar Vaga"}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm({ titulo: "", descricao: "", competencia: "" }); }} style={{ flex: 1, background: '#eee', color: '#1976d2', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, boxShadow: '0 2px 8px #0001', cursor: 'pointer' }}>Cancelar</button>}
        </div>
      </form>
      <h3 style={{ color: '#1976d2', marginBottom: 16 }}>Minhas Vagas</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>Título</th>
              <th style={{ padding: 10 }}>Descrição</th>
              <th style={{ padding: 10 }}>Competência</th>
              <th style={{ padding: 10 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagas.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>Nenhuma vaga cadastrada</td></tr>
            )}
            {vagas.map((vaga) => (
              <>
                <tr key={vaga.id}>
                  <td style={{ padding: 8 }}>{vaga.titulo}</td>
                  <td style={{ padding: 8 }}>{vaga.descricao}</td>
                  <td style={{ padding: 8 }}>{vaga.competencia}</td>
                  <td style={{ padding: 8, display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(vaga)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>Editar</button>
                    <button onClick={() => handleDelete(vaga.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>Excluir</button>
                    <button onClick={() => toggleInscritos(vaga.id)} style={{ background: vagasAbertas[vaga.id] ? '#aaa' : '#388e3c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>
                      {vagasAbertas[vaga.id] ? 'Ocultar Inscritos' : 'Mostrar Inscritos'}
                    </button>
                  </td>
                </tr>
                {vagasAbertas[vaga.id] && (
                  <tr>
                    <td colSpan={4} style={{ background: '#f9f9fb', borderRadius: 8, padding: 0 }}>
                      <div style={{ padding: 18 }}>
                        <h4 style={{ color: '#1976d2', marginBottom: 12 }}>Estudantes inscritos</h4>
                        {estudantesPorVaga[vaga.id] === undefined ? (
                          <div style={{ color: '#888' }}>Carregando...</div>
                        ) : estudantesPorVaga[vaga.id].length === 0 ? (
                          <div style={{ color: '#888' }}>Nenhum estudante inscrito nesta vaga.</div>
                        ) : (
                          <ul style={{ paddingLeft: 18 }}>
                            {estudantesPorVaga[vaga.id].map((i) => (
                              <li key={i.id} style={{ marginBottom: 8, color: '#222', background: '#fff', borderRadius: 6, padding: '8px 12px', boxShadow: '0 1px 4px #0001', fontSize: 16 }}>
                                <span style={{ fontWeight: 600 }}>{i.estudante?.nome} {i.estudante?.sobrenome}</span> - <span style={{ color: '#1976d2' }}>{i.estudante?.email}</span> <span style={{ color: '#555', fontSize: 14 }}>({i.estudante?.cargo})</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
