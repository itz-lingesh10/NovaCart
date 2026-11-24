# 🛒 NovaCart — Full-Stack E-Commerce Application

A full-stack e-commerce application developed using **React, Spring Boot, and MySQL**, designed with a modular frontend, RESTful backend architecture, and relational database.

## 📌 Project Overview

NovaCart is a web-based e-commerce application that connects a React frontend with a Spring Boot backend and MySQL database.

The project demonstrates full-stack development concepts, including frontend state management, REST API integration, database operations, authentication, and backend security.

## ✨ Key Technologies

| Layer | Technology |
|---|---|
| Frontend | React.js |
| State Management | Redux |
| UI Components | Ant Design |
| API Integration | Axios |
| Backend | Java, Spring Boot |
| Security | Spring Security, JWT |
| Database | MySQL 8 |
| ORM | Spring Data JPA, Hibernate |
| Build Tool | Maven |
| Version Control | Git, GitHub |

## 📂 Project Structure

```text
NovaCart/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── src/
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── README.md
│
├── database/
│   └── schema.sql
│
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the application:

- Node.js and npm
- Java JDK
- MySQL Server 8.0
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/itz-lingesh10/NovaCart.git
cd NovaCart
```

### 2. Database Setup

1. Start your MySQL server.
2. Create the database:

```sql
CREATE DATABASE novacart_db;
```

3. Import the database schema:

```bash
mysql -u root -p novacart_db < database/schema.sql
```

4. Configure the database credentials in the backend.

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Copy the configuration template:

```powershell
Copy-Item src/main/resources/application.properties.example src/main/resources/application.properties
```

Set the required environment variables in your terminal:

```powershell
$env:DB_PASSWORD="your_mysql_password"
$env:JWT_SECRET="your_secure_jwt_secret"
```

Run the Spring Boot application:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at:

`http://localhost:8081`

### 4. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend normally runs at:

`http://localhost:3000`

## 🏗️ Application Architecture

```text
        USER
          |
          v
    React Frontend
          |
          | HTTP / REST API
          v
   Spring Boot Backend
          |
     Spring Security
          |
     Spring Data JPA
          |
          v
      MySQL Database
```

## 🔐 Security

The project incorporates:

- Spring Security for backend security.
- JWT-based authentication.
- Role-based authorization.
- Environment-based configuration for sensitive credentials.
- Git ignore rules to prevent accidental commits of secrets.

**Important:** Never commit real database passwords, JWT secrets, or local environment configuration files.

## 🖼️ Screenshots

Screenshots of the application can be added here to demonstrate the user interface and functionality.

Suggested screenshots:

- Home Page
- Product Listing
- Product Details
- Login and Registration
- Admin Dashboard

## 🔮 Future Improvements

Potential improvements include:

- Payment gateway integration.
- Product search and advanced filtering.
- Order tracking and management.
- Automated backend and frontend testing.
- Cloud deployment.
- CI/CD pipeline integration.

## 👨‍💻 Developer

**NovaCart** is a full-stack development project built to demonstrate practical knowledge of modern web development technologies and application architecture.

## 📄 License

This project is intended for educational and portfolio purposes. Add a license file if you plan to distribute it under a specific open-source license.
