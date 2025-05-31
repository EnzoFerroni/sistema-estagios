# Sistema de Estágios

Plataforma para conectar estudantes e empresas em oportunidades de estágio.

## Como rodar o projeto

1. **Dê permissão de execução aos scripts (apenas uma vez):**
   ```bash
   chmod +x setup.sh start.sh
   ```

2. **Instale todas as dependências:**
   ```bash
   ./setup.sh
   ```

3. **Inicie o sistema (backend e frontend juntos):**
   ```bash
   ./start.sh
   ```

- O backend (Spring Boot) será iniciado na porta 8080.
- O frontend (Next.js) será iniciado na porta 3000.
- No Codespaces, a porta 8080 será tornada pública automaticamente.

Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## Problemas comuns

- **Erro de permissão:**
  Execute `chmod +x setup.sh start.sh`.
- **Backend não inicia:**
  Verifique se a porta 8080 está livre.
- **Frontend não carrega dados:**
  Tente um hard refresh (Ctrl+F5).

---

**Tudo pronto!**

Se precisar reinstalar dependências, basta rodar `./setup.sh` novamente.
Para iniciar o sistema, use sempre `./start.sh`.
