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

In IntelliJ, open `backend/src/main/java/com/example/demo/DemoApplication.java` and click Run next to `main`. When the console shows `Started DemoApplication`, the API is ready on port 8081. Keep it running.

If you have Maven on your PATH, you can also start the backend from PowerShell:

```powershell
cd D:\Test\backend
mvn spring-boot:run
```

In a separate PowerShell terminal, start the frontend:

```powershell
cd D:\Test\frontend
npm.cmd install
npm.cmd run dev
```

Open the Local URL printed by Vite (normally http://localhost:5174). This is the signup and login page. Vite forwards requests under `/api` to Spring Boot on port 8081.

## Flow to explain

1. `AuthController` receives the HTTP request and validates its DTO with `@Valid`.
2. Controller calls the `AuthService` interface.
3. `AuthServiceImpl` applies the signup/login rules.
4. `UserRepository` finds or saves an `AppUser` row through JPA.
5. Signup hashes the password with BCrypt. Login checks it with `passwordEncoder.matches()`.

Signup success returns to the login form. Successful login displays a welcome screen; logout clears that browser screen.

## Scope

This small practice version skips JWT, `/me`, and server-side sessions so it can be built quickly. The logged-in screen is browser state only, so this is not production authentication. It demonstrates the basic layers, validation, MySQL persistence, and password hashing.
