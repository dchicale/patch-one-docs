---
id: audit
title: Log de Auditoria
sidebar_position: 6
---

# Log de Auditoria

A página **Auditoria** fornece um registro imutável de toda ação significativa realizada no PatchOne. Ela é projetada para relatórios de conformidade e investigação de incidentes.

## O que é registrado

Toda operação que altera estado gera uma entrada de auditoria. Isso é aplicado na camada de middleware — não é possível realizar uma ação sem que ela apareça no log.

| Tipo de evento | Disparado por |
|---|---|
| `admin_login` | Login bem-sucedido do administrador |
| `admin_logout` | Logout do administrador |
| `admin_login_failed` | Tentativa de login com falha |
| `machine_registered` | Nova máquina faz check-in pela primeira vez |
| `machine_deleted` | Administrador exclui suavemente uma máquina |
| `machine_updated` | Administrador edita tags ou notas |
| `deploy_queued` | Administrador enfileira um job de implantação |
| `deploy_completed` | Agente reporta sucesso do job |
| `deploy_failed` | Agente reporta falha do job |
| `catalog_created` | Administrador cria uma entrada personalizada no catálogo |
| `catalog_updated` | Administrador edita uma entrada do catálogo |
| `catalog_deleted` | Administrador exclui suavemente uma entrada do catálogo |
| `backup_created` | Backup manual ou agendado concluído |
| `backup_deleted` | Administrador exclui um arquivo de backup |
| `config_changed` | Configuração do servidor atualizada |

## Campos do log de auditoria

| Campo | Descrição |
|---|---|
| **Timestamp** | Timestamp UTC do evento |
| **Tipo de evento** | Um dos tipos de evento acima |
| **Ator** | Nome de usuário do administrador que disparou o evento |
| **Alvo** | Recurso afetado (hostname da máquina, nome do catálogo, ID do job, etc.) |
| **Detalhe** | Blob JSON com contexto adicional |
| **Endereço IP** | IP remoto do navegador do administrador |

## Filtragem

Filtre o log por:
- **Tipo de evento** — selecione um ou mais no dropdown
- **Intervalo de datas** — seletores de data de início / fim
- **Ator** — filtrar por um nome de usuário de administrador específico

## Exportar CSV

Clique em **Exportar CSV** para baixar o log filtrado ou completo como arquivo CSV. A exportação respeita os filtros ativos.

As colunas do CSV correspondem aos campos do log acima, com a coluna JSON `detail` convertida para uma string legível.

## Proteção contra adulteração

As entradas de auditoria não podem ser editadas ou excluídas por nenhum endpoint de API ou ação da interface. A tabela do banco de dados subjacente não possui rotas de `UPDATE` ou `DELETE`. No modo on-premises, proteja o arquivo SQLite com permissões de arquivo no nível do SO (`icacls`).

## Retenção

As entradas de auditoria são retidas indefinidamente por padrão. Não há política de purga automática na v1.0. Se o espaço em disco for uma preocupação, exporte e arquive entradas antigas antes que o banco de dados ultrapasse a capacidade do servidor.
