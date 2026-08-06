<div align="center">
  <img src="./frontend/src/app/icon.png" alt="Vow Logo" width="120" />
  <h1>Vow</h1>
  <p><strong>Personal Accountability & Productivity App</strong></p>
  <p>Schedule your day, track your work, and face your report card honestly.</p>
</div>

---

## 📖 About Vow

**Vow** (formerly Activity Assistant) is a premium productivity web application built to help you manage tasks, recurring habits, and reminders from one clean, mobile-friendly dashboard. 

Unlike standard to-do lists, Vow emphasizes **personal accountability** by offering end-of-day feedback and performance reports based on the excuses you reject and the effort you put in.

## ✨ Key Features

- 🎯 **Task & Priority Management**: Create tasks, assign priorities (High, Medium, Low), and set precise deadlines.
- 🔁 **Habit Tracking**: Build routines by configuring recurring habits with specific target days (e.g., Mon, Wed, Fri).
- 📊 **Daily Report Cards**: Generate honest performance snapshots and end-of-day reviews.
- 🔔 **Push Notifications**: Full PWA readiness with integrated Web-Push notifications for reminders.
- 🎨 **Premium Theming Engine**: Dynamically toggle between gorgeous Dark/Light modes and personalize the UI with vibrant color palettes (Red, Blue, Green).
- 📱 **Mobile-First & PWA**: Designed with a sleek bottom-navigation layout for mobile devices, fully installable as a Progressive Web App.

## 🛠️ Technology Stack

**Frontend**
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom CSS variable-based dynamic theming
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`ThemeContext`, `AuthContext`)

**Backend**
- **Runtime**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Tokens)
- **Notifications**: `web-push` for browser push notifications

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL running locally or via a cloud provider

### 1. Backend Setup
Navigate to the backend directory, install dependencies, and configure your database.

```bash
cd backend
npm install
```

**Environment Variables**
Create a `.env` file in the `/backend` directory based on this template:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/habitmakerDB?schema=public"
JWT_SECRET="your_super_secret_jwt_key"
VAPID_PUBLIC_KEY="your_vapid_public_key"
VAPID_PRIVATE_KEY="your_vapid_private_key"
```
*(Tip: You can generate VAPID keys using `npx web-push generate-vapid-keys`)*

**Database Push & Run**
```bash
npx prisma generate
npx prisma db push
npm start
```
*The backend should now be running on `http://localhost:5000`.*

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, and start the Next.js development server.

```bash
cd frontend
npm install
```

**Environment Variables**
Create a `.env.local` file in the `/frontend` directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_VAPID_PUBLIC_KEY="your_vapid_public_key"
```

**Run Development Server**
```bash
npm run dev
```
*Access the application at `http://localhost:3000`.*

## 📂 Project Structure

```
Vow/
├── backend/
│   ├── prisma/             # Database schema (schema.prisma)
│   ├── src/
│   │   ├── controllers/    # Route logic (auth, tasks, habits)
│   │   ├── middleware/     # JWT Auth guards
│   │   ├── routes/         # Express API routes
│   │   └── server.js       # Entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/            # Next.js App Router (Pages & Layouts)
    │   ├── components/     # UI Components (Sidebar, Cards, Inputs)
    │   ├── context/        # Global Providers (Auth, Theme)
    │   ├── hooks/          # Custom React Hooks
    │   └── lib/            # Utilities (API wrapper, formatters)
    ├── public/             # Static assets & manifest.json
    ├── tailwind.config.ts  # Tailwind theme configuration
    └── package.json
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](../../issues) if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
