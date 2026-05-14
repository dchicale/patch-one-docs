---
id: self-update
title: Atualização Automática do Agente
sidebar_position: 3
---

# Atualização Automática do Agente

O agente se atualiza automaticamente quando o servidor publica uma nova versão. Nenhuma intervenção manual é necessária nas máquinas individuais.

## Como funciona

Em cada check-in, o servidor inclui a versão mais recente disponível do agente em sua resposta. Se o agente detectar que está rodando uma versão mais antiga, ele:

1. Faz o download do novo binário do agente a partir do servidor
2. Para a si mesmo, substitui seu próprio executável e reinicia como serviço
3. Reporta a nova versão em execução no próximo check-in

Todo o processo é transparente para os usuários finais.

## Rollback

Se o agente atualizado não conseguir iniciar, a versão anterior é preservada como arquivo de backup no diretório de instalação. Entre em contato com o administrador do sistema para restaurar manualmente o binário anterior, se necessário.

## Considerações sobre AV

Durante uma atualização automática, o agente grava um novo binário em um local temporário antes de movê-lo para o lugar definitivo. Se o seu software AV bloquear isso, a atualização falhará silenciosamente e o agente continuará rodando a versão atual.

Certifique-se de que o diretório de instalação e o processo do agente estejam excluídos da varredura em tempo real do AV. Consulte [Coexistência com GravityZone](/docs/security/gravityzone).
