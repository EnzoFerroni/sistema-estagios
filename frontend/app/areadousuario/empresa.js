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

export default function AreaDoUsuarioEmpresa() {
  const [nome, setNome] = useState("");
  const [vagas, setVagas] = useState([]);
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const empresaId = typeof window !== 'undefined' ? localStorage.getItem("id") : null;

  useEffect(() => {
    setNome(localStorage.getItem("nome"));
    if (!localStorage.getItem("token") || localStorage.getItem("tipo") !== "empresa") {
      window.location.href = "/login";
      return;
    }
    fetch(`${API_URL}/vagas/empresa/${empresaId}`)
      .then(r => r.json())
      .then(setVagas);
    fetch(`${API_URL}/inscricoes`)
      .then(r => r.json())
      .then(data => setInscricoes(data.filter(i => i.vaga?.empresa?.id == empresaId)))
      .finally(() => setLoading(false));
  }, [empresaId]);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 32, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Bem-vindo, {nome}!</h1>
      <h2 style={{ color: '#1976d2', margin: '32px 0 16px', textAlign: 'center', fontSize: 22 }}>Inscrições em Suas Vagas</h2>
      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>Vaga</th>
              <th style={{ padding: 10 }}>Estudante</th>
              <th style={{ padding: 10 }}>Email</th>
              <th style={{ padding: 10 }}>Cargo</th>
              <th style={{ padding: 10 }}>Sobre</th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>Nenhuma inscrição recebida</td></tr>
            )}
            {inscricoes.map((i) => (
              <tr key={i.id}>
                <td style={{ padding: 8 }}>{i.vaga?.titulo}</td>
                <td style={{ padding: 8 }}>{i.estudante?.nome} {i.estudante?.sobrenome}</td>
                <td style={{ padding: 8 }}>{i.estudante?.email}</td>
                <td style={{ padding: 8 }}>{i.estudante?.cargo}</td>
                <td style={{ padding: 8 }}>{i.estudante?.sobreMim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 style={{ color: '#1976d2', margin: '32px 0 16px', textAlign: 'center', fontSize: 22 }}>Suas Vagas</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>Título</th>
              <th style={{ padding: 10 }}>Descrição</th>
              <th style={{ padding: 10 }}>Competência</th>
            </tr>
          </thead>
          <tbody>
            {vagas.length === 0 && (
              <tr><td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>Nenhuma vaga cadastrada</td></tr>
            )}
            {vagas.map((v) => (
              <tr key={v.id}>
                <td style={{ padding: 8 }}>{v.titulo}</td>
                <td style={{ padding: 8 }}>{v.descricao}</td>
                <td style={{ padding: 8 }}>{v.competencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
