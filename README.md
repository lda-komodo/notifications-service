


## Description

The application is based on hexagonal architecture (ports and adapters).

![Hexagonal Architecture](https://blog.octo.com/hexagonal-architecture-three-principles-and-an-implementation-example/archi_hexa_en_06-1024x526.webp)

## Tecnology stack

- NodeJS: Server-side JavaScript code execution platform
- NestJS: NodeJS framework for building scalable and maintainable applications
- Docker: For container creation
- Docker-compose: For container orchestration
- Kafka: The events broker

### Project structure

- `src/adapters`: Adapter layer, contains the implementation of the ports defined in the application domain layer
- `src/core/application`: Application layer, contains the application's services
- `src/core/domain`: Domain layer, contains the application's entities and value objects
- `docker-compose.yml`: Localstack and Postgres service orchestration file

## Project setup

### Prerequisites

- Docker and Docker-compose installed on the system. By default it is installed with Docker Desktop
- NodeJS v22.13.1 (npm v10.9.2) installed on the system

## Project setup

You can run the application following typical NestJS and deply the complete stack with Docker compose

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Deployment

The project has a [docker-compose.yml](docker-compose.yml) file that orchestrates the Localstack and Postgres services.

To start the Localstack and Postgres services, run the following command:

```bash
docker-compose -p card-transactions-management up -d
```

After running the command and Docker builds the images, you should see output similar to the following:

```
[+] Running 5/5
 ✔ Network notifications-service_default  Created
 ✔ Container redis                        Started
 ✔ Container kafka                        Started
 ✔ Container kafka-ui                     Started
 ✔ Container notifications-service        Started
```

## Example usage

1. **Kafka** receives an event from one of the configured topics (`GAMING_PLAYER_LEVEL_UP_TOPIC`, `GAMING_PLAYER_ITEM_ACQUIRED_TOPIC`, `GAMING_PVP_TOPIC`, `GAMING_CHALLENGE_COMPLETED_TOPIC`).
2. **Kafka Consumer** in the NestJS application consumes the event and sends it to the **GameEventController**.
3. **GameEventController** receives the event and processes it in the corresponding method based on the topic.
4. **GameEventController** delegates the processing of the event to the **Use Case** by calling `callSupportedUseCase`. The use cases follow the OCP principle of SOLID, allowing flexible integration of new validations in addition to the current idempotency validation with Redis.
5. **Redis** is used to implement idempotency by maintaining a cache of processed events. Based on a message ID, duplicate events can be discarded.
6. **Use Case** processes the business logic associated with the event.
7. **Use Case** delegates the validation of notification preferences to the **Notification Service**.
8. **Notification Service** retrieves and validates the user's notification preferences. Following the OCP principle of SOLID, the notification service can integrate new channels in a highly extensible manner without requiring structural changes.
9. **Notification Service** sends notifications through the channels that the user has active (SMS, Email, Push).
10. **GameEventController** confirms the receipt and processing of the event to **Kafka**.

```plaintext
+-------+        +----------------+        +-------------------+        +-----------+        +-------------+        +-------------------+        +-------------------+        +-------+        +-------+
| Kafka | -----> | Kafka Consumer | -----> | GameEventController | -----> | Use Case  | -----> | Redis       | -----> | Notification Service | -----> | Notification Prefs | -----> | Notification | -----> | Kafka |
+-------+        +----------------+        +-------------------+        +-----------+        +-------------+        +-------------------+        +-------------------+        +-------+        +-------+
```

### Description of the Updated Flow

1. **Kafka**: The event is published to the corresponding topic.
2. **Kafka Consumer**: The Kafka consumer in the NestJS application receives the event and sends it to the controller.
3. **GameEventController**: The controller receives the event and processes it in the corresponding method based on the topic.
4. **Use Case**: The controller delegates the business logic to the corresponding use case. The use cases follow the OCP principle of SOLID, allowing flexible integration of new validations in addition to the current idempotency validation with Redis.
5. **Redis**: Redis is used to implement idempotency by maintaining a cache of processed events. Based on a message ID, duplicate events can be discarded.
6. **Notification Service**: The use case delegates the validation of notification preferences to the notification service.
7. **Notification Prefs**: The notification service retrieves and validates the user's notification preferences.
8. **Notification**: The notification service sends the notifications through the active channels (SMS, Email, Push). Following the OCP principle of SOLID, the notification service can integrate new channels in a highly extensible manner without requiring structural changes.
9. **Kafka**: Finally, the controller confirms to Kafka that the event has been processed correctly.

## Testing de application

Para propositos de pruebas utilizaremos la aplicacion **kafka-ui** la cual se despliegue con docker-compose. para interactuar con ella solo tienes que ir a tu navegador a la direccion http://localhost:8080

![img.png](resources/img.png)

Desde esta interfaz podemos generar los eventos a los que reaccionara nuestra aplicacion. Para eso debemos ir a la seccion de Topics desde donde podemos ver la lista de topicos que estan  actualmente en Kafka

![img_1.png](resources/img_1.png)

Ahora estamos listos para generar esos eventos. Recuerda que enunambiente de produccion, son las otras partes del sistema las que automaticamente generan los m,ensajes en los topicos para ser procesados!

Selecciona un topico cualquiera y luego en el panel ir a la opcion de Produce Message

![img_2.png](resources/img_2.png)

Ahora ya podemos generar nuestros mensajes

![img_3.png](resources/img_3.png)

Aca [extracted_topics.json](extracted_topics.json) puedes encontrar los ejemplos de los mensajes de cada topic, pero empecemos por uno de manera rapida

toma este ejemplo para el topico de `gaming.player.item.acquired`
```json
{
  "messageId": "PffW7grm7P5yws9PMws8V",
  "timestamp": "1740830925",
  "userId": "1",
  "itemName": "SwordOfAzeroth"
}
```
podras ver los logs de la aplicacion entradas similares a esta

```
[Nest] 1  - 03/01/2025, 9:24:29 PM     LOG [GameEventController] Event received: PffW7grm7P5yws9PMws8R timestamp: 1740830925
2025-03-01T21:24:29.795382634Z [Nest] 1  - 03/01/2025, 9:24:29 PM     LOG [SMSNotificationsChannel] Message You've acquired SwordOfAzeroth item sent
2025-03-01T21:24:29.795420384Z [Nest] 1  - 03/01/2025, 9:24:29 PM     LOG [EmailNotificationsChannel] Message You've acquired SwordOfAzeroth item sent
2025-03-01T21:24:29.795425092Z [Nest] 1  - 03/01/2025, 9:24:29 PM     LOG [PushNotificationsChannel] Message You've acquired SwordOfAzeroth item sent
2025-03-01T21:24:29.795432175Z [Nest] 1  - 03/01/2025, 9:24:29 PM     LOG [ItemAcquiredEventUseCase] Event PffW7grm7P5yws9PMws8R processed
```
Ten en cuenta que en la base de datos dummy(un mapa en memoria de la aplicacion) se encuentran registradas la preferencias de notificacion de 3 usuarios. Cada uno tiene sus propios canales activos(SMS, PUSH. Email). De acuerdo a estas configuracion la aplicacion decidira que canales activar para el envio simulado de estas notificaciones