# Terminal de autobuses - Backend

API REST con Spring Boot 3, Spring Security + JWT, JPA, MySQL y Flyway.

## Como correrlo

1. Crear la base en MySQL: `CREATE DATABASE terminal_autobuses CHARACTER SET utf8mb4;`
2. Copiar `src/main/resources/application.properties.example` a `application.properties` y llenar los valores.
3. Generar el secreto del JWT: `openssl rand -base64 32` y pegarlo en `app.jwt.secreto`.
4. Correr: `mvn spring-boot:run` (Flyway crea las tablas y `SemillaDatos` carga los datos de prueba).
5. Para el jar del vps: `mvn clean package -DskipTests` y `java -jar target/terminal-autobuses-1.0.0.jar`.

## Usuarios de prueba

| Rol | Correo | Contrasena |
|---|---|---|
| ADMINISTRADOR | admin@terminal.com | Admin123! |
| TAQUILLERO | taquillero@terminal.com | Taquilla123! |
| CLIENTE | cliente@terminal.com | Cliente123! |

## Endpoints

Todos van con el header `Authorization: Bearer <token>` menos `/api/auth/**`.
Los listados reciben `pagina` (desde 1), `tamano` y filtros como parametros.

| Ruta | Quien puede |
|---|---|
| `POST /api/auth/login, /registro, /logout, /recuperar, /restablecer` | publico |
| `GET /api/usuarios/perfil` | cualquier usuario con sesion |
| `/api/usuarios` (CRUD, filtros `buscar`, `rol`) | ADMINISTRADOR |
| `/api/terminales`, `/api/autobuses`, `/api/choferes` | GET: ADMINISTRADOR y TAQUILLERO, escritura: ADMINISTRADOR |
| `/api/rutas`, `/api/viajes` | GET: cualquier usuario con sesion, escritura: ADMINISTRADOR |
| `GET /api/viajes/{id}/asientos-ocupados` | cualquier usuario con sesion |
| `POST /api/reservaciones`, `GET /api/reservaciones/mias` | CLIENTE |
| `GET /api/reservaciones`, `PUT /api/reservaciones/{id}/cancelar` | ADMINISTRADOR (cancelar tambien CLIENTE, solo las suyas) |
| `POST /api/boletos` (venta en ventanilla) | TAQUILLERO |
| `GET /api/boletos` | ADMINISTRADOR y TAQUILLERO |
| `GET /api/boletos/mios` | CLIENTE |
| `PUT /api/boletos/{id}/cancelar` | cualquier usuario con sesion (el cliente solo los suyos) |

## Codigos de error

400 datos de negocio invalidos, 401 sin token o credenciales malas, 403 sin permiso, 404 no existe,
409 choca con datos existentes, 422 fallo Bean Validation (con el detalle por campo), 500 error del servidor.

## Notas

- El respaldo `.sql`: despues de arrancar una vez, `mysqldump -u usuario -p terminal_autobuses > respaldo.sql`.
- SMS y WhatsApp se disparan al crear una reservacion (junto con el correo). Los telefonos llevan lada, ejemplo `+525512345678`.
- Si `twilio.*` esta vacio, solo se escribe un aviso en el log y no se manda nada.
