# Valar Morghulis Online-RPG

## Описание

"Valar Morghulis" - это текстовая Online-RPG, основанная на мотивах "Игры Престолов". Игроки могут создавать персонажей, исследовать локации, собирать предметы и общаться друг с другом.

## Stack

Клиент, сервер и nginx обернуты в контейнеры, для базы данных взял Docker image postgres
Клиент реализован на React. На клиентской стороне для запросов использу axios. В структуре клиента nginx используется для перенаправления запросов.

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
- `GET /api/messages/:messageId` - получение конкретного сообщения по messageId.
- `POST /api/messages` - отправка нового сообщения.
- `PUT /api/messages/:messageId` - обновление сообщения по messageId.
- `DELETE /api/messages/:messageId` - удаление сообщения по messageId.

## Запуск проекта

Для того чтобы запустить все приложение через докер в корне проекта запустите команду:

```console
docker-compose up --build
```

Убедитесь, что у вас установлены все зависимости и настроена база данных перед запуском приложения.

Для запуска сервера перейдите в каталог сервера и выполните команду:
# ValarMorgulis_stud_project
