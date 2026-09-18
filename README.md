# 💡 IdeaVault — Startup Idea Sharing Platform

IdeaVault is a web-based platform where users can share innovative startup ideas, explore concepts posted by others, and engage through comments and discussions. Instead of booking or scheduling, IdeaVault focuses on **idea validation and community engagement** — helping founders discover trending ideas, gather feedback, and refine their concepts collectively.

**🔗 Live Site:** [https://your-live-site-url-here.com](https://your-live-site-url-here.com)
**🔗 Server API:** [https://your-server-url-here.com](https://your-server-url-here.com)
**🔗 Client Repository:** [GitHub — Client](https://github.com/your-username/idea-vault-client)
**🔗 Server Repository:** [GitHub — Server](https://github.com/your-username/idea-vault-server)

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Email/password and Google OAuth login powered by Better Auth, with JWT-protected private routes so refreshing the page never logs you out.
- 💡 **Idea Submission & Discovery** — Submit detailed startup ideas (category, target audience, problem statement, proposed solution) and browse all community ideas in a clean, responsive grid.
- 🔍 **Smart Search & Filtering** — Instantly search ideas by title (case-insensitive) and filter by category to find exactly what you're looking for.
- 💬 **Interactive Comment System** — Add, edit, and delete your own comments on any idea, with each comment showing the commenter's name and timestamp.
- 📊 **Trending Ideas Section** — The homepage highlights the top 6 trending ideas straight from the database, giving new visitors an instant snapshot of community activity.
- 🌗 **Dark / Light Theme Toggle** — Switch between themes from the navbar, with your preference remembered across visits.
- 📱 **Fully Responsive Design** — A consistent, polished experience across mobile, tablet, and desktop devices.
- 🗂️ **Personal Dashboards** — "My Ideas" lets you manage (update/delete) everything you've posted, while "My Interactions" tracks every idea you've commented on.

---

## 🛠️ Tech Stack

**Client**
- Next.js (App Router)
- React
- Tailwind CSS
- Better Auth (client)
- react-toastify
- lucide-react

**Server**
- Node.js + Express
- MongoDB (native driver)
- Better Auth (JWT plugin) + `jose` for token verification

---

## 🚀 Getting Started (Local Development)

### Client
```bash
git clone https://github.com/your-username/idea-vault-client.git
cd idea-vault-client
npm install
npm run dev
```

### Environment Variables (Client `.env`)
```
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_generated_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Server
```bash
git clone https://github.com/your-username/idea-vault-server.git
cd idea-vault-server
npm install
node server.js
```

### Environment Variables (Server `.env`)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
CLIENT_AUTH_URL=http://localhost:3000
```

---

## 📌 Notes

- No Lorem Ipsum placeholder text is used anywhere in the UI.
- All success/error feedback is shown via toast notifications (no default browser alerts).
- The app does not throw errors on page reload from any route, and logged-in users stay logged in across reloads.

---

## 👤 Author

Built as part of a web development assignment — CAT_01.