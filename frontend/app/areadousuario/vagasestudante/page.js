"use client";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

// Página de vagas para estudantes agora está em /areadousuario/vagasestudante

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

export default function VagasEstudantePage() {
  const [vagas, setVagas] = useState([]);
  const [inscritas, setInscritas] = useState([]);
  const [loading, setLoading] = useState(true);
  const estudanteId = typeof window !== 'undefined' ? localStorage.getItem("id") : null;

  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("tipo") !== "estudante") {
      window.location.href = "/login";
      return;
    }
    fetch(`${API_URL}/vagas`).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setVagas(data);
      else setVagas([]);
    });
    if (estudanteId) {
      fetch(`${API_URL}/inscricoes/estudante/${estudanteId}`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) setInscritas(data);
          else setInscritas([]);
        })
        .finally(() => setLoading(false));
    } else {
      setInscritas([]);
      setLoading(false);
    }
  }, [estudanteId]);

  function inscrever(vagaId) {
    fetch(`${API_URL}/inscricoes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estudanteId, vagaId })
    })
      .then(r => r.json())
      .then(data => {
        if (data.erro) {
          toast.error(data.erro || "Erro ao inscrever-se.");
        } else {
          toast.success("Inscrição realizada!");
        }
        // Atualiza lista de inscrições
        return fetch(`${API_URL}/inscricoes/estudante/${estudanteId}`)
          .then(r => r.json())
          .then(setInscritas);
      });
  }

  function desinscrever(inscricaoId) {
    fetch(`${API_URL}/inscricoes/${inscricaoId}`, {
      method: "DELETE"
    })
      .then(() => {
        toast.success("Desinscrição realizada!");
        // Atualiza lista de inscrições
        return fetch(`${API_URL}/inscricoes/estudante/${estudanteId}`)
          .then(r => r.json())
          .then(setInscritas);
      });
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 32, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Vagas Disponíveis</h1>
      <Toaster position="top-center" />
      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>Título</th>
              <th style={{ padding: 10 }}>Descrição</th>
              <th style={{ padding: 10 }}>Competências</th>
              <th style={{ padding: 10 }}>Endereço</th>
              <th style={{ padding: 10 }}>Empresa</th>
              <th style={{ padding: 10 }}>Setor</th>
              <th style={{ padding: 10 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map((vaga) => (
              <tr key={vaga.id}>
                <td style={{ padding: 8 }}>{vaga.titulo}</td>
                <td style={{ padding: 8 }}>{vaga.descricao}</td>
                <td style={{ padding: 8 }}>{vaga.competencia}</td>
                <td style={{ padding: 8 }}>{vaga.empresa?.endereco}</td>
                <td style={{ padding: 8 }}>{vaga.empresa?.nome}</td>
                <td style={{ padding: 8 }}>{vaga.empresa?.setor}</td>
                <td style={{ padding: 8 }}>
                  {(Array.isArray(inscritas) ? inscritas : []).some(i => i.vaga?.id === vaga.id) ? (
                    <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Inscrito</span>
                  ) : (
                    <button onClick={() => inscrever(vaga.id)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>Inscrever-se</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 style={{ color: '#1976d2', margin: '32px 0 16px', textAlign: 'center', fontSize: 22 }}>Minhas Inscrições</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>Título</th>
              <th style={{ padding: 10 }}>Descrição</th>
              <th style={{ padding: 10 }}>Competências</th>
              <th style={{ padding: 10 }}>Endereço</th>
              <th style={{ padding: 10 }}>Empresa</th>
              <th style={{ padding: 10 }}>Setor</th>
              <th style={{ padding: 10 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {inscritas.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: '#888' }}>Nenhuma inscrição realizada</td></tr>
            )}
            {inscritas.map((i) => (
              <tr key={i.id}>
                <td style={{ padding: 8 }}>{i.vaga?.titulo}</td>
                <td style={{ padding: 8 }}>{i.vaga?.descricao}</td>
                <td style={{ padding: 8 }}>{i.vaga?.competencia}</td>
                <td style={{ padding: 8 }}>{i.vaga?.empresa?.endereco}</td>
                <td style={{ padding: 8 }}>{i.vaga?.empresa?.nome}</td>
                <td style={{ padding: 8 }}>{i.vaga?.empresa?.setor}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => desinscrever(i.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>Desinscrever</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
