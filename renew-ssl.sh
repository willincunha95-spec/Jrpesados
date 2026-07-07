#!/bin/bash

# Script de Renovação Automática do SSL para JR Pesados
# Este script tenta renovar o certificado Let's Encrypt (Certbot) e recarregar o Nginx.

LOG_FILE="/var/log/ssl_renewal_jrpesados.log"

echo "==========================================================" >> $LOG_FILE
echo "Iniciando processo de renovação SSL em $(date)" >> $LOG_FILE
echo "==========================================================" >> $LOG_FILE

# 1. Verifica se certbot está instalado
if ! command -v certbot &> /dev/null
then
    echo "[ERRO] Certbot não encontrado. Tentando verificar se está rodando via Docker..." >> $LOG_FILE
    
    # Caso estejam rodando via docker-compose e container especial do Certbot:
    if [ -f "docker-compose.yml" ]; then
        echo "Tentando rodar renovação via docker-compose..." >> $LOG_FILE
        docker-compose run --rm certbot renew >> $LOG_FILE 2>&1
    else
        echo "[DESESPERO] Certbot não está instalado e não foi possível encontrar docker-compose.yml" >> $LOG_FILE
        exit 1
    fi
else
    # Executa a renovação silenciosa/silenciada
    echo "Executando certbot renew..." >> $LOG_FILE
    sudo certbot renew --non-interactive --agree-tos >> $LOG_FILE 2>&1
fi

# 2. Recarrega o Nginx para aplicar as mudanças
if command -v systemctl &> /dev/null && systemctl is-active --quiet nginx; then
    echo "Nginx ativo detectado como serviço do sistema. Recarregando..." >> $LOG_FILE
    sudo systemctl reload nginx >> $LOG_FILE 2>&1
elif command -v nginx &> /dev/null; then
    echo "Nginx instalado. Enviando sinal de reload..." >> $LOG_FILE
    sudo nginx -s reload >> $LOG_FILE 2>&1
else
    echo "Nginx não está rodando diretamente no host. Verificando containers Docker..." >> $LOG_FILE
    # Se o nginx rodar em docker:
    if docker ps | grep -q nginx; then
        echo "Container Nginx detectado. Recarregando Nginx dentro do container..." >> $LOG_FILE
        nginx_container=$(docker ps --format "{{.Names}}" | grep nginx | head -n 1)
        docker exec $nginx_container nginx -s reload >> $LOG_FILE 2>&1
    else
        echo "[AVISO] Nginx não detectado no host de forma convencional nem container ativo." >> $LOG_FILE
    fi
fi

echo "Processo concluído em $(date)" >> $LOG_FILE
echo "----------------------------------------------------------" >> $LOG_FILE
