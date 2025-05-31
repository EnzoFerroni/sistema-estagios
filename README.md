# Sistema de Estágios

Este projeto é uma plataforma para conectar estudantes e empresas em oportunidades de estágio.

## Pré-requisitos

- [Git](https://git-scm.com/)
- [Java 17+](https://adoptium.net/) (para o backend)
- [Node.js 18+ e npm](https://nodejs.org/) (para o frontend)
- [Maven](https://maven.apache.org/) (opcional, pois o projeto já inclui o wrapper `./mvnw`)
- [GitHub CLI](https://cli.github.com/) (para Codespaces, já vem instalado)

## Como rodar no GitHub Codespaces ou localmente

1. **Faça o fork deste repositório**
   - Clique em "Fork" no canto superior direito do GitHub.

2. **Abra o fork no GitHub Codespaces**
   - No seu repositório forkado, clique em "<> Code" e depois em "Codespaces" > "Create codespace on main".

3. **Aguarde o ambiente iniciar**
   - O Codespaces irá instalar as dependências automaticamente.

6. **Instale as dependências**
   - No terminal, execute:
     ```bash
     ./setup.sh
     ```
   - O script irá instalar todas as dependências do backend e frontend automaticamente.

7. **Inicie o sistema (backend e frontend juntos)**
   - No terminal, execute:
     ```bash
     ./start.sh
     ```
   - O script irá:
     - Tornar a porta 8080 pública automaticamente no Codespaces
     - Iniciar o backend
     - Iniciar o frontend

8. **Acesse a aplicação**
   - Use os links do Codespaces para abrir o frontend e testar o sistema.
   - Se rodando local, acesse `http://localhost:3000` no navegador.
