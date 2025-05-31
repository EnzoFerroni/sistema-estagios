#!/bin/bash
# Script de setup para instalar todas as dependências do projeto Sistema de Estágios
# Uso: bash setup.sh

set -e

# Instalar dependências do sistema (Java, Maven, Node.js, npm, Git)
echo "Instalando Java 17, Maven, Node.js, npm e Git..."
sudo apt update
sudo apt install openjdk-17-jdk maven nodejs npm git -y

# Configurar JAVA_HOME
if ! grep -q 'JAVA_HOME' ~/.bashrc; then
  echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
  echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
  source ~/.bashrc
fi

# Exibir versões instaladas
java -version
javac -version
echo $JAVA_HOME
node -v
npm -v
git --version
mvn -version

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
