"use client";
import { useState } from "react";

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

export default function LoginPage() {
  const [tipo, setTipo] = useState("estudante");
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [showCadastro, setShowCadastro] = useState("");
  const [cadastroForm, setCadastroForm] = useState({ nome: "", email: "", senha: "", cnpj: "", endereco: "", setor: "" });
  const [cadastroErro, setCadastroErro] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    fetch(`${API_URL}/${tipo}s/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).erro || "Erro ao logar");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("tipo", data.tipo);
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("id", data.id);
        window.location.href = "/areadousuario";
      })
      .catch((err) => setErro(err.message));
  }

  function handleCadastroChange(e) {
    setCadastroForm({ ...cadastroForm, [e.target.name]: e.target.value });
  }

  function handleCadastroSubmit(e) {
    e.preventDefault();
    setCadastroErro("");
    setCadastroSucesso("");
    const url = showCadastro === "estudante"
      ? `${API_URL}/estudantes/cadastro`
      : showCadastro === "empresa"
      ? `${API_URL}/empresas/cadastro`
      : "";
    const body = { ...cadastroForm };
    if (showCadastro === "empresa") delete body.sobrenome, delete body.cargo, delete body.sobreMim;
    if (showCadastro === "estudante") delete body.cnpj, delete body.endereco, delete body.setor;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).erro || "Erro ao cadastrar");
        return res.json();
      })
      .then(() => {
        setCadastroSucesso("Cadastro realizado com sucesso! Faça login.");
        setCadastroForm({ nome: "", sobrenome: "", email: "", cargo: "", sobreMim: "", senha: "", cnpj: "", endereco: "", setor: "" });
      })
      .catch((err) => setCadastroErro(err.message));
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa', fontFamily: 'Inter, Arial, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px #0001', display: 'flex', flexWrap: 'wrap', maxWidth: 900, width: '100%' }}>
        {/* Login */}
        <div style={{ flex: 1, minWidth: 320, padding: 40, borderRight: '1px solid #f0f0f0' }}>
          <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center', fontWeight: 800, letterSpacing: 1 }}>Entrar</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Tipo de usuário</label>
              <select name="tipo" value={tipo} onChange={e => setTipo(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }}>
                <option value="estudante">Estudante</option>
                <option value="empresa">Empresa</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>E-mail</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Senha</label>
              <input name="senha" type="password" value={form.senha} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required autoComplete="current-password" />
            </div>
            {erro && <div style={{ color: '#d32f2f', marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{erro}</div>}
            <button type="submit" style={{ width: '100%', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, marginTop: 8, boxShadow: '0 2px 8px #0001', cursor: 'pointer' }}>Entrar</button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 32, color: '#444', fontSize: 15 }}>
            Ainda não tem conta?
            <br />
            <button onClick={() => { setShowCadastro("estudante"); setCadastroErro(""); setCadastroSucesso(""); }} style={{ background: '#388e3c', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 700, margin: '12px 8px 0 0', cursor: 'pointer' }}>Cadastrar como Estudante</button>
            <button onClick={() => { setShowCadastro("empresa"); setCadastroErro(""); setCadastroSucesso(""); }} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 700, margin: '12px 0 0 0', cursor: 'pointer' }}>Cadastrar como Empresa</button>
          </div>
        </div>
        {/* Cadastro */}
        {showCadastro && (
          <div style={{ flex: 1, minWidth: 340, padding: 40 }}>
            <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center', fontWeight: 800, letterSpacing: 1 }}>Cadastro de {showCadastro.charAt(0).toUpperCase() + showCadastro.slice(1)}</h2>
            <form onSubmit={handleCadastroSubmit}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Nome</label>
                <input name="nome" value={cadastroForm.nome} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
              </div>
              {showCadastro === "estudante" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Sobrenome</label>
                    <input name="sobrenome" value={cadastroForm.sobrenome} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Cargo de Interesse</label>
                    <input name="cargo" value={cadastroForm.cargo} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Sobre Mim</label>
                    <textarea name="sobreMim" value={cadastroForm.sobreMim} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, minHeight: 60, color: '#222', background: '#fff' }} required />
                  </div>
                </>
              )}
              {showCadastro === "empresa" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>CNPJ</label>
                    <input name="cnpj" value={cadastroForm.cnpj} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Endereço</label>
                    <input name="endereco" value={cadastroForm.endereco} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Setor</label>
                    <input name="setor" value={cadastroForm.setor} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
                  </div>
                </>
              )}
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>E-mail</label>
                <input name="email" type="email" value={cadastroForm.email} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 700, color: '#1976d2', display: 'block', marginBottom: 4 }}>Senha</label>
                <input name="senha" type="password" value={cadastroForm.senha} onChange={handleCadastroChange} style={{ width: '100%', padding: 10, borderRadius: 7, border: '1px solid #bdbdbd', fontSize: 15, color: '#222', background: '#fff' }} required autoComplete="new-password" />
              </div>
              {cadastroErro && <div style={{ color: '#d32f2f', marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{cadastroErro}</div>}
              {cadastroSucesso && <div style={{ color: '#388e3c', marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{cadastroSucesso}</div>}
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                <button type="submit" style={{ flex: 1, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, boxShadow: '0 2px 8px #0001', cursor: 'pointer' }}>Cadastrar</button>
                <button type="button" onClick={() => { setShowCadastro(""); setCadastroErro(""); setCadastroSucesso(""); }} style={{ flex: 1, background: '#eee', color: '#1976d2', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, boxShadow: '0 2px 8px #0001', cursor: 'pointer' }}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
