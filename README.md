# 📚 NoteVault — College Notes Portal

A full-stack **MERN** app where students can browse and download college notes,
past papers, assignments, and reference books — organised by **branch → year → semester → subject**.

---

## 🏗️ Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18 + Vite + Tailwind CSS                  |
| Backend    | Node.js + Express.js                            |
| Database   | MongoDB (Atlas)                                 |
| File Store | Cloudinary (PDF upload/delivery)                |
| Auth       | JWT (admin-only)                                |

---

## 📁 Project Structure

```
college-notes-portal/
├── backend/
│   ├── controllers/      authController.js, noteController.js
│   ├── middleware/        auth.js, upload.js
│   ├── models/            User.js, Note.js
│   ├── routes/            auth.js, notes.js, branches.js
│   ├── .env.example
│   └── server.js
└── frontend/
    └── src/
        ├── components/    Navbar, NoteCard, FilterBar, Pagination
        ├── context/        AuthContext
        ├── pages/          Home, Browse, NoteDetail, Login, AdminDashboard, UploadNote
        └── utils/          api.js, constants.js
```

---

## ⚙️ Setup Instructions

### 1. Clone & install

```bash
git clone <your-repo>

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Cloudinary keys
```

Required `.env` values:
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `ADMIN_EMAIL` + `ADMIN_PASSWORD` — credentials to seed the first admin

### 3. Seed the admin account

Start the backend, then run once:
```bash
curl -X POST http://localhost:5000/api/auth/create-admin
```
> After seeding, you can optionally remove the `/create-admin` route for security.

### 4. Run in development

```bash
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

Frontend → http://localhost:5173  
Backend  → http://localhost:5000

---

## 🌐 API Reference

### Notes
| Method | Endpoint                       | Auth  | Description               |
|--------|--------------------------------|-------|---------------------------|
| GET    | /api/notes                     | —     | List notes (with filters) |
| GET    | /api/notes/:id                 | —     | Get single note           |
| GET    | /api/notes/subjects            | —     | Distinct subject list     |
| PATCH  | /api/notes/:id/download        | —     | Increment download count  |
| POST   | /api/notes                     | Admin | Upload a new note (PDF)   |
| PUT    | /api/notes/:id                 | Admin | Edit note metadata        |
| DELETE | /api/notes/:id                 | Admin | Delete note + file        |

**Query params for GET /api/notes:**
`branch`, `year`, `semester`, `subject`, `type`, `search`, `page`, `limit`

### Auth
| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| POST   | /api/auth/login        | Admin login → JWT    |
| GET    | /api/auth/me           | Get current user     |
| POST   | /api/auth/create-admin | Seed first admin     |

---

## 🚀 Production Deployment

### Backend (Railway / Render / VPS)
1. Set all environment variables in the platform dashboard
2. Set `CLIENT_URL` to your Vercel/Netlify frontend URL
3. `npm start`

### Frontend (Vercel / Netlify)
1. Set `VITE_API_URL` if not using Vite's proxy
2. `npm run build` → deploy `dist/` folder

---

## 🔮 Future Enhancements

- [ ] Google OAuth for students (view history)
- [ ] Note ratings & comments
- [ ] WhatsApp / Telegram bot integration
- [ ] PWA for offline access
- [ ] Bulk upload via ZIP
- [ ] Analytics dashboard (most downloaded subjects)
- [ ] Email notifications for new uploads

---

## 📄 Branches Supported

CSE · CSE-AI · CSE-DS · CSE-IoT · ECE · EE · MECH · CIVIL · IT
