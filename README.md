# Sistema de Estágios

Este projeto é uma plataforma para conectar estudantes e empresas em oportunidades de estágio.

## Pré-requisitos

- [Git](https://git-scm.com/)
- [Java 17+](https://adoptium.net/) (para o backend)
- [Node.js 18+ e npm](https://nodejs.org/) (para o frontend)
- [Maven](https://maven.apache.org/) (opcional, pois o projeto já inclui o wrapper `./mvnw`)
- [GitHub CLI](https://cli.github.com/) (para Codespaces, já vem instalado)

## Passo a passo rápido para rodar o projeto

1. **Execute o setup automático**
   ```bash
   bash setup.sh
   ```
   O script irá:
   - Atualizar a lista de pacotes e atualizar o sistema (`apt update` e `apt upgrade`)
   - Instalar Java 17, Maven, Node.js, npm e Git
   - Configurar JAVA_HOME
   - Exibir as versões instaladas
   - Instalar dependências do backend (Java/Maven)
   - Instalar dependências do frontend (Node.js/NPM)

2. **Dê permissão de execução e inicie o sistema**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
   O script irá:
   - Tornar a porta 8080 pública no Codespaces
   - Iniciar o backend (Spring Boot)
   - Iniciar o frontend (Next.js)

3. **Acesse a aplicação**
   - No Codespaces: use o link gerado para a porta 3000 (frontend) e 8080 (backend)
   - Local: acesse `http://localhost:3000` no navegador

> Dicas:
> - Se o frontend não mostrar dados, use Ctrl+F5 para recarregar sem cache.
> - O sistema detecta automaticamente o endereço do backend no Codespaces.

---

# Como rodar no GitHub Codespaces ou localmente

1. **Faça o fork deste repositório**
   - Clique em "Fork" no canto superior direito do GitHub.

2. **Abra o fork no GitHub Codespaces**
   - No seu repositório forkado, clique em "<> Code" e depois em "Codespaces" > "Create codespace on main".

3. **Aguarde o ambiente iniciar**
   - O Codespaces irá instalar as dependências automaticamente.

4. **Instale as dependências**
   - No terminal, execute:
     ```bash
     ./setup.sh
     ```
   - O script irá atualizar o sistema e instalar todas as dependências do backend e frontend automaticamente.

5. **Inicie o sistema (backend e frontend juntos)**
   - No terminal, execute:
     ```bash
     ./start.sh
     ```
   - O script irá:
     - Tornar a porta 8080 pública automaticamente no Codespaces
     - Iniciar o backend
     - Iniciar o frontend

6. **Acesse a aplicação**
   - Use os links do Codespaces para abrir o frontend e testar o sistema.
   - Se rodando local, acesse `http://localhost:3000` no navegador.

## Estrutura do projeto

- `backend/`: Código fonte do backend (Java/Spring Boot)
- `frontend/`: Código fonte do frontend (Next.js)

## Problemas comuns

- **Erro de permissão**: Execute `chmod +x setup.sh start.sh` para dar permissão de execução aos scripts.
- **Frontend não carrega dados**: Tente um hard refresh (Ctrl+F5) para limpar o cache.
- **Backend não inicia**: Verifique se a porta 8080 está livre ou se não há outro serviço usando-a.
