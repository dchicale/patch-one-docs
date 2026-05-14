---
id: configuration
title: Configuração do Agente
sidebar_position: 2
---

# Configuração do Agente

O agente lê sua configuração do arquivo `config.ini` no mesmo diretório que o `PatchPilotAgent.exe`.

## Referência do config.ini

```ini
[server]
SERVER_URL=https://your-patchone-server
TENANT_ID=your-tenant-id
API_KEY=<provided-by-your-admin>
HEARTBEAT_INTERVAL=300

[agent]
LOG_LEVEL=INFO
```

### Seção [server]

| Chave | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `SERVER_URL` | URL | Sim | URL base do servidor PatchOne. Use HTTPS para implantações em nuvem. Sem barra no final. |
| `TENANT_ID` | String | Sim | Identificador da sua organização. Use `default` para on-premises; locatários em nuvem recebem um valor durante o processo de integração. |
| `API_KEY` | String | Sim | Segredo compartilhado fornecido pelo administrador do PatchOne. |
| `HEARTBEAT_INTERVAL` | Integer | Não | Segundos entre check-ins. Padrão: `300`. Mínimo: `60`. |

### Seção [agent]

| Chave | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `LOG_LEVEL` | String | Não | Verbosidade do log. Um dos valores: `DEBUG`, `INFO`, `WARNING`, `ERROR`. Padrão: `INFO`. |

## Configuração em implantações via GPO

Ao implantar via GPO, armazene o `config.ini` junto ao binário do agente em um local de rede compartilhado. O GPO copia ambos os arquivos para cada máquina antes de o serviço iniciar.

## Aplicando alterações de configuração

Após editar o `config.ini`, reinicie o serviço do agente para que as alterações entrem em vigor:

```bat
sc stop PatchOneAgent
sc start PatchOneAgent
```

## Segurança

O `config.ini` contém a `API_KEY`. Restrinja o acesso com permissões NTFS para que apenas a conta de serviço e os administradores possam ler o arquivo.
