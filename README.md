# 🔗 TinyLink – URL Shortener  
A lightweight, full-stack URL shortener built with **Next.js**, **NeonDB (PostgreSQL)**, and **API Routes**.  
This project was created as part of the **Take-Home Assignment: TinyLink**.

> 本项目Fork By [This Repository](https://github.com/navyatha2003/tinylink-nextjs)，主要修改了UI并增加了5秒盾防止您的域名爆炸，顺路加入了一些协议/声明。

---

## 🚀 Demo Link  
(Replace after deployment)
**https://tinylink.userhali.com**

---

## 📦 GitHub Repository  
**https://github.com/haliChina/tinylink-nextjs**

---

## 📝 Project Overview  
TinyLink is an application that allows users to:

- Create custom short URLs  
- Redirect using short codes  
- Track click counts  
- Track last-click timestamps  
- View stats for any URL  
- Delete short links  
- Manage all links via dashboard UI  

The app uses a **Neon PostgreSQL database** and provides a fully functional backend using **Next.js API routes**.

---

## 🛠️ Tech Stack

### **Frontend**
- Next.js 14
- React
- CSS (Basic styling)

### **Backend**
- Next.js API Routes
- PostgreSQL (NeonDB)
- `pg` Node library

### **Deployment**
- Vercel (Frontend + Backend)
- NeonDB (Database)

---

## 📁 Folder Structure

tinylink-nextjs/
│── pages/
│ ├── index.js # Dashboard (Create + List Links)
│ ├── [code].js # Redirect Page
│ └── code/[code].js # Stats Page
│
│── pages/api/
│ ├── healthz.js # Health Check
│ ├── links.js # GET + POST
│ └── links/[code].js # GET one link + DELETE
│
│── lib/
│ └── db.js # PostgreSQL connection
│
│── public/
│── styles/
│── .env.example
│── package.json
│── README.md

---

## 🌐 API Documentation

### **1. Health Check**
`GET /api/healthz`  
Response:
```json
{ "ok": true, "version": "1.0" }

### **2. Create Short Link**
POST /api/links
Body:
{
  "url": "https://google.com",
  "code": "google01"
}

Responses:
201 Created
409 Code exists
400 Invalid URL

### **3. Get All Links**
GET /api/links
Returns:
{
  "links": [
    {
      "code": "google01",
      "url": "https://google.com",
      "clicks": 1,
      "created_at": "...",
      "last_clicked": "..."
    }
  ]
}


### **4. Get Single Link**
GET /api/links/:code

### **5. Delete Link**
DELETE /api/links/:code

### **6. Redirect**
GET /:code
Redirects to original URL and updates click count.
```

⚙️ Environment Variables
Create a .env.local file:
DATABASE_URL=postgresql://<your-neon-db-connection-url>
NEXT_PUBLIC_BASE_URL=http://localhost:3000

🧪 Features Implemented (Assignment Checklist)
FeatureStatusCreate short URL✅Custom code✅Duplicate code → 409✅Redirect using short code✅Click count update✅Last-click timestamp✅GET all links✅GET one link✅Delete link✅Stats page✅Health check endpoint✅NeonDB connection✅
✔ All assignment requirements are completed successfully.

▶️ Run Locally
npm install
npm run dev

App runs on:
👉 http://localhost:3000/

🚀 Deployment (Vercel)
Import GitHub repo in Vercel
Add Environment Variables

Deploy
Update NEXT_PUBLIC_BASE_URL with the Vercel domain

👩🏻‍💻 Author
Navyatha S
Computer Science Engineering - Data Science (2025)

⭐ Thank you for reviewing TinyLink!
