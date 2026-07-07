# Guia de Resolução e Renovação do Certificado SSL 🔒
Este documento foi criado para ajudar a renovar o certificado de segurança (HTTPS) do site **jrpesadostransportes.com.br** que expirou.

Siga os passos abaixo na sua instância AWS EC2 para corrigir o problema imediatamente e programar a renovação automática.

---

## 📋 Passo 1: Acessar a Instância AWS (EC2) pelo SSH
Você precisa se conectar ao servidor da AWS onde o site está publicado. Use o terminal (ou Git Bash no Windows):

```bash
ssh -i "caminho/para/sua-chave.pem" ubuntu@18.230.43.15
```
*(Substitua `caminho/para/sua-chave.pem` pelo local correto da sua chave `.pem` baixada da AWS)*.

---

## 📌 Passo 2: Atualizar o Repositório no Servidor
Com a conexão ativa no servidor:
1. Vá até a pasta onde o projeto está clonado:
   ```bash
   cd ~/Jrpesados   # Ou o caminho correspondente
   ```
2. Baixe as atualizações que enviamos para o Git:
   ```bash
   git pull origin main
   ```

*(Isso atualizará o projeto e trará o script `renew-ssl.sh` instalado na pasta raiz)*.

---

## ⚡ Passo 3: Executar a Renovação Manual
Dê permissão de execução ao script criado e execute-o com privilégios de administrador:

```bash
chmod +x renew-ssl.sh
sudo ./renew-ssl.sh
```

### O que este script faz?
1. Executa o comando `sudo certbot renew` para pedir novas chaves à autoridade Let's Encrypt.
2. Faz o reload do Nginx (seja rodando direto no Ubuntu ou via container) para que ele passe a usar o novo certificado renovado imediatamente.
3. Grava um registro do processo em `/var/log/ssl_renewal_jrpesados.log` para que você possa auditar depois.

Se tudo der certo, a saída mostrará que o certificado foi renovado com sucesso e o site voltará ao ar na mesma hora.

---

## 🤖 Passo 4: Configurar a Renovação Automática (Cronjob)
Para evitar que o "cadeado do Google" quebre novamente após 90 dias (tempo padrão dos certificados Let's Encrypt), configure um agendador de tarefas no servidor para rodar o script todos os dias de madrugada:

1. Abra o painel de agendamento de tarefas com privilégios administrativos:
   ```bash
   sudo crontab -e
   ```
2. Se solicitar que selecione um editor de texto, escolha o `nano` (geralmente opção número `1` ou `2`).
3. Vá até o final do arquivo e adicione a seguinte linha (ajuste o caminho da pasta `/home/ubuntu/Jrpesados` se necessário no seu servidor):
   
   ```cron
   0 3 * * * /bin/bash /home/ubuntu/Jrpesados/renew-ssl.sh >> /var/log/ssl_cron.log 2>&1
   ```

4. Salve e saia (No `nano`: Pressione `Ctrl + O`, depois clique `Enter` para salvar e `Ctrl + X` para sair).

Prontinho! Isso fará o servidor verificar a expiração do SSL todos os dias às 03:00 da manhã. Quando faltar menos de 30 dias para expirar, ele renova automaticamente de forma silenciosa.

---

## 🔍 Passo 5: Validar a Renovação
Para garantir que a renovação deu certo, você pode reabrir o site `https://jrpesadostransportes.com.br` no navegador (talvez precise recarregar sem cache com `Ctrl + F5`), ou rodar no PowerShell da sua máquina local:

```powershell
curl.exe -vI https://jrpesadostransportes.com.br
```

Procure pelo status de sucesso (HTTP 200) e a ausência do aviso de certificado expirado.
