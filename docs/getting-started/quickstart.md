---
id: quickstart
title: Início Rápido
sidebar_position: 1
---

# Início Rápido

Coloque o PatchOne em funcionamento em menos de 5 minutos usando o modo on-premises (SQLite, único Windows Server).

## Pré-requisitos

- Windows Server 2019+ (ou Windows 10/11 para desenvolvimento/teste)
- Python 3.11+ instalado
- Pelo menos uma máquina Windows para o agente

## 1. Clonar e configurar

```bat title="Clone o repositório"
git clone <repo> patchone
cd patchone
copy server\.env.example server\.env
```

Abra `server\.env` e defina no mínimo:

```ini title="server/.env" {1,2,3}
SECRET_KEY=change-this-to-a-random-string-at-least-32-chars
ADMIN_PASSWORD=your-admin-password
SERVER_MODE=onprem
```

:::warning SECRET_KEY
Gere uma chave forte com `python -c "import secrets; print(secrets.token_hex(32))"`. Nunca reutilize ou comite este valor.
:::

## 2. Executar o instalador

```bat title="Execute como Administrador"
deploy\install_server.bat
```

Este único script:
1. Cria um ambiente virtual Python
2. Instala todas as dependências do servidor
3. Inicializa o banco de dados e popula o catálogo de 50 títulos de software
4. Cria a conta de administrador inicial
5. Registra o PatchOne como um Windows Service
6. Configura o firewall

## 3. Abrir o dashboard

Acesse `http://<server-ip>` e faça login com suas credenciais de administrador.

## 4. Implantar o primeiro agente

Crie o `config.ini` a partir do template e preencha com a URL do servidor e a chave de API:

```ini title="config.ini" {2,3}
[server]
SERVER_URL=https://your-patchone-server
API_KEY=<your-api-key>
TENANT_ID=default
HEARTBEAT_INTERVAL=300

[agent]
LOG_LEVEL=INFO
```

Copie `PatchPilotAgent.exe` e `config.ini` para uma máquina de teste e execute:

```bat title="Instale o agente (execute como Administrador)"
PatchPilotAgent.exe install
```

A máquina aparece na página **Máquinas** após o próximo check-in.

## 5. Enviar a primeira atualização

1. Vá para **Implantar** no dashboard
2. Selecione a máquina de teste
3. Escolha um título de software do catálogo (ex.: *Google Chrome*)
4. Clique em **Implantar**

O job é executado silenciosamente no agente. Verifique **Jobs** para ver o resultado.

## Lista de verificação

- [ ] O dashboard carrega e o login funciona
- [ ] A máquina de teste aparece na visualização **Frota**
- [ ] Inventário de software visível na página de detalhes da máquina
- [ ] Job de implantação concluído com sucesso

## Próximos passos

- [Guia completo de instalação on-premises](/docs/installation/on-premises)
- [Implantação de agentes em escala (GPO / WinRM / PsExec)](/docs/installation/agent-deployment)
- [Tour pelo dashboard](/docs/dashboard/overview)
