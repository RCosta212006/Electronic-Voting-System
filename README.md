# Electronic-Voting-System
This repository is used to manage the final project for the Internet Programming course.

## Como correr a plataforma

### Requisitos

- Docker Desktop
- Node.js
- npm

### 1. Arrancar a base de dados e o backend

Na pasta principal do projeto, correr:

```bash
docker compose up --build
```

Este comando arranca:

- MongoDB em `localhost:27017`
- Backend/FastAPI em `http://localhost:8000`

Para confirmar que o backend está a funcionar, abrir:

```text
http://localhost:8000
```

### 2. Arrancar o frontend

Abrir outro terminal e correr:

```bash
cd frontend
npm install
npm run dev
```

Depois abrir no browser:

```text
http://localhost:5173
```

### 3. Parar a plataforma

Para parar o frontend, usar `Ctrl + C` no terminal onde está a correr.

Para parar o backend e a base de dados:

```bash
docker compose down
```
