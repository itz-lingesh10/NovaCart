# NovaCart Backend

Spring Boot 3 REST API for a headless e-commerce application.

## Requirements

- Java 17 or later
- Maven 3.8+
- MySQL 8 (or update the datasource configuration for another database)

## Configure the database

Create the database:

```sql
CREATE DATABASE novacart_db;
```

Set these environment variables before running the application (defaults are for local development only):

- `DB_USERNAME` — MySQL username (default: `root`)
- `DB_PASSWORD` — MySQL password (default: `root`)
- `JWT_SECRET` — a private, random secret of at least 64 bytes for HS512

The upload directory defaults to `uploads/` in the application working directory.

## Run

```bash
mvn clean test
mvn spring-boot:run
```

API base URL: `http://localhost:8080/api`

Swagger UI: `http://localhost:8080/swagger-ui.html`

OpenAPI JSON: `http://localhost:8080/api-docs`

## Main endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`, `GET /api/products/{id}`, `GET /api/products/search?keyword=...`
- `GET /api/categories`, `GET /api/categories/{id}`
- `GET/POST/PUT/DELETE /api/cart...`
- `POST /api/orders/checkout`, `GET /api/orders/my-orders`
- Admin: product/category mutations, `/api/orders/all`, order status updates, `/api/users/**`, `/api/upload`

Registration always creates a `ROLE_USER`; the role supplied in a registration payload is not trusted.

## Notes

- The service package currently contains Spring-managed service classes with business logic. It does not contain a separate `serviceimpl` package.
- CORS is configured for local React development at ports 3000 and 5173.
- Uploaded files are served from `/uploads/**`.
- Run the Maven commands in your local environment to perform the full dependency-backed build and test. This workspace did not have Maven installed, so a Maven build could not be executed during this review.
