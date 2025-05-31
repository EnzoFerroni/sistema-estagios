#!/bin/bash
# Script para iniciar backend e frontend juntos

# Função para encerrar o backend ao sair
cleanup() {
  echo "Encerrando backend..."
  kill $BACKEND_PID
  exit
}
trap cleanup SIGINT SIGTERM

# Inicia o backend em background
cd backend
echo "Iniciando backend..."
mvn spring-boot:run &
BACKEND_PID=$!
cd ..

# Aguarda o backend subir corretamente
for i in {1..30}; do
  sleep 1
  if curl -s http://localhost:8080/estudantes > /dev/null; then
    echo "Backend iniciado com sucesso!"
    break
  fi
  if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "Backend falhou ao iniciar. Abortando."
    exit 1
  fi
  if [ $i -eq 20 ]; then
    echo "Timeout ao aguardar backend. Abortando."
    kill $BACKEND_PID
    exit 1
  fi
  echo "Aguardando backend... ($i)"
done

# Publica a porta 8080 do Codespace automaticamente (se estiver em ambiente Codespaces)
if [ ! -z "$CODESPACE_NAME" ]; then
  echo "Tornando a porta 8080 pública no Codespaces..."
  gh codespace ports visibility 8080:public -c "$CODESPACE_NAME"
fi

cd frontend

echo "Iniciando frontend..."
npm install
npm run dev

# Ao sair do frontend, encerra o backend
cleanup
