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
4. Enter mongodb uri (DB_URI) in startDevServer.bat
5. Double click the file or type .\startDevServer.bat in cmd and press Enter.

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
