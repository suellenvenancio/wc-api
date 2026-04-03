# 👕 Serviço de Times (@wc-app/team)

O serviço **Team** trata fundamentalmente dos recursos imutáveis do campeonato: Clubes, Seleções, Jogadores e Ranking Global e Técnicos.

Esse é um componente central para diversos outros microsserviços. 

## Protocolos Disponibilizados
O serviço responde tanto via RestAPI quanto via **gRPC**.
Na via gRPC, ele é responsável por aceitar consultas ultra-rápidas sobre checagem de dados do prisma (`FindTeamById`).

**Porta HTTP Padrão**: `3334`
**Porta gRPC Padrão**: `50054` (Configurável via .env)
