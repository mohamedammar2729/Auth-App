# 🔐 Auth-App-Typescript

> A full-stack authentication application built with TypeScript, featuring secure JWT-based authentication, Redis caching, and MySQL database integration.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Docker Deployment](#docker-deployment)
- [Environment Variables](#environment-variables)
- [Version 2 Roadmap](#version-2-roadmap)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Auth-App-Typescript is a production-ready authentication system that demonstrates modern full-stack development practices. This application provides secure user registration, login, and profile management with enterprise-level security features including JWT token management, data encryption, and Redis-based session caching.

**Version 1.0** focuses on core authentication functionality with a clean, modern UI and robust backend architecture.

## ✨ Features

### 🔒 Authentication & Security

- **JWT-based Authentication** with access and refresh tokens
- **AES-256-CBC Encryption** for sensitive data
- **HTTP-only Cookies** for secure token storage
- **Middleware Protection** for protected routes
- **Password Hashing** using bcrypt
- **CORS Configuration** for cross-origin requests

### 🎨 Frontend

- **Modern UI** with Tailwind CSS and Framer Motion animations
- **Responsive Design** optimized for all devices
- **Form Validation** using Zod schema validation
- **Server Actions** for seamless form handling
- **Middleware-based Route Protection**

### ⚡ Backend

- **RESTful API** design with Express.js
- **Connection Pooling** for MySQL database
- **Redis Caching** for session management
- **Error Handling** with custom middleware
- **Request Logging** with Morgan
- **Security Headers** with Helmet

### 🐳 DevOps

- **Docker Containerization** for easy deployment
- **Docker Compose** for multi-service orchestration
- **Environment-based Configuration**
- **Development & Production** builds

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zod** - Schema validation
- **Axios** - HTTP client

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **MySQL** - Relational database
- **Redis** - In-memory data store
- **JWT** - JSON Web Tokens
- **bcrypt** - Password hashing

### DevOps & Tools

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **nodemon** - Development server

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   (MySQL)       │
│   Port: 3000    │    │   Port: 4000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │     Cache       │
                       │    (Redis)      │
                       │   Port: 6379    │
                       └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**
- **MySQL** (v8.0 or higher)
- **Redis** (latest)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mohamedammar2729/Auth-App-Typescript.git
cd Auth-App-Typescript
```

2. **Set up environment variables**

Create `.env` files in both backend and frontend directories:

**Backend (.env)**

```env
PORT=4000
MYSQL_HOST=localhost
MYSQL_PASSWORD=your_password
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_DATABASE=auth_db
JWT_SECRET_KEY=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
COOKIE_SECRET=your_cookie_secret
```

**Frontend (.env)**

```env
LOCAL_BACKEND_URL=http://localhost:4000/api
PROD_BACKEND_URL=http://localhost:4000/api
NODE_ENV=development
```

3. **Using Docker (Recommended)**

```bash
docker-compose up --build
```

4. **Manual Setup**

**Backend:**

```bash
cd auth-backend
npm install
npm run dev
```

**Frontend:**

```bash
cd auth-frontend
npm install
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **Redis Dashboard**: http://localhost:6379

## 📁 Project Structure

```
Auth-App-Typescript/
├── auth-backend/              # Express.js backend
│   ├── src/
│   │   ├── handlers/         # Request handlers
│   │   ├── middleware/       # Custom middleware
│   │   ├── mysql/           # Database configuration
│   │   ├── redis/           # Redis configuration
│   │   ├── routers/         # API routes
│   │   ├── token/           # JWT token management
│   │   ├── utils/           # Utility functions
│   │   └── encryption/      # Data encryption
│   ├── Dockerfile
│   └── package.json
├── auth-frontend/            # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/     # Authentication pages
│   │   │   ├── actions/    # Server actions
│   │   │   ├── lib/        # Utility libraries
│   │   │   └── profile/    # User profile
│   │   └── middleware.ts   # Route protection
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yaml       # Multi-service orchestration
└── README.md
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint                 | Description       | Auth Required |
| ------ | ------------------------ | ----------------- | ------------- |
| POST   | `/api/user/register`     | User registration | ❌            |
| POST   | `/api/user/login`        | User login        | ❌            |
| GET    | `/api/user/me`           | Get current user  | ✅            |
| GET    | `/api/user/:id`          | Get user by ID    | ❌            |
| PUT    | `/api/validation/tokens` | Validate tokens   | ✅            |

### Request/Response Examples

**Register User**

```json
POST /api/user/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Login User**

```json
POST /api/user/login
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

## 🔐 Security Features

### Token Management

- **Access Tokens**: Short-lived (15 minutes) for API requests
- **Refresh Tokens**: Long-lived (7 days) for token renewal
- **Automatic Refresh**: Seamless token renewal process

### Data Protection

- **AES-256-CBC Encryption** for sensitive data
- **HTTP-only Cookies** prevent XSS attacks
- **CORS Configuration** for cross-origin security
- **Helmet** for security headers

### Database Security

- **Connection Pooling** for efficient database access
- **Prepared Statements** prevent SQL injection
- **Password Hashing** with bcrypt

## 🐳 Docker Deployment

The application is fully containerized with Docker:

```yaml
services:
  - node-backend-server (Port: 4000)
  - nextjs-app (Port: 3000)
  - mysql-db (Port: 3306)
  - redis (Port: 6379)
```

**Deploy with Docker Compose:**

```bash
docker-compose up -d
```

## 🔧 Environment Variables

### Backend Variables

| Variable         | Description        | Default   |
| ---------------- | ------------------ | --------- |
| `PORT`           | Server port        | 4000      |
| `MYSQL_HOST`     | MySQL host         | localhost |
| `MYSQL_DATABASE` | Database name      | auth_db   |
| `JWT_SECRET_KEY` | JWT signing key    | -         |
| `ENCRYPTION_KEY` | AES encryption key | -         |

### Frontend Variables

| Variable            | Description         | Default                   |
| ------------------- | ------------------- | ------------------------- |
| `LOCAL_BACKEND_URL` | Development API URL | http://localhost:4000/api |
| `PROD_BACKEND_URL`  | Production API URL  | -                         |
| `NODE_ENV`          | Environment         | development               |

## 🚀 Version 2 Roadmap

### 🎯 Planned Enhancements

#### 🔐 Advanced Security

- [ ] **Two-Factor Authentication (2FA)** with TOTP/SMS
- [ ] **OAuth Integration** (Google, GitHub, Facebook)
- [ ] **Rate Limiting** with Redis-based throttling
- [ ] **Account Lockout** after failed login attempts
- [ ] **Password Reset** via email verification
- [ ] **Security Audit Logs** for user activities

#### 👥 User Management

- [ ] **Role-Based Access Control (RBAC)**
- [ ] **User Profiles** with avatar upload
- [ ] **Email Verification** for account activation
- [ ] **User Preferences** and settings
- [ ] **Account Deletion** with data retention policies

#### 🎨 Frontend Improvements

- [ ] **Dark/Light Theme** toggle
- [ ] **Progressive Web App (PWA)** capabilities
- [ ] **Internationalization (i18n)** support
- [ ] **Advanced Form Validation** with real-time feedback
- [ ] **Toast Notifications** for better UX
- [ ] **Loading States** and skeleton screens

#### ⚡ Performance & Scalability

- [ ] **Database Migrations** with Prisma/TypeORM
- [ ] **API Versioning** for backward compatibility
- [ ] **Caching Strategies** with Redis optimization
- [ ] **Database Indexing** for faster queries
- [ ] **API Response Compression** with gzip
- [ ] **CDN Integration** for static assets

#### 🔧 DevOps & Monitoring

- [ ] **Health Checks** and monitoring endpoints
- [ ] **Logging System** with Winston/Pino
- [ ] **Error Tracking** with Sentry
- [ ] **Performance Monitoring** with metrics
- [ ] **CI/CD Pipeline** with GitHub Actions
- [ ] **Automated Testing** (Unit, Integration, E2E)

#### 📱 Mobile & API

- [ ] **Mobile App** with React Native/Flutter
- [ ] **GraphQL API** alongside REST
- [ ] **WebSocket Support** for real-time features
- [ ] **API Documentation** with Swagger/OpenAPI
- [ ] **SDK Development** for third-party integration

#### 🗄️ Database & Infrastructure

- [ ] **Database Sharding** for horizontal scaling
- [ ] **Read Replicas** for better performance
- [ ] **Backup Strategies** with automated recovery
- [ ] **Environment Separation** (dev/staging/prod)
- [ ] **Infrastructure as Code** with Terraform

#### 🧪 Testing & Quality

- [ ] **Unit Testing** with Jest/Vitest
- [ ] **Integration Testing** with Supertest
- [ ] **E2E Testing** with Playwright/Cypress
- [ ] **Load Testing** with Artillery/k6
- [ ] **Code Coverage** reporting
- [ ] **Security Testing** with automated scans

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow **TypeScript** best practices
- Maintain **code coverage** above 80%
- Use **conventional commits** for commit messages
- Update **documentation** for new features

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohamed Ammar**

- GitHub: [@mohamedammar2729](https://github.com/mohamedammar2729)
- Email: your.email@example.com

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Express.js Community** for robust backend solutions
- **TypeScript Team** for type-safe development
- **Docker** for containerization simplicity

---

⭐ **Star this repository** if you found it helpful!

💡 **Have suggestions?** Open an issue or contribute to make this project even better!

🚀 **Ready for production?** This authentication system is built with enterprise-grade security and scalability in mind.
