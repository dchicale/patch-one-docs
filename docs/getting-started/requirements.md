---
id: requirements
title: Requisitos do Sistema
sidebar_position: 2
---

# Requisitos do Sistema

## Servidor

### Modo on-premises

| Componente | Mínimo | Recomendado |
|---|---|---|
| **SO** | Windows Server 2019 | Windows Server 2022 |
| **CPU** | 2 vCPU | 4 vCPU |
| **RAM** | 2 GB | 4 GB |
| **Disco** | 10 GB | 50 GB (para backups + crescimento) |
| **Python** | 3.11 | 3.11 ou 3.12 |
| **Rede** | Porta 8000 acessível pelas máquinas dos agentes | — |

### Modo cloud

| Componente | Mínimo |
|---|---|
| **Docker** | 24.x |
| **Docker Compose** | v2.x |
| **RAM** | 2 GB |
| **Disco** | 20 GB |
| **Portas** | 80, 443 (nginx encerra TLS) |
| **PostgreSQL** | 15+ (gerenciado pelo Docker Compose) |

## Agente (clientes Windows)

| Componente | Requisito |
|---|---|
| **SO** | Windows 10 1903+ ou Windows 11 |
| **winget** | 1.x (pré-instalado no Windows 11; disponível via App Installer no Windows 10) |
| **Rede** | HTTP de saída para o servidor na porta 8000 (nenhuma regra de entrada necessária) |
| **Privilégios** | Executar como LocalSystem (Windows Service) para instalações no escopo da máquina |
| **Disco** | ~30 MB para o binário do agente |
| **Runtime Python** | Não necessário — `PatchPilotAgent.exe` é um binário autocontido |

:::note winget no Windows 10
O winget acompanha o Windows 10 1903+ via o pacote [App Installer](https://apps.microsoft.com/store/detail/app-installer/9NBLGGH4NNS1). Verifique com `winget --version` antes de implantar os agentes.
:::

## Dashboard (navegador)

O dashboard é servido pelo servidor PatchOne como uma SPA React estática. Qualquer navegador moderno funciona:

| Navegador | Versão mínima |
|---|---|
| Chrome / Edge | 90+ |
| Firefox | 88+ |
| Safari | 14+ |

Nenhum plugin ou extensão é necessário.

## Requisitos de rede

| Fluxo | Direção | Protocolo | Porta |
|---|---|---|---|
| Agente → Servidor | Saída do agente | HTTP(S) | 8000 (on-prem) / 443 (cloud) |
| Navegador → Servidor | Saída da estação do administrador | HTTP(S) | 8000 (on-prem) / 443 (cloud) |
| Servidor → Agente | **Nenhuma** | — | — |

O modelo pull significa que o servidor nunca inicia conexões com os agentes. Nenhuma regra de firewall de entrada é necessária nas máquinas clientes.

## Considerações sobre antivírus

Se estiver usando Bitdefender GravityZone, registre as exclusões de AV antes de implantar os agentes:

```powershell
deploy\register_av_exclusion.ps1
```

Consulte o [guia de coexistência com GravityZone](/docs/security/gravityzone) para mais detalhes.
