
# Evex API

API backend para o sistema de gestão de eventos **Evex**, desenvolvida com Node.js, TypeScript, Express e Prisma ORM.

## Stack utilizada

- Node.js + TypeScript
- Express.js
- Prisma ORM + PostgreSQL
- Docker + Docker Compose
- JWT para autenticação (em breve)
- Swagger (em breve)
- Amazon S3 / SES (futuro)

## Instalando

Clone o projeto

```bash
  git clone https://github.com/Moonjose/Evex.git
```

Entre no diretório do projeto

```bash
  cd evex-api
```

Instale as dependências

```bash
  npm install
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`POSTGRES_DB`

`PORT`

## Docker

Este projeto utiliza docker e docker-compose para rodar uma instância do postgreSQL, preencha as informações no .env e depois rode o comando

```bash
  docker-compose --env-file .env up -d
```

## Rodando localmente

Inicie o servidor

```bash
  npm run dev
```

## Faça o teste

Faça uma requisição na rota abaixo para testar a API

```http
  GET /api/users
```