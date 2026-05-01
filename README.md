# Snippet Vault

Простий fullstack-проєкт для збереження сніпетів: посилань, нотаток і команд.

## Як запустити локально

### 1. Встановити залежності

У корені проєкту:

```powershell
npm install
```

### 2. Створити env файли

Потрібно вручну створити:

- `backend/.env`
- `frontend/.env`

### 3. Заповнити змінні середовища

Приклад для backend:

```env
PORT=3002
FRONTEND_URL=http://localhost:3000
MONGO_URI=mongodb://127.0.0.1:27017/snippet-vault
```

Приклад для frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

Важливо:

- `PORT` — порт backend. У вас він може бути іншим, наприклад `3001` або `3003`
- `FRONTEND_URL` — адреса frontend. Зазвичай це `http://localhost:3000`, але якщо frontend запустився на іншому порті, потрібно вказати його
- `MONGO_URI` — рядок підключення до MongoDB. Якщо у вас локальна MongoDB, зазвичай це:

```env
MONGO_URI=mongodb://127.0.0.1:27017/snippet-vault
```

Якщо MongoDB у вас в іншому місці або в Atlas, використовуйте свій рядок підключення.

- `NEXT_PUBLIC_API_URL` у frontend має вказувати на backend API. Якщо backend працює не на `3002`, змініть цю адресу

Приклад:

якщо backend у вас на `3001`, тоді:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Підняти MongoDB

Найпростіший варіант через Docker:

```powershell
docker compose up -d mongo
```

Якщо Docker не використовуєте, можна встановити MongoDB Community Server локально і запустити його звичайним способом.

### 5. Запустити frontend

```powershell
cd frontend
npm run dev
```

### 6. Запустити backend

В іншому терміналі:

```powershell
cd backend
npm run start
```

### 7. Відкрити проєкт

- frontend: [http://localhost:3000](http://localhost:3000)
- backend API: [http://localhost:3002/api/snippets](http://localhost:3002/api/snippets)

Якщо у вас інші порти, використовуйте свої.

## MongoDB Compass

Щоб дивитися записи в базі:

1. Завантажити MongoDB Compass:
   [https://www.mongodb.com/products/tools/compass](https://www.mongodb.com/products/tools/compass)
2. Відкрити Compass
3. Підключитися за рядком:

```text
mongodb://127.0.0.1:27017
```

4. Відкрити базу:

```text
snippet-vault
```

5. Відкрити колекцію:

```text
snippets
```

Якщо записи не видно одразу, натисніть refresh у Compass.

## Як перевірити API

Base URL:

```text
http://localhost:3002/api
```

Якщо backend у вас працює на іншому порті, замініть `3002` на свій.

### Отримати всі записи

```http
GET /snippets
```

Приклад:

```text
http://localhost:3002/api/snippets
```

### Отримати список з пагінацією, пошуком і фільтром

```http
GET /snippets?page=1&limit=10&q=react&tag=frontend
```

### Отримати один запис

```http
GET /snippets/:id
```

Приклад:

```text
http://localhost:3002/api/snippets/6813586f240024a38f26eb60
```

### Отримати всі теги

```http
GET /snippets/tags
```

### Створити запис

```http
POST /snippets
Content-Type: application/json
```

Приклад body:

```json
{
  "title": "Nest docs",
  "content": "https://docs.nestjs.com/",
  "tags": ["nestjs", "backend"],
  "type": "link"
}
```

### Оновити запис

```http
PATCH /snippets/:id
Content-Type: application/json
```

Приклад body:

```json
{
  "title": "Updated Nest docs",
  "content": "Official NestJS documentation",
  "tags": ["nestjs"],
  "type": "note"
}
```

### Видалити запис

```http
DELETE /snippets/:id
```
