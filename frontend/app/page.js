'use client';
import './globals.css';
import { useEffect, useState } from 'react';

// Detecta o nome do codespace pelo hostname do navegador
function getCodespaceApiUrl() {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    // Exemplo: ubiquitous-space-goldfish-g9jjvgpw4xvhvg4p-3000.app.github.dev
    const match = host.match(/^([a-z0-9-]+)-3000\.app\.github\.dev$/);
    if (match && match[1]) {
      return `https://${match[1]}-8080.app.github.dev`;
    }
  }
  return '';
}
const API_URL = getCodespaceApiUrl();

export default function Home() {
  const [dados, setDados] = useState({
    totalEstudantes: 0,
    totalEmpresas: 0,
    totalVagas: 0,
    totalInscricoes: 0,
    topEmpresas: []
  });
  useEffect(() => {
    fetch(API_URL+`/dashboard`).then(r => r.json()).then(setDados);
  }, []);
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 32, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 16 }}>Sistema de Estágios</h1>
      <p style={{ textAlign: 'center', color: '#444', fontSize: 18, marginBottom: 32 }}>
        Plataforma para conectar estudantes e empresas em oportunidades de estágio.<br />
        Cadastre-se como estudante para visualizar e se inscrever em vagas, ou como empresa para divulgar oportunidades e gerenciar inscrições.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 40 }}>
        <a href="/login" onClick={() => localStorage.setItem('cadastroDireto', 'estudante')} style={{ background: '#1976d2', color: '#fff', borderRadius: 8, padding: '18px 36px', fontWeight: 'bold', fontSize: 20, textDecoration: 'none', boxShadow: '0 1px 6px #0001' }}>Quero ser Estudante</a>
        <a href="/login" onClick={() => localStorage.setItem('cadastroDireto', 'empresa')} style={{ background: '#388e3c', color: '#fff', borderRadius: 8, padding: '18px 36px', fontWeight: 'bold', fontSize: 20, textDecoration: 'none', boxShadow: '0 1px 6px #0001' }}>Quero ser Empresa</a>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', padding: 24, textAlign: 'center', minWidth: 140 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1976d2' }}>{dados.totalEstudantes}</div>
          <div style={{ color: '#444', fontSize: 18 }}>Estudantes cadastrados</div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', padding: 24, textAlign: 'center', minWidth: 140 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1976d2' }}>{dados.totalEmpresas}</div>
          <div style={{ color: '#444', fontSize: 18 }}>Empresas cadastradas</div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', padding: 24, textAlign: 'center', minWidth: 140 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1976d2' }}>{dados.totalVagas}</div>
          <div style={{ color: '#444', fontSize: 18 }}>Estágios oferecidos</div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', padding: 24, textAlign: 'center', minWidth: 140 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1976d2' }}>{dados.totalInscricoes}</div>
          <div style={{ color: '#444', fontSize: 18 }}>Candidaturas realizadas</div>
        </div>
      </div>
      <h2 style={{ color: '#1976d2', margin: '32px 0 16px', textAlign: 'center', fontSize: 22 }}>Top 10 Empresas com Mais Estágios</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px #0001', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 17, color: '#222' }}>
          <thead style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
            <tr>
              <th style={{ padding: 10 }}>#</th>
              <th style={{ padding: 10 }}>Empresa</th>
              <th style={{ padding: 10 }}>Estágios</th>
            </tr>
          </thead>
          <tbody>
            {dados.topEmpresas.length === 0 && (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: 16, color: '#888' }}>Nenhuma empresa cadastrada</td></tr>
            )}
            {dados.topEmpresas.map((e, i) => (
              <tr key={e.id}>
                <td style={{ padding: 8, textAlign: 'center' }}>{i + 1}</td>
                <td style={{ padding: 8 }}>{e.nome}</td>
                <td style={{ padding: 8, textAlign: 'center' }}>{e.totalVagas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
