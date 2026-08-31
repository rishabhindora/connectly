# Connectly — Authentication

Backend authentication module for **Connectly**, built with Node.js, Express.js, MySQL, bcrypt, and JSON Web Token (JWT).

This phase establishes the authentication foundation of the application by implementing user registration, secure password handling, login, JWT-based authentication, and protected API routes.

---

## 🚧 Status

**Phase 4 — Authentication**

Currently focused on building and testing the backend authentication system.

---

## 🛠️ Tech Stack

* **Node.js** — Backend runtime
* **Express.js** — REST API framework
* **MySQL** — Relational database
* **bcrypt** — Password hashing
* **JWT** — Token-based authentication
* **Git & GitHub** — Version control

---

## ✨ Features

### User Registration

* Input validation
* Email and username uniqueness checks
* Password hashing with bcrypt
* User persistence in MySQL

### User Login

* Credential validation
* Password verification using bcrypt
* JWT generation
* Authentication response

### Protected Routes

* JWT-based request authentication
* Authentication middleware
* Authenticated user identification
* Unauthorized request handling

---

## 🏗️ Authentication Architecture

### Registration

```text
Client
  ↓
POST /api/v1/auth/register
  ↓
Validate Input
  ↓
Check Existing User
  ↓
Hash Password
  ↓
MySQL
  ↓
Registration Response
```

### Login

```text
Client
  ↓
POST /api/v1/auth/login
  ↓
Find User
  ↓
Verify Password
  ↓
Generate JWT
  ↓
Authentication Response
```

### Protected Requests

```text
Client Request
  ↓
Authorization: Bearer <JWT>
  ↓
Authentication Middleware
  ↓
Verify JWT
  ↓
Identify User
  ↓
Protected Controller
  ↓
Response
```

---

## 🔌 API Endpoints

| Method | Endpoint                | Description                | Auth         |
| ------ | ----------------------- | -------------------------- | ------------ |
| `POST` | `/api/v1/auth/register` | Register a new user        | Public       |
| `POST` | `/api/v1/auth/login`    | Authenticate a user        | Public       |
| `GET`  | `/api/v1/users/me`      | Get the authenticated user | JWT Required |

### Authorization

Protected endpoints expect a JWT in the request header:

```http
Authorization: Bearer <JWT>
```

Requests with missing, malformed, invalid, or expired tokens are rejected.

---

## 🔒 Security

The authentication system follows several security practices:

* Passwords are hashed using **bcrypt** before database storage.
* Plain-text passwords are never stored.
* Password hashes are not returned in API responses.
* JWT secrets are stored in environment variables.
* Protected routes require a valid JWT.
* Authenticated user identity is derived from the verified JWT.
* SQL queries use parameterized values.
* `.env` is excluded from version control.

### Password Handling

```text
Registration
    ↓
Plain Password
    ↓
bcrypt
    ↓
Password Hash
    ↓
MySQL
```

During login, the supplied password is verified against the stored bcrypt hash rather than being decrypted.

---

## 🗄️ Database

MySQL is used for persistent authentication data.

The authentication module uses the `users` table to:

* Create user accounts
* Check existing email addresses
* Check existing usernames
* Store password hashes
* Retrieve users during login
* Identify authenticated users

---

## 📁 Project Structure

```text
Connectly/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── notFoundMiddleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── authService.js
│   │   │
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js
* npm
* MySQL
* Git

### Clone the Repository

```bash
git clone <repository-url>
cd Connectly
```

### Install Dependencies

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=connectly_db

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

The `.env` file contains local secrets and should **not** be committed to GitHub.

Use `.env.example` as the configuration template.

### Run the Server

```bash
npm run dev
```

---

## 🧪 Testing

The authentication system is tested against both successful and failure scenarios.

### Registration

* [ ] Valid registration
* [ ] Missing required fields
* [ ] Invalid input
* [ ] Duplicate email
* [ ] Duplicate username
* [ ] Password hashing
* [ ] Successful database insertion

### Login

* [ ] Valid credentials
* [ ] Incorrect password
* [ ] Non-existent user
* [ ] Missing credentials
* [ ] JWT generation

### Protected Routes

* [ ] Request without JWT
* [ ] Malformed authorization header
* [ ] Invalid JWT
* [ ] Expired JWT
* [ ] Valid JWT
* [ ] Correct authenticated user identification

---

## 🌿 Git Workflow

Authentication development is maintained on a dedicated feature branch:

```text
main
  │
  └── feature/authentication
```

Typical workflow:

```bash
git checkout -b feature/authentication

git add .
git commit -m "feat: add user registration"

git push -u origin feature/authentication
```

Authentication functionality is developed and tested on the feature branch before being merged into `main` through a Pull Request.

Example commit history:

```text
feat: add user registration
feat: add login with JWT
feat: add JWT authentication middleware
feat: add authenticated user endpoint
```

---

## 📌 Phase 4 Completion Criteria

Phase 4 is complete when the complete authentication flow has been implemented and verified:

```text
Registration
     ↓
Password Hashing
     ↓
MySQL Storage
     ↓
Login
     ↓
Password Verification
     ↓
JWT Generation
     ↓
JWT Verification
     ↓
Authentication Middleware
     ↓
Protected Route
     ↓
Authenticated User
```

All major valid and invalid authentication scenarios should pass before proceeding to the next development phase.

---

## 🗺️ Roadmap

Connectly is being developed incrementally.

**Completed**

* [x] Project planning
* [x] Database design
* [x] Backend foundation

**Current**

* [ ] Authentication

**Upcoming**

* [ ] Further application functionality

---

## 📄 License

This project is currently being developed for learning and portfolio purposes.
