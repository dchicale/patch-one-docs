---
id: cloud
title: Instalação Cloud / Docker
sidebar_position: 2
---

# Instalação Cloud / Docker

O modo cloud usa Docker Compose com um banco de dados PostgreSQL e encerramento TLS. Suporta múltiplas organizações clientes, cada uma com dados totalmente isolados.

## Pré-requisitos

- Docker Engine 24.x
- Docker Compose v2.x
- Um nome de domínio apontando para o servidor
- Certificado TLS e chave privada (Let's Encrypt / Certbot recomendado)

## Etapa 1 — Clonar e configurar

```bash
git clone <repo> patchone
cd patchone
cp deploy/cloud/.env.example deploy/cloud/.env
```

Edite `deploy/cloud/.env` e preencha:

| Configuração | Descrição |
|---|---|
| `POSTGRES_PASSWORD` | Senha aleatória forte para o banco de dados |
| `SECRET_KEY` | String aleatória longa para segurança de sessão |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Credenciais iniciais do administrador |
| `SERVER_MODE` | Defina como `cloud` |
| `DOMAIN` | Seu nome de domínio |
| `TLS_CERT_PATH` / `TLS_KEY_PATH` | Caminhos para os arquivos de certificado TLS |

:::warning
Nunca comite `.env` no controle de versão. Use um gerenciador de segredos ou armazenamento criptografado para valores de produção.
:::

## Etapa 2 — Certificados TLS

Usando Certbot:

```bash
certbot certonly --standalone -d your-domain.example.com
```

## Etapa 3 — Iniciar

```bash
cd deploy/cloud
docker compose up -d
```

O servidor inicializa automaticamente o banco de dados e o catálogo na primeira execução.

## Etapa 4 — Verificar

```bash
curl https://your-domain.example.com/health
```

Resposta esperada:

```json
{"status": "ok", "db": "ok"}
```

O dashboard está disponível em `https://your-domain.example.com`.

## Adicionando uma nova organização cliente

Entre em contato com o administrador do PatchOne ou use o script de provisionamento incluído para criar uma nova conta de administrador para cada organização cliente. Os dados de cada organização são totalmente isolados.

## Persistência de dados

Os dados do banco de dados e os arquivos de backup são armazenados em volumes Docker. Faça backup desses volumes antes de atualizar.

## Atualização

```bash
git pull
docker compose pull
docker compose up -d --build
```

As migrações do banco de dados são executadas automaticamente na inicialização.

## Logs

```bash
docker compose logs -f patchone-server
```
