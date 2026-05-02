# Snippet Vault

Demo: [https://snippet-vault-frontend-alpha.vercel.app/](https://snippet-vault-frontend-alpha.vercel.app/)

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

### 5. Запустити backend

В іншому терміналі:

```powershell
cd backend
npm run start
```

### 6. Запустити frontend

```powershell
cd frontend
npm run dev
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

## Як задеплоїти в прод

У моєму варіанті прод-деплой такий:

- база даних — `MongoDB Atlas`
- backend — `Render`
- frontend — `Vercel`

### 1. Підняти MongoDB Atlas

1. Зареєструватися в [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Створити безкоштовний кластер
3. У `Database Access` створити користувача бази даних
4. У `Network Access` додати доступ:

```text
0.0.0.0/0
```

Це потрібно, щоб Render міг підключитися до Atlas.

5. Натиснути `Connect`
6. Обрати `Drivers`
7. Скопіювати рядок підключення

Приклад:

```env
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/snippet-vault?retryWrites=true&w=majority&appName=Cluster0
```

Це і буде ваш `MONGO_URI`.

### 2. Підключити MongoDB Atlas до Compass

Щоб дивитися записи в хмарній базі:

1. Відкрити MongoDB Compass
2. Вставити Atlas connection string
3. Підключитися
4. Відкрити базу:

```text
snippet-vault
```

5. Відкрити колекцію:

```text
snippets
```

### 3. Задеплоїти backend на Render

1. Запушити проєкт у GitHub
2. Зайти на [Render](https://render.com/)
3. Створити `Web Service`
4. Підключити GitHub репозиторій

Що вказати:

- `Root Directory`:

```text
backend
```

- `Build Command`:

```text
npm install && npm run build
```

- `Start Command`:

```text
npm run start:prod
```

### Змінні середовища для Render

Приклад:

```env
PORT=10000
FRONTEND_URL=https://your-frontend.vercel.app
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/snippet-vault?retryWrites=true&w=majority&appName=Cluster0
```

Важливо:

- `PORT` — порт backend на Render
- `FRONTEND_URL` — адреса frontend на Vercel
- `MONGO_URI` — рядок підключення до MongoDB Atlas

Після цього Render дасть публічний URL backend, наприклад:

```text
https://your-backend.onrender.com
```

### 4. Задеплоїти frontend на Vercel

1. Зайти на [Vercel](https://vercel.com/)
2. Створити новий проєкт
3. Підключити GitHub репозиторій
4. Для `Root Directory` вказати:

```text
frontend
```

### Змінні середовища для Vercel

Приклад:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

Важливо:

- `NEXT_PUBLIC_API_URL` має вказувати на backend URL з Render
- в кінці потрібно додати `/api`

### 5. Фінальна перевірка

Після деплою перевірити:

1. Чи відкривається frontend на Vercel
2. Чи працює створення сніпетів
3. Чи працює список
4. Чи працює пошук
5. Чи працює фільтр за тегом
6. Чи працює редагування
7. Чи працює видалення

Також можна окремо перевірити backend:

```text
https://your-backend.onrender.com/api/snippets
```

Якщо відкривається JSON, backend працює правильно.
