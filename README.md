# 🎓Course Enrollment System

A full-stack course management system with authentication, instructor and student dashboards, course creation/enrollment, and role-based access.

# Tech Stack
Frontend: React, Tailwind CSS, Next.js (App Router)

Backend: Next.js API Routes

Database: PostgreSQL + Prisma ORM

Auth: Server-side session with cookies


## 🚀 Features

- User registration & login (Student & Instructor roles)
- Instructor dashboard with:
  - Course creation
  - Course deletion
- Student dashboard with:
  - Course list
  - Enrollment functionality
- Search and view course details
- Responsive design with Tailwind CSS
- Next.js 14 App Router, Prisma, PostgreSQL

---

## 📁 Project Structure

my-app/
├── prisma/ # Prisma schema & migrations
├── public/ # Public assets
├── src/
│ ├── app/
│ │ ├── api/ # Next.js API routes
│ │ ├── dashboard/ # Student & Instructor pages
│ │ ├── components/ # Reusable components
│ │ └── page.tsx # Landing page
│ └── lib/ # Auth & database helpers
├── .env.example # Environment variable template
├── README.md
└── package.json



Install dependencies:
npm install

Create a .env file based on .env.example:

DATABASE_URL=postgresql://user:password@localhost:5432/databasedb
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

🧩 Prisma & Database Setup
Initialize the database:
npx prisma migrate dev --name init

Open Prisma Studio (optional):
npx prisma studio

🖥️ Run Commands
npm run dev

Build for Production
npm run build

🔐 Environment Variables

# .env.example
DATABASE_URL=
NEXT_PUBLIC_API_BASE_URL=

#API Routes
/api/auth/register	POST	Register user
/api/auth/login	POST	Login user
/api/instructor/courses	GET	Fetch instructor's courses
/api/instructor/courses	POST	Create new course
/api/instructor/courses/:id	DELETE	Delete course by ID
/api/courses	GET	List all courses
/api/courses/:id/enroll	POST	Enroll student in course
