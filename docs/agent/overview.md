---
id: overview
title: Como o Agente Funciona
sidebar_position: 1
---

# Como o Agente Funciona

`PatchPilotAgent.exe` é um binário Windows autossuficiente que roda como um Windows Service. Ele opera em um **modelo de pull**: o agente sempre inicia as conexões com o servidor. Nenhuma porta de entrada é necessária nas máquinas clientes.

## O que o agente faz

Em cada ciclo de check-in, o agente:

1. Lê o inventário de software instalado na máquina
2. Detecta quais aplicações instaladas possuem atualizações pendentes disponíveis
3. Envia um heartbeat ao servidor com essas informações
4. Verifica se o servidor possui algum job de atualização enfileirado para esta máquina
5. Executa os jobs de atualização enfileirados silenciosamente em segundo plano
6. Reporta o resultado de volta ao servidor

Os usuários finais não são interrompidos. As atualizações são instaladas silenciosamente, sem prompts.

## Identificação da máquina

Cada máquina é identificada por um identificador de hardware estável que persiste entre mudanças de hostname e configurações típicas de hardware. Esse identificador é usado para rastrear a máquina entre os check-ins e no log de auditoria.

## Justificativa do modelo de pull

Como o agente sempre se conecta de forma de saída ao servidor:

- Nenhuma regra de firewall de entrada é necessária nas máquinas clientes
- A configuração funciona atrás de NAT e proxies corporativos
- O servidor não pode iniciar comandos arbitrários nas máquinas clientes

## Compatibilidade com GravityZone

O agente usa APIs nativas do Windows e o gerenciador de pacotes do sistema. Ele não abre portas de escuta nem injeta em outros processos.

Consulte [Coexistência com GravityZone](/docs/security/gravityzone) para a configuração de exclusões de AV.
