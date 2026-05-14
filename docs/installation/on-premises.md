---
id: on-premises
title: Instalação On-Premises
sidebar_position: 1
---

# Instalação On-Premises

O modo on-premises é executado em um único Windows Server na sua rede local. Nenhuma conexão com a internet é necessária após a configuração inicial.

## Pré-requisitos

- Windows Server 2019 ou posterior (Windows 10/11 aceitável para testes)
- Python 3.11 ou posterior, disponível no PATH
- Git
- Privilégios de Administrador no servidor

```bat title="Verifique se o Python está disponível"
python --version
```

## Etapa 1 — Clonar e configurar

```bat title="Clone o repositório"
git clone <repo> C:\PatchOne
cd C:\PatchOne
copy server\.env.example server\.env
```

Edite `server\.env` e defina os seguintes valores:

```ini title="server/.env" {1,2,3,4}
SECRET_KEY=<generate: python -c "import secrets; print(secrets.token_hex(32))">
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-password>
SERVER_MODE=onprem
```

| Configuração | Descrição |
|---|---|
| `SECRET_KEY` | String aleatória longa que protege as sessões de administrador |
| `ADMIN_USERNAME` | Nome de usuário da conta de administrador inicial |
| `ADMIN_PASSWORD` | Senha forte para a conta de administrador inicial |
| `SERVER_MODE` | Defina como `onprem` |

:::warning
Use um valor forte e gerado aleatoriamente para `SECRET_KEY`. Nunca o compartilhe ou comite no controle de versão.
:::

## Etapa 2 — Executar o instalador

```bat title="Execute como Administrador"
deploy\install_server.bat
```

O instalador configura o ambiente virtual, inicializa o banco de dados, popula o catálogo, cria a conta de administrador, registra o Windows Service, configura o firewall e inicia o servidor.

## Etapa 3 — Verificar

Abra o dashboard em um navegador na sua rede em `http://<server-ip>` e faça login com as credenciais definidas na Etapa 1.

## Gerenciamento do serviço

| Ação | Comando |
|---|---|
| Iniciar | `sc start PatchOneServer` |
| Parar | `sc stop PatchOneServer` |
| Reiniciar | `sc stop PatchOneServer && sc start PatchOneServer` |
| Desinstalar | `python server\server_service.py remove` |

## Arquivos de log

Os logs do servidor são gravados em `server\logs\patchone.log`. O arquivo é rotacionado diariamente e retém 7 dias por padrão.

## Atualização

```bat title="Atualizar para a versão mais recente"
git pull
pip install -r server\requirements.txt
sc stop PatchOneServer && sc start PatchOneServer
```

## Próximos passos

- [Implantação de agentes](/docs/installation/agent-deployment) — envie agentes para as máquinas clientes
- [Implantação cloud](/docs/installation/cloud) — configuração multi-tenant baseada em Docker
