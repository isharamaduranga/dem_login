# 30-minute Login / Signup Practice

Small React + Spring Boot + MySQL app for practicing the basic login/signup flow. Passwords are hashed with BCrypt. This copy is at `D:\Test`.

## Backend packages

```text
controller/  HTTP endpoints; calls the service
dto/         request and response data, including validation
entity/      JPA model stored in MySQL
repository/  Spring Data database queries
service/     business logic interface
service/impl/ business logic implementation
config/      BCrypt password encoder bean
```

## Run

Requirements: Java 17+, Maven, Node.js/npm, and local MySQL Server. Make sure the `MySQL80` Windows service is running. Defaults in `backend/src/main/resources/application.properties`: host `localhost:3306`, database `demo_auth`, user `root`, password `1234`. Change the password there if your local MySQL root password is different.

Hibernate creates the `demo_auth` database and `demo_users` table automatically with the current local settings.

Terminal 1:

```powershell
cd D:\Test\backend
mvn clean spring-boot:run
```

Terminal 2:

```powershell
cd D:\Test\frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Flow to explain

1. `AuthController` receives the HTTP request and validates its DTO with `@Valid`.
2. Controller calls the `AuthService` interface.
3. `AuthServiceImpl` applies the signup/login rules.
4. `UserRepository` finds or saves an `AppUser` row through JPA.
5. Signup hashes the password with BCrypt. Login checks it with `passwordEncoder.matches()`.

Signup success returns to the login form. Successful login displays a welcome screen; logout clears that browser screen.

## Scope

This small practice version skips JWT, `/me`, and server-side sessions so it can be built quickly. The logged-in screen is browser state only, so this is not production authentication. It demonstrates the basic layers, validation, MySQL persistence, and password hashing.
