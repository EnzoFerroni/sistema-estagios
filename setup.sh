#!/bin/bash
# Setup simplificado para rodar o Sistema de Estágios
set -e

# Instala dependências essenciais
sudo apt update && sudo apt upgrade -y
sudo apt install openjdk-17-jdk maven nodejs npm git -y

# Garante Java 17 para Maven
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export MAVEN_OPTS="-Dmaven.compiler.fork=true -Dmaven.compiler.executable=$JAVA_HOME/bin/javac"

# Instala dependências do backend
cd backend && mvn clean install -DskipTests && cd ..

# Instala dependências do frontend
cd frontend && npm install && cd ..

echo -e "\nSetup concluído! Use './start.sh' para iniciar o sistema."
