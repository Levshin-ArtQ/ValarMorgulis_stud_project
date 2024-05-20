# Valar Morghulis Online-RPG

## Описание

"Valar Morghulis" - это текстовая Online-RPG, основанная на мотивах "Игры Престолов". Игроки могут создавать персонажей, исследовать локации, собирать предметы и общаться друг с другом.

## Stack

Клиент, сервер и nginx обернуты в контейнеры, для базы данных взял Docker image postgres
Клиент реализован на React. На клиентской стороне для запросов использу axios. В структуре клиента nginx используется для перенаправления запросов.
## Структура проекта

Проект разделен на несколько основных директорий:

- `client` - клиентская часть приложения, реализованная на React
- `server` - серверная часть приложения, реализованная на Node.js
- `nginx` - конфигурация Nginx, используемого для перенаправления запросов
- `db` - конфигурация PostgreSQL
- `docker` - файлы конфигурации для запуска приложения в Docker контейнере

Основные файлы:

- `docker-compose.yml` - файл конфигурации для запуска приложения в Docker контейнере
- `client/index.js` - точка входа в клиентскую часть приложения
- `server/index.js` - точка входа в серверную часть приложения
- `nginx/nginx.conf` - конфигурация Nginx
- `db/init.sql` - скрипт инициализации базы данных
- `README.md` - данный файл, содержащий информацию о прооекта

## Структура серверной части

Серверная часть приложения разделена на несколько основных директорий:

- `controllers` - директория, содержащая файлы, отвечающие за логику работы каждого эндпоинта
- `models` - директория, содержащая файлы, отвечающие за работу с базой данных, в ней описываются модели объектов и врзаимосвязи между ними
- `routes` - директория, содержащая файлы, отвечающие за роутинг запросов
- `utils` - директория, содержащая файлы, отвечающие за вспомогательные функции

Основные файлы:

- `server/index.js` - точка входа в серверную часть приложения
- `server/config.js` - файл конфигурации серверной части приложения
- `server/app.js` - файл, содержащий логику работы сервера
- `server/models/index.js` - файл описывающий типы связей между моделями

## Иерархия URL-адресов

### Игроки (Players)

- `GET /api/players` - получение списка всех игроков.
- `GET /api/players/:id` - получение информации о конкретном игроке по ID.
- `POST /api/players` - создание нового игрока.
- `PUT /api/players/:id` - обновление информации об игроке по ID.
- `DELETE /api/players/:id` - удаление игрока по ID.

### Предметы (Items)

- `GET /api/items` - получение списка всех предметов.
- `GET /api/items/:id` - получение информации о конкретном предмете по ID.
- `POST /api/items` - создание нового предмета.
- `PUT /api/items/:id` - обновление информации о предмете по ID.
- `DELETE /api/items/:id` - удаление предмета по ID.

### Типы предметов (ItemTypes)

- `GET /api/itemtypes` - получение списка всех типов предметов.
- `GET /api/itemtypes/:id` - получение информации о конкретном типе предметов по ID.
- `POST /api/itemtypes` - создание нового типа предметов.
- `PUT /api/itemtypes/:id` - обновление информации о типе предметов по ID.
- `DELETE /api/itemtypes/:id` - удаление типа предметов по ID.

### Локации (Locations)

- `GET /api/locations` - получение списка всех локаций.
- `GET /api/locations/:locationId` - получение информации о конкретной локации по locationId.
- `GET /api/player-location/:locationId` - получение информации о локации в которой находится пользователь по playerId
- `POST /api/locations` - создание новой локации.
- `PUT /api/locations/:locationId` - обновление информации о локации по locationId.
- `DELETE /api/locations/:locationId` - удаление локации по locationId.

### Сообщения (Messages)

- `GET /api/messages` - получение списка всех сообщений.
- `GET /api/messages/:messageId` - получение информации о конкретном сообщении по messageId.
- `POST /api/messages` - отправка нового сообщения.
- `PUT /api/messages/:messageId` - обновление информации о сообщении по messageId.
- `DELETE /api/messages/:messageId` - удаление сообщения по messageId.

## Запуск проекта

Для того чтобы запустить все приложение через докер в корне проекта запустите команду:

```console
docker-compose up --build
```

Убедитесь, что у вас установлены все зависимости.

## Примеры
### Авторизация
<img width="1342" alt="Screenshot 2024-05-20 at 13 37 19" src="https://github.com/Levshin-ArtQ/ValarMorgulis_stud_project/assets/114755543/28e297f8-c9ba-4bef-bbc5-b78b1cf26c72">


### Регистрация
<img width="1452" alt="Screenshot 2024-05-20 at 13 43 54" src="https://github.com/Levshin-ArtQ/ValarMorgulis_stud_project/assets/114755543/c7914f1e-0e85-4e80-94f1-5bd84df030b9">

### CRUD
<img width="1452" alt="Screenshot 2024-05-20 at 13 46 26" src="https://github.com/Levshin-ArtQ/ValarMorgulis_stud_project/assets/114755543/b75167f4-c849-4486-9ea8-61fcf07835d2">
<img width="1452" alt="Screenshot 2024-05-20 at 13 44 35" src="https://github.com/Levshin-ArtQ/ValarMorgulis_stud_project/assets/114755543/35c1f248-9a87-4333-8bc9-71db722844c9">
<img width="1452" alt="Screenshot 2024-05-20 at 13 46 18" src="https://github.com/Levshin-ArtQ/ValarMorgulis_stud_project/assets/114755543/635cd0bd-ca6a-411e-9db2-27da938c80ea">

# ValarMorgulis_stud_project
