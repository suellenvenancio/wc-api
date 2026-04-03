# 🎙️ Serviço de Simulação IA (@wc-app/simulate)

O **microsserviço Simulate** é a ponte entre resultados brutos de um campeonato mundial de futebol e a criatividade analítica da Inteligência Artificial.

## Integração
Responsável primordialmente pelo consumo da API do **Google Generative AI (Gemini)**.

Utilizamos em especial o modelo **flash-preview-tts** (`gemini-2.5-flash-preview-tts`) e suas capacidades avançadas para:
- Narração de fatos curiosos/contextos e simulação artificial textual dos campeonatos processados e das reações em campos de jogo.
- Avaliação detalhada das táticas fornecidas comparando os prós e contras vis-à-vis.

**Execução Isolada**:
O serviço deve possuir a variável ambiente `API_KEY` injetada da root do repositório para inicializar corretamente o serviço Generativo do Google.
