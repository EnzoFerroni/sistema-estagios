"use client";
import { useEffect, useState } from "react";

export default function AreaDoUsuarioPage() {
  const [tipo, setTipo] = useState(null);
  const [nome, setNome] = useState("");

  useEffect(() => {
    setTipo(localStorage.getItem("tipo"));
    setNome(localStorage.getItem("nome"));
    // Redirecionamento para home personalizada
    if (localStorage.getItem("tipo") === "estudante") {
      window.location.href = "/areadousuario/vagasestudante";
    } else if (localStorage.getItem("tipo") === "empresa") {
      window.location.href = "/areadousuario/empresa";
    }
  }, []);

  if (!tipo) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px #0001', minWidth: 340 }}>
          <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 16 }}>Área do Usuário</h2>
          <p style={{ textAlign: 'center', color: '#444', marginBottom: 24 }}>
            Você não está logado. Faça login para acessar sua área personalizada.
          </p>
          <a href="/login" style={{ display: 'block', background: '#1976d2', color: '#fff', borderRadius: 6, padding: 10, textAlign: 'center', textDecoration: 'none', fontWeight: 'bold' }}>Ir para login</a>
        </div>
      </div>
    );
  }

  if (tipo === "admin") {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px #0001', minWidth: 340 }}>
          <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 16 }}>Bem-vindo, {nome}!</h2>
          <p style={{ textAlign: 'center', color: '#444', marginBottom: 24 }}>Área do Administrador</p>
          <a href="/estudantes" style={{ display: 'block', background: '#1976d2', color: '#fff', borderRadius: 6, padding: 10, textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', marginBottom: 8 }}>Gerenciar Estudantes</a>
          <a href="/empresas" style={{ display: 'block', background: '#1976d2', color: '#fff', borderRadius: 6, padding: 10, textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', marginBottom: 8 }}>Gerenciar Empresas</a>
          <a href="/vagas" style={{ display: 'block', background: '#1976d2', color: '#fff', borderRadius: 6, padding: 10, textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', marginBottom: 8 }}>Gerenciar Vagas</a>
          <a href="/avaliacoes" style={{ display: 'block', background: '#1976d2', color: '#fff', borderRadius: 6, padding: 10, textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', marginBottom: 8 }}>Gerenciar Avaliações</a>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', width: '100%', marginTop: 16, cursor: 'pointer' }}>Sair</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px #0001', minWidth: 340 }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 16 }}>Bem-vindo, {nome}!</h2>
        {tipo === "estudante" && (
          <>
            <p style={{ textAlign: 'center', color: '#444', marginBottom: 24 }}>Área do Estudante</p>
            <a href="/vagas" style={{ display: 'block', background: '#1976d2', color: '#fff', borderRadius: 6, padding: 10, textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', marginBottom: 8 }}>Ver vagas disponíveis</a>
          </>
        )}
        {tipo === "empresa" && (
          <>
            <p style={{ textAlign: 'center', color: '#444', marginBottom: 24 }}>Área da Empresa</p>
            <a href="/vagas" style={{ display: 'block', background: '#1976d2', color: '#fff', borderRadius: 6, padding: 10, textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', marginBottom: 8 }}>Gerenciar vagas</a>
          </>
        )}
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontWeight: 'bold', width: '100%', marginTop: 16, cursor: 'pointer' }}>Sair</button>
      </div>
    </div>
  );
}
