# Guia de Deploy AWS - JR Pesados 🚀

Este guia explica como subir seu projeto para a AWS usando Docker.

## 1. Preparar a Instância AWS (EC2)
1.  Crie uma conta na **AWS**.
2.  Inicie uma instância **EC2** (Recomendado: Ubuntu Server 22.04 LTS).
3.  Tipo de instância (t3.medium ou superior é recomendado devido ao build do Java/Next).
4.  No **Security Group**, abra as portas:
    -   `22` (SSH)
    -   `80` (HTTP)
    -   `443` (HTTPS)
    -   `8080` (API)
    -   `3000` (Web)

## 2. Instalar Docker na EC2
Após se conectar via SSH, rode:
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
```

## 3. Subir o Código
Você pode usar o Git para clonar seu repositório na EC2:
```bash
git clone <seu-repositorio>
cd Jrpesados
```

## 4. Rodar o Projeto
Dentro da pasta raiz, onde está o `docker-compose.yml`:
```bash
sudo docker-compose up -d --build
```
Isso vai baixar o Postgres, compilar seu código Java e Next.js e deixar tudo rodando.

## 5. Configurar o Domínio
1.  Vá no seu provedor de domínio (ex: Registro.br, GoDaddy).
2.  Crie um **Registro A** apontando para o IP Público da sua EC2.
    -   `www.jrpesados.com.br` -> IP da EC2 (Para o site)
    -   `api.jrpesados.com.br` -> IP da EC2 (Para a API)

---
**Nota:** Criei os arquivos `Dockerfile` e `docker-compose.yml` na raiz do seu projeto para facilitar esse processo!
