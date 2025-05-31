'use client';
import "./globals.css";
import { useEffect, useState } from "react";

function Navbar() {
  const [tipo, setTipo] = useState(null);
  const [nome, setNome] = useState("");
  useEffect(() => {
    function syncTipoNome() {
      setTipo(typeof window !== "undefined" ? localStorage.getItem("tipo") : null);
      setNome(typeof window !== "undefined" ? localStorage.getItem("nome") : "");
    }
    syncTipoNome();
    window.addEventListener("storage", syncTipoNome);
    return () => window.removeEventListener("storage", syncTipoNome);
  }, []);
  return (
    <nav
      style={{
        width: "100%",
        background: "#222",
        color: "#fff",
        padding: "16px 0",
        marginBottom: 32,
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: "center",
        gap: 20,
        fontSize: 18,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <a href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: 22 }}>Sistema de Estágios</a>
      <a href="/areadousuario" style={{ color: "#fff", textDecoration: "none" }}>Área do Usuário</a>
      {/* <a href="/areadousuario/vagasestudante" style={{ color: "#fff", textDecoration: "none" }}>Vagas para Estudante</a>
      <a href="/areadousuario/gerenciarvagasempresa" style={{ color: "#fff", textDecoration: "none" }}>Dashboard Empresa</a> */}
      {/* <a href="/areadousuario/gerenciarvagasempresa" style={{ color: "#fff", textDecoration: "none" }}>Gerenciar Vagas (Empresa)</a> */}
      {/* <a href="/perfil" style={{ color: "#fff", textDecoration: "none" }}>Meu Perfil</a> */}
      <a href="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</a>
      {/* <a href="/estudantes" style={{ color: "#fff", textDecoration: "none" }}>Estudantes (CRUD)</a>
      <a href="/empresas" style={{ color: "#fff", textDecoration: "none" }}>Empresas (CRUD)</a>
      <a href="/vagas" style={{ color: "#fff", textDecoration: "none" }}>Vagas (CRUD)</a>
      <a href="/avaliacoes" style={{ color: "#fff", textDecoration: "none" }}>Avaliações (CRUD)</a>
      <a href="/admins" style={{ color: "#fff", textDecoration: "none" }}>Administradores (CRUD)</a> */}
      {/* Links extras para facilitar testes */}
      {/* <a href="/api" style={{ color: "#fff", textDecoration: "none" }}>/api</a>
      <a href="/api/hello" style={{ color: "#fff", textDecoration: "none" }}>/api/hello</a> */}
      {/* Indicativo de usuário logado + botão de perfil */}
      {tipo && nome && (
        <span style={{
          background: '#1976d2',
          color: '#fff',
          borderRadius: 8,
          padding: '6px 14px',
          fontWeight: 'bold',
          marginLeft: 12,
          fontSize: 16,
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <span style={{textTransform: 'capitalize'}}>{nome}</span>
          <span style={{
            fontSize: 13, background: '#fff2', borderRadius: 6, padding: '2px 8px', marginLeft: 4
          }}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
          <a href="/perfil" style={{
            color: '#fff',
            background: '#388e3c',
            textDecoration: 'none',
            borderRadius: 6,
            padding: '4px 12px',
            marginLeft: 8,
            fontWeight: 600,
            fontSize: 15,
            transition: 'background 0.2s',
            boxShadow: '0 1px 4px #0001',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-block'
          }}>Meu Perfil</a>
        </span>
      )}
      {/* Botão de sair */}
      {tipo && (
        <button
          onClick={() => {
            localStorage.clear();
            setTipo(null);
            setNome("");
            window.location.href = "/";
          }}
          style={{
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      )}
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head />
      <body style={{ background: "#f5f6fa", minHeight: "100vh" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
