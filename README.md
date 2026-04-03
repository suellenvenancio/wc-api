# 🏆 World Cup Application (WC-App)

Bem-vindo ao **WC-App**, um projeto *Monorepo* que utiliza arquitetura baseada em **Microserviços**. A aplicação simula torneios, convocações de times, montagens de táticas e simulações de partidas em tempo real utilizando integração avançada de inteligência artificial via **Google Gemini**.

---

## 🏗️ Arquitetura do Monorepo

Este repositório é gerenciado através do **TurboRepo** e **Yarn Workspaces**. Utilizamos **Fastify** para nosso servidor Web, **Prisma** como ORM de banco de dados e **gRPC** para a comunicação rápida e confiável entre os microsserviços.

### 📦 Estrutura
- **`apps/gateway`**: Proxy reverso (API Gateway) unificado de entrada.
- **`apps/auth`**: Microsserviço responsável por JWT, Cookies e Sessões de Autenticação.
- **`apps/team`**: Microsserviço focado na parte gerencial e gRPC de buscar informações de times.
- **`apps/match`**: Microsserviço que gerencia criações de táticas e partidas reais.
- **`apps/tournament`**: Microsserviço de listagem de torneios.
- **`apps/simulate`**: Serviço com conexão ao **Google Generative AI (Gemini)** para narrações TTS e resumos simulados de jogos.
- **`packages/database`**: Modelagem do Prisma ORM compartilhado entre os serviços.
- **`packages/protos`**: Contratos RPC compartilhados entre os Microsserviços para o intercâmbio de dados de forma estrita.

---

## 🛠️ Tecnologias Principais

- **Node.js** (Ambiente de execução)
- **TypeScript** (Segurança e tipagem)
- **Fastify** (Web Framework de alto desempenho)
- **PostgreSQL** + **Prisma ORM** (Banco de dados)
- **gRPC** (Remote Procedure Call framework)
- **Gemini TTS API** (Inteligência Artificial do Google)

---

## 🚀 Como Executar Localmente

### 1. Pré-Requisitos
Assegure-se de possuir instalado:
- **Node.js** (V20+)
- **Yarn** 
- **Docker** ou instância do **PostgreSQL** rodando e disponível.

### 2. Configurações
1. Clone o projeto e instale as dependências:
   ```bash
   yarn install
   ```
2. Crie ou configure o arquivo `.env` localizado na raiz do seu projeto contendo sua conexão e API keys necessárias:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5433/wc_simulation?schema=public"
   API_KEY="sua_chave_gemini_aqui"
   JWT_SECRET="sua-senha-super-secreta"
   COOKIE_SECRET="seu-cookie-secreto"
   ```

### 3. Banco de Dados
Sincronize o schema atualizado com o banco:
```bash
yarn workspace @wc-app/database prisma migrate dev
yarn workspace @wc-app/database prisma generate
```

### 4. Executando os Serviços
Utilizando as facilidades iterativas do Turbo, suba todos os serviços rodando em modo watch com um só comando:
```bash
yarn run dev
```

Todos os serviços tentarão inicializar escutando de forma paralela as portas definidas ou default.

---

*“Um monorepo focado no coração do futebol e inovado por inteligência artificial.”*
