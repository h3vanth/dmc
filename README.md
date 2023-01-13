# DMC

DMC stands for **Digital Menu Card**.

This application provides an interface where you can manage food menu, create orders easily in real time.

## Features

- Manage food menu (Add, Update, Delete)
- Real time updates
- Use single account to connect all your devices
- **Future**
  - You can manage the devices connected in the same application
  - Payment feature

## Technology stack

- React + Typescript
  - Other tools used
    @mui/material, redux, redux-thunk, react-hook-form ...
- Spring Boot + WebSocket + MongoDB
  - Other tools used
    Spring Security, JWT ...

## Getting started

### dmc-service

**You need Java installed to run dmc-service.**

1. Download mongodb server or you can make use of cloud server https://www.mongodb.com/cloud/atlas/register
2. Clone dmc-service repository
3. Switch to **_development_** branch
4. Create **application-dev.properties** file inside src/main/resources folder (next to application.properties).
5. Define few properties there
   ```sh
       # It would look something like this
       spring.data.mongodb.uri=mongodb+srv://[YOUR_USERNAME]:[YOUR_PASSWORD]@[DOMAIN]
       spring.data.mongodb.database=dmc-dev
       # client
       cors.allowed-origins=http://localhost:5173
   ```
6. Set a system variable with key as _JWT_SECRET_. The value can be a random string (Will be used for creating and verifying JWT tokens)
7. Dependencies are managed by a tool called **maven**. You don't need to install it. You can make use of the maven wrapper that is already present.
8. Run:
   ```sh
       mvnw clean spring-boot:run
   ```

### dmc-client

1. Clone dmc-client repository
2. Switch to **_development_** branch
3. Add the env vars given below in .env.local
   ```sh
       VITE_HOST=localhost:8080
       VITE_API_URL=http://$VITE_HOST/
       VITE_SOCKET_CONN_URL=ws://$VITE_HOST/message
   ```
4. Then run the following commands:
   ```sh
       npm install
       npm run dev
   ```
