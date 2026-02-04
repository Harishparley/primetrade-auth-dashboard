# 📝 Primetrade Notes App 
### *Secure Full-Stack Auth + Dashboard Assignment*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A high-performance MERN stack application featuring robust user authentication, JWT-protected routes, and a dynamic notes management dashboard.

---

## 🌟 Key Features

* **🔐 Secure Authentication**: Signup and Login with password hashing via `bcryptjs`.
* **🛡️ Protected Routes**: Dashboard and API endpoints restricted via JWT middleware.
* **📓 CRUD Operations**: Full Create, Read, and Delete functionality for user notes.
* **🔍 Real-time Search**: Instant filtering of notes by title or content.
* **📱 Responsive UI**: Clean, mobile-friendly design built with TailwindCSS.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), Axios, Lucide-React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Local Instance) |
| **Security** | JWT, Bcrypt.js |

---

## ⚙️ Setup & Installation

### 1️⃣ Backend Setup

cd server
npm install
node server.js

📌 Note: MongoDB must be running locally at mongodb://127.0.0.1:27017/primetrade.

### 2️⃣ Frontend Setup

cd client
npm install
npm run dev

🚀 Scaling for Production
As a final-year IT student, I would implement the following to scale this for production:

Environment Security: Move the JWT_SECRET and MONGODB_URI from hardcoded strings to encrypted .env variables for compliance.

Performance: Add Redis for session caching and implement Database Indexing on the user field in MongoDB for faster lookups.

Advanced Auth: Implement Refresh Tokens and HTTP-only Cookies to mitigate XSS and CSRF risks.

DevOps: Containerize the services using Docker and deploy via an Nginx reverse proxy for load balancing.