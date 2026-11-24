# NovaCart

A full-stack e-commerce application built with React, Spring Boot, and MySQL.

## Project Structure

- frontend/ - React application
- backend/ - Spring Boot REST API
- database/ - MySQL database schema

## Requirements

- Node.js and npm
- Java JDK
- MySQL 8
- Git

## Database Setup

1. Create a MySQL database named `novacart_db`.
2. Import `database/schema.sql` into that database.
3. Configure the backend database credentials.

## Backend Setup

1. Open a terminal in the `backend` folder.
2. Copy the configuration template:

   `src/main/resources/application.properties.example`

   to:

   `src/main/resources/application.properties`

3. Set the environment variables `DB_PASSWORD` and `JWT_SECRET`.
4. Run:

   `.\mvnw.cmd spring-boot:run`

The backend runs on port 8081.

## Frontend Setup

1. Open a terminal in the `frontend` folder.
2. Install dependencies:

   `npm install`

3. Start the development server:

   `npm start`

The frontend development server normally runs on port 3000.

## Security

Never commit real database passwords, JWT secrets, or local environment files.
