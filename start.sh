#!/bin/bash

GREEN='\033[0;32m'
RESET='\033[0m'

while true; do
    echo -e "${GREEN}SKYNERD - Auto reconexão ativada para prevenção de quedas..${RESET}"
    
    node api.js
    
    EXIT_CODE=$?
    
    if [ $EXIT_CODE -ne 0 ]; then
        echo -e "${RED}Erro: O bot falhou com o código de saída $EXIT_CODE. Tentando reconectar em 5 segundos...${RESET}"
        sleep 5
    else
        echo -e "${GREEN}Bot encerrado com sucesso. Reconectando em 1 segundo...${RESET}"
        sleep 1
    fi
done
