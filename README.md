# LOCAL

## Deployment

* `npm install`
* Создать .env файл и добавить в него поля
```
BOT_MAIL=example@gmail.com 
BOT_PASSWORD=1234
JWT_SECRET=SecretKey
```
* Установить PostgreSQL
* Настроить PostgreSQL, добавить в .env
```
DB_USER= <PostgreSQL user>
DB_PASSWORD= <PostgreSQL password>
DB_NAME= <name new database>
```

* Запустить PostgreSQL `service postgresql start`

### Create DB

`npm run create-db`

### Create migrations

`npm run db-migrate-up`

### Create seeders

Добавить в файл .env поля
```
ADMIN_USER=<Имя пользователя по умолчанию>
ADMIN_PASSWORD=<Пароль пользователя по умолчанию>
```
`npm run db-seeders-up`

### Start

`node app.js`

---

# DOCKER

## Start Containers

`docker-compose up --build`

