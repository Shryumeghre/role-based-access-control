# Role-Based Access Control (RBAC) Application

This application implements **Role-Based Access Control (RBAC)** using **Node.js**, **Express**, **Passport.js**, and other related technologies. It serves as a foundational template for projects requiring **authentication** and **authorization** functionalities.

Currently, the authentication system supports **email and password** login. However, additional OAuth providers (such as **Google**, **Facebook**, **Apple**, **GitHub**, etc.) can be easily integrated into the system.

The project follows the **Model-View-Controller (MVC)** design pattern to ensure clear separation of concerns, making the codebase more organized and maintainable.

- **Mongoose** is used for interacting with MongoDB, acting as an ORM to store user data in the database.
- **Passport.js** is utilized for local email and password authentication.
  
This project is **almost production-ready** and can be used as a starting point for building authentication systems with role-based access control.



login credentials:
role: "ADMIN"
email: "demo1@gmail.com"
password: "Demo@123"


role: "CLIENT"
email: "main@gmail.com"
password: "main@123"



.env file:
PORT=3000
SESSION_SECRET=some super secret
ADMIN_EMAIL=admin1@gmail.com
MONGODB_URI=mongodb+srv://rbac:rbac%401234@rbac.dm2dy.mongodb.net/myDatabase?retryWrites=true&w=majority
DB_NAME=rbac

---

## Setup Instructions

Follow these steps to set up and run the project locally:

## To start setting up the project

Step 1: Clone the repo

```bash
git clone <ur></ur>>
```

Step 2: cd into the cloned repo and run:

```bash
npm install
```

Step 3: Put your credentials in the .env file.

```bash
PORT=3000
MONGODB_URI=YOUR_MONGODB_URI(example: mongodb://localhost:27017)
DB_NAME=YOUR_DB_NAME
```

Step 4: Install MongoDB (Linux Ubuntu)

See <https://docs.mongodb.com/manual/installation/> for more infos

Step 5: Run Mongo daemon

```bash
sudo service mongod start
```

Step 6: Start the app by

```bash
npm start
```

login credentials:
role: "ADMIN"
email: "demo1@gmail.com"
password: "Demo@123"


role: "CLIENT"
email: "main@gmail.com"
password: "main@123"



.env file:
PORT=3000
SESSION_SECRET=some super secret
ADMIN_EMAIL=admin1@gmail.com
MONGODB_URI=mongodb+srv://rbac:rbac%401234@rbac.dm2dy.mongodb.net/myDatabase?retryWrites=true&w=majority
DB_NAME=rbac

