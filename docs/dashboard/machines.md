---
id: machines
title: Gerenciamento da Frota (Máquinas)
sidebar_position: 2
---

# Gerenciamento da Frota

A página **Máquinas** é a visualização principal da frota. Ela exibe todas as máquinas registradas e seus status atuais.

## Lista de máquinas

Cada linha exibe:

| Campo | Descrição |
|---|---|
| **Hostname** | Hostname Windows da máquina |
| **Status** | Badge Online / Offline |
| **SO** | String de versão do Windows |
| **Versão do agente** | Versão em execução do `PatchPilotAgent.exe` |
| **Visto pela última vez** | Timestamp do heartbeat mais recente |
| **Atualizações pendentes** | Número de atualizações winget disponíveis |
| **Tags** | Rótulos atribuídos pelo administrador |

## Pesquisa e filtro

A barra de pesquisa filtra as máquinas por hostname ou tag em tempo real. O filtro de status permite exibir apenas máquinas **Online** ou **Offline**.

## Detalhes da máquina

Clique em qualquer máquina para abrir sua página de detalhes. A página de detalhes exibe:

### Inventário de software

Uma lista completa do software instalado, proveniente do registro do Windows via `Win32_Product`. Atualizado a cada heartbeat (a cada 5 minutos).

Colunas: **Nome**, **Versão**, **Fabricante**, **Data de instalação**

### Atualizações pendentes

Títulos de software com atualizações winget disponíveis são destacados. Esses badges alimentam a contagem de atualizações exibida na lista de máquinas.

### Tags e notas

- **Tags** — rótulos separados por vírgula para agrupamento de máquinas (ex.: `escritório`, `almoxarifado`, `prioridade`)
- **Notas** — campo de texto livre para notas do administrador (ex.: patrimônio, localização)

Tags e notas são salvas imediatamente após a edição.

### Implantar a partir dos detalhes

Você pode iniciar uma implantação diretamente da página de detalhes da máquina. A máquina já vem pré-selecionada.

## Exclusão suave

Excluir uma máquina pela interface a marca como inativa (`status = deleted`) em vez de remover o registro. A máquina é ocultada da visualização padrão da frota, mas permanece no log de auditoria. Se a mesma máquina física fizer check-in novamente, ela é restaurada automaticamente.

## Registro de máquinas

As máquinas são identificadas pelo seu **UUID SMBIOS** (lido do registro do Windows). Esse UUID persiste após renomeações e reinstalações do SO no mesmo hardware. Quando um agente envia seu primeiro heartbeat, o servidor cria automaticamente um registro de máquina — nenhum cadastro manual é necessário.

## Alerta de offline

Quando uma máquina deixa de enviar heartbeats por mais tempo que `HEARTBEAT_TIMEOUT_MINUTES` (padrão: 30 minutos), uma notificação é gerada e o badge da máquina muda para **Offline**. Consulte [Notificações](/docs/dashboard/notifications).
