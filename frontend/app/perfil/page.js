"use client";
import { useEffect, useState } from "react";
import { LABELS } from "./labels";

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

export default function PerfilPage() {
  const [tipo, setTipo] = useState(null);
  const [id, setId] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [msg, setMsg] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tipoStorage = localStorage.getItem("tipo");
      const idStorage = localStorage.getItem("id");
      setTipo(tipoStorage);
      setId(idStorage);
      if (tipoStorage && idStorage) {
        fetch(`${API_URL}/${tipoStorage}s/${idStorage}`)
          .then((res) => res.json())
          .then((data) => {
            setForm(data);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    const body = { ...form };
    if (novaSenha) {
      if (novaSenha !== confirmarSenha) {
        setMsg("As senhas não coincidem.");
        return;
      }
      body.senha = novaSenha;
    }
    fetch(`${API_URL}/${tipo}s/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setEditando(false);
        setNovaSenha("");
        setConfirmarSenha("");
        setMsg("Dados atualizados com sucesso!");
      })
      .catch(() => setMsg("Erro ao atualizar perfil."));
  }

  if (loading) return <div style={{padding:32}}>Carregando perfil...</div>;
  if (!tipo || !id) return <div style={{padding:32}}>Faça login para acessar seu perfil.</div>;

  // Ordem amigável dos campos
  let ordemCampos = [
    "nome",
    "sobrenome",
    "email",
    "cargo",
    "sobreMim",
    "cnpj"
  ];
  if (tipo === "empresa") {
    ordemCampos = [
      "nome",
      "email",
      "cnpj",
      "endereco",
      "setor"
    ];
  }
  // Campos extras (excluindo id e senha)
  const extras = Object.keys(form).filter(
    (k) => !ordemCampos.includes(k) && k !== "id" && k !== "senha"
  );
  const camposParaExibir = [...ordemCampos.filter(k => form[k] !== undefined), ...extras];

  // Avatar com inicial
  const avatar = (
    <div style={{
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "#1976d2",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 36,
      fontWeight: 700,
      margin: "0 auto 24px auto",
      boxShadow: "0 2px 8px #0002"
    }}>
      {form.nome ? form.nome[0].toUpperCase() : "U"}
    </div>
  );

  return (
    <div style={{
      maxWidth: 420,
      margin: "40px auto",
      background: "#f9f9fb",
      borderRadius: 16,
      padding: 32,
      boxShadow: "0 4px 32px #0001",
      color: "#222",
      fontFamily: 'Inter',
      border: "1px solid #e0e0e0"
    }}>
      {avatar}
      <h2 style={{marginBottom: 8, textAlign: "center", color: "#1976d2", fontWeight: 800, letterSpacing: 1}}>Meu Perfil</h2>
      <div style={{textAlign: "center", color: "#555", fontSize: 15, marginBottom: 24}}>
        {tipo && tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </div>
      {msg && <div style={{marginBottom:16,color:msg.includes("sucesso")?"#388e3c":"#d32f2f",textAlign:"center",fontWeight:600}}>{msg}</div>}
      {!editando ? (
        <div>
          {camposParaExibir.map((k) => (
            k!=="senha" && (
              <div key={k} style={{marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #ececec",paddingBottom:6}}>
                <span style={{fontWeight:600, color: "#444"}}>{LABELS[k] || k}</span>
                <span style={{color: "#222"}}>{form[k]}</span>
              </div>
            )
          ))}
          <button style={{marginTop:24,background:"#1976d2",color:"#fff",border:"none",padding:"10px 28px",borderRadius:8,fontWeight:700,fontSize:16,boxShadow:"0 2px 8px #0001",cursor:"pointer"}} onClick={()=>setEditando(true)}>Editar Perfil</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {camposParaExibir.map((k) => (
            k!=="senha" && (
              <div key={k} style={{marginBottom:18}}>
                <label style={{display:"block",fontWeight:700,marginBottom:4,color:"#1976d2"}}>{LABELS[k] || k}</label>
                <input name={k} value={form[k]||""} onChange={handleChange} style={{width:"100%",padding:10,borderRadius:7,border:"1px solid #bdbdbd",fontSize:15,background:"#fff",color:"#222"}} />
              </div>
            )
          ))}
          <div style={{marginBottom:18}}>
            <label style={{display:"block",fontWeight:700,marginBottom:4,color:"#1976d2"}}>Nova Senha</label>
            <input type="password" name="novaSenha" value={novaSenha} onChange={e=>setNovaSenha(e.target.value)} style={{width:"100%",padding:10,borderRadius:7,border:"1px solid #bdbdbd",fontSize:15,background:"#fff",color:"#222"}} autoComplete="new-password" />
          </div>
          <div style={{marginBottom:18}}>
            <label style={{display:"block",fontWeight:700,marginBottom:4,color:"#1976d2"}}>Confirmar Nova Senha</label>
            <input type="password" name="confirmarSenha" value={confirmarSenha} onChange={e=>setConfirmarSenha(e.target.value)} style={{width:"100%",padding:10,borderRadius:7,border:"1px solid #bdbdbd",fontSize:15,background:"#fff",color:"#222"}} autoComplete="new-password" />
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:18}}>
            <button type="submit" style={{background:"#1976d2",color:"#fff",border:"none",padding:"10px 28px",borderRadius:8,fontWeight:700,fontSize:16,boxShadow:"0 2px 8px #0001",cursor:"pointer"}}>Salvar</button>
            <button type="button" style={{background:"#eee",color:"#1976d2",border:"none",padding:"10px 28px",borderRadius:8,fontWeight:700,fontSize:16,boxShadow:"0 2px 8px #0001",cursor:"pointer"}} onClick={()=>{setEditando(false);setNovaSenha("");setConfirmarSenha("");}}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
