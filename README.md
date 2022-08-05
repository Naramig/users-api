# Users-API

## Description
Сервис имеет регистрацию и авторизацию (JWT). Также есть возможность удалить и изменить созданные данные. При запуске сервиса, создается учетка админа. Админ имеет полный CRUD пользователей, а также возможность давать права админа другим пользователям. При создании нового пользователя создается сообщение в Kafka на отправку приветственного письма.
## Requirements
* NodeJS
* Postgres
* Apache Kafka
* Zookeeper
## Config
* PORT - port of the HTTP server
* HOST - host of the Postgres DB
* USER - user of the Postgres DB
* PASSWORD - password of the Postgres DB
* DB - database name
* TOKEN_SECRET - secret for JWT authentication
* KAFKA_URL - address of Kafka brokers
* KAFKA_CLIENT_ID - client id
* KAFKA_TOPIC - topic
<br>

### Optional configs:
* ADMIN_USERNAME - username of the admin (default "admin")
* ADMIN_PASSWORD - password of the admin (default "password")
* ADMIN_EMAIL - email of the admin (default "email")

<br>

## Local run
### Running with CLI:
```$ npm start```<br>

Be sure to pass necessary env variables or prepare your env somehow. For example create a conf-file file in your working directory and use this command to export the variables to the environment:
```
$ set -o allexport
$ source conf-file
$ set +o allexport
```
### Docker
You can run a service in docker container by running ```./restart.sh```<br>
Or you can use docker compose ([link](https://github.com/Naramig/testAppDocumentation))
