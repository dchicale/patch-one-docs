---
id: catalog
title: Catálogo de Software
sidebar_position: 5
---

# Catálogo de Software

A página **Catálogo** gerencia a lista de títulos de software disponíveis para implantação.

## Títulos pré-carregados

O PatchOne é fornecido com mais de 50 títulos de software curados. Cada entrada contém:

| Campo | Descrição |
|---|---|
| **Nome** | Nome de exibição (ex.: *Google Chrome*) |
| **ID winget** | Identificador do pacote usado para invocar o winget (ex.: `Google.Chrome`) |
| **Categoria** | Agrupamento para filtragem (ex.: `browser`, `productivity`, `developer`) |
| **Fabricante** | Nome do fabricante do software |
| **Nativo** | Se a entrada foi pré-carregada (não pode ser excluída por administradores) |

## Navegação e pesquisa

A página do catálogo oferece:
- **Barra de pesquisa** — filtrar por nome ou fabricante em tempo real
- **Filtro por categoria** — exibir apenas títulos de uma categoria selecionada

## Categorias

As categorias pré-carregadas incluem:

- Navegadores
- Produtividade
- Comunicação
- Ferramentas de Desenvolvedor
- Segurança
- Utilitários
- Mídia

## Adicionando uma entrada personalizada

Clique em **Adicionar Software** para criar uma entrada personalizada no catálogo. Campos obrigatórios:

| Campo | Observações |
|---|---|
| **Nome** | Nome de exibição mostrado no dropdown de implantação |
| **ID winget** | Deve corresponder a um pacote válido de `winget show <id>` |
| **Categoria** | Selecione da lista existente ou digite uma nova |

:::tip Encontrando IDs winget
Execute `winget search <nome>` em qualquer máquina Windows 10+ para encontrar o identificador exato do pacote.
:::

## Editando uma entrada personalizada

Os administradores podem editar apenas suas próprias entradas personalizadas. Entradas nativas não podem ser editadas ou excluídas.

## Excluindo uma entrada personalizada

Exclusão suave: a entrada é ocultada do dropdown de implantação, mas permanece no log de auditoria e é retida nos registros históricos de jobs.

## O catálogo no fluxo de implantação

O catálogo alimenta o dropdown de software na página **Implantar**. Quando você seleciona um título, o job de implantação usa o `winget_id` armazenado para invocar `winget upgrade` na máquina alvo.
