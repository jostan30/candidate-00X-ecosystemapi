# Candidate 00X Ecosystem API

This project syncs CRM data from a source platform to multiple target platforms (e.g., MailerLite, Notion) via a single API.

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone git@github.com:jostan30/candidate-00X-ecosystemapi.git
cd candidate-00X-ecosystemapi
```

### 2. Install Root-Level Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
```

---

## 🚀 Start the Backend Server

Inside the `backend` directory:

```bash
nodemon app.js
```

If it fails then Install nodemon globally:

```bash
npm install -g nodemon
```

The server will run at `http://localhost:5000`.

---

## 📁 Project Structure

```
candidate-00X-ecosystemapi(a Nextjs app)/
├── backend/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   ├── middlewares/
│   ├── .env
│   └── package.json
├── node_modules/
├── package.json
└── README.md
```

---

## 📌 Notes

- Ensure `.env` is listed in `.gitignore`.
- You must run `npm install` in **both** the root and `/backend` directories.
- API keys are loaded dynamically and used for routing requests to services.

---
🧪 Test the API Using Curl  
Enter valid API key after "x-api-key: yourapikey":

curl -X POST http://localhost:5000/api/crm-sync \
  -H "Content-Type: application/json" \
  -H "x-api-key: 123abc" \
  -d '{
    "email": "jostan@example.com",
    "source": "PlatformA",
    "targets": ["MailerLite", "Notion"]
}'

🌐 Live Hosted URLs  
Frontend (Vercel): https://candidate-00-x-ecosystemapi.vercel.app/  
Backend (Render): https://candidate-00x-ecosystemapi-1.onrender.com

---
## 📄 License

MIT License © 2025 Jostan Mathias
