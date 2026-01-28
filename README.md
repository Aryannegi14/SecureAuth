# Auth Secure – Authentication & Authorization API

Auth Secure is a backend authentication and authorization service built using **Node.js and Express**, focused on implementing **secure, production-ready auth flows** commonly used in real-world applications.

The project demonstrates best practices for **user authentication, JWT-based authorization, role-based access control, and backend security**.

---

## Key Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Protected API routes using middleware
- Centralized error handling
- Input validation
- Clean and scalable backend architecture

---

## Technology Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** PostgreSQL / MongoDB  
- **Authentication:** JSON Web Tokens (JWT)  
- **Security:** bcrypt  
- **API Style:** REST  
- **Testing:** Postman
- 
---

## Authentication & Authorization Flow

1. User registers with email and password  
2. Password is hashed using bcrypt before being stored  
3. User logs in with valid credentials  
4. Server issues a signed JWT token  
5. Client sends token in the `Authorization` header  
6. Middleware verifies token for protected routes  
7. Role-based middleware restricts access to sensitive endpoints  



