# CTOtalk - Event Management Platform

A full-stack CTOtalk website, built using **React (Vite)**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MySQL**.  
The project replicates core functionalities of CTOtalk, including event listing, registration, user authentication, and real-time event status updates.

---

## 🚀 Features

- **User Authentication** (JWT-based login & registration)
- **Event Management** (list, view details, register)
- **Real-time Event Status** (Upcoming, Registered, Full)
- **Responsive UI** with Tailwind CSS
- **Backend API** built with Express.js & MySQL
- **Secure Password Hashing** using bcrypt
- **Protected Routes** for authenticated users
- **Persistent Login** using localStorage tokens

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS**
- Axios for API calls
- React Router for navigation

### Backend
- **Node.js** with **Express.js**
- **MySQL** (Relational Database)
- Sequelize ORM
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

---

## 📦 Installation & Setup

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16+)
- **MySQL** (v8+)
- **npm** or **yarn**

### Clone Repository
```bash
git clone https://github.com/Utkarsh7545/CTOtalk-Fullstack.git
cd ctotalk-clone
```

### Backend Setup
```bash
cd backend
npm install
```

- Create a `.env` file inside `backend/`:
```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ctotalk
JWT_SECRET=your_jwt_secret
```

- Run database migrations & seeders if applicable:
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

- Start backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

- Create `.env` file inside `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

- Start frontend server:
```bash
npm run dev
```

---

## 📖 About the Project

This project is a **CTOtalk** clone designed for learning and demonstration purposes.  
It implements a **full-stack architecture** where the frontend interacts with a REST API backend.  
Users can:
- Browse events
- View event details
- Register for events
- See their registered status
- View if events are upcoming or full

Event availability updates dynamically, ensuring a real-time user experience.

---

## 📌 API Endpoints (Backend)

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login user and get token

### Events
- `GET /api/events` – Get all events
- `GET /api/events/:id` – Get single event details
- `POST /api/events/:id/register` – Register for event (auth required)

---

## 🏆 Learning Outcomes
- Full-stack application development using modern technologies
- State management in React
- REST API development with Express.js
- Secure authentication & authorization with JWT
- Styling responsive UI with Tailwind CSS
- Handling relational data in MySQL with Sequelize

---

## 📄 License
This project is for educational purposes only and is not affiliated with CTOtalk.

---

**Author:** Utkarsh  
**Tech Stack:** React, Tailwind CSS, Node.js, Express.js, MySQL
