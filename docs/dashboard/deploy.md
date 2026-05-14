---
id: deploy
title: Implantação de Software
sidebar_position: 3
---

# Implantação de Software

A página **Implantar** permite enviar atualizações de software para uma máquina ou para toda a frota.

## Formulário de implantação

1. **Selecionar máquinas** — escolha uma ou mais máquinas da lista. Use o botão **Selecionar Todas** para uma implantação em toda a frota.
2. **Selecionar software** — escolha um título no dropdown do catálogo. Você pode pesquisar por nome ou navegar por categoria.
3. **Clicar em Implantar** — os jobs são enfileirados imediatamente.

## Como funciona a implantação

1. O dashboard chama `POST /api/deploy` com os IDs das máquinas selecionadas e o ID do item do catálogo.
2. O servidor cria uma linha `deploy_job` no estado `queued` para cada máquina.
3. No próximo heartbeat, cada agente busca seus jobs pendentes.
4. O agente executa `winget upgrade --silent --scope machine <winget-id>`.
5. O agente reporta o resultado via `POST /api/agent/jobs/{id}/done`.
6. O job passa para `completed` ou `failed`.

## Instalação silenciosa

Todas as implantações usam `winget upgrade --silent --scope machine`. Isso significa:
- Sem prompt UAC
- Sem interface do instalador
- Sem solicitação de reinicialização (a menos que o pacote exija explicitamente)
- A instalação é executada em segundo plano enquanto o usuário trabalha normalmente

## Implantação em lote

Quando você implanta para múltiplas máquinas, todos os jobs compartilham um `batch_id`. A página **Jobs** os agrupa por lote para que você possa acompanhar o progresso em toda a frota de uma só vez.

## Proteção contra duplicatas

Se você tentar enfileirar o mesmo software para uma máquina que já tem um job `queued` ou `in_progress` para aquele título, o servidor retorna HTTP 409 e ignora a duplicata. Isso evita corridas de implantação duplicada.

## Implantar a partir dos detalhes da máquina

Você também pode iniciar uma implantação a partir da página **Detalhes da Máquina**. A máquina alvo já vem pré-selecionada. Útil quando você quer enviar uma atualização específica para uma única máquina sem navegar até a página Implantar.

## Catálogo

O catálogo de software contém mais de 50 títulos pré-carregados em diversas categorias (navegadores, produtividade, ferramentas de desenvolvedor, etc.). Você também pode adicionar entradas personalizadas. Consulte [Catálogo de Software](/docs/dashboard/catalog).
