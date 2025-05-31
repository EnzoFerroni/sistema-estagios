#!/bin/bash
# Script de setup para instalar todas as dependências do projeto Sistema de Estágios
# Uso: bash setup.sh

set -e

# Instalar dependências do backend (Java/Maven)
echo "Instalando dependências do backend (Maven)..."
cd backend
if command -v mvn &> /dev/null; then
  mvn clean install -DskipTests
else
  echo "[ERRO] Maven não encontrado. Instale o Maven para prosseguir."
  exit 1
fi
cd ..

# Instalar dependências do frontend (Node.js/NPM)
echo "Instalando dependências do frontend (npm)..."
cd frontend
if command -v npm &> /dev/null; then
  npm install
else
  echo "[ERRO] npm não encontrado. Instale o Node.js e o npm para prosseguir."
  exit 1
fi
cd ..

echo -e "\nSetup concluído! Todas as dependências foram instaladas."
