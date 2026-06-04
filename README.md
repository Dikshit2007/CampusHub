# CampusHub

A modern university student platform built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. CampusHub centralizes complaint reporting, lost & found, and a peer marketplace in separate **Student** and **Admin** portals.

## Features

- **Landing page** — Hero, branding, student login/signup, admin login
- **Student portal** — Dashboard, complaints (CR authorization), lost & found, marketplace
- **Admin portal** — Statistics, complaint/lost-found/marketplace management
- **Light theme only** — White background, blue accents, ERP-style UI
- **Mock data** — localStorage-backed store, ready for Supabase swap
- **Vercel ready** — Standard Next.js App Router deployment

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons

## Getting Started

```bash
cd campus-hub
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Credentials

| Role | ID | Password |
|------|-----|----------|
| Class Rep (CR) | `SIC2021001` | `crpass123` |
| Student | `SIC2021088` | `student123` |
| Admin | `ADMIN001` | `admin123` |

**Note:** `SIC2021001` and `SIC2021042` are authorized CRs and can submit complaints. Other students have view-only access to the complaint portal.

## Project Structure

```
app/                 # Routes (App Router)
components/          # UI, layout, feature modules
lib/                 # Auth, data, authorization, services
types/               # Database-aligned TypeScript types
providers/           # Session context
hooks/               # Shared hooks
```

## Future Backend Integration

Types and repositories mirror planned Supabase tables:

- `users`
- `authorized_representatives`
- `complaints`
- `lost_found`
- `marketplace`

Replace implementations in `lib/auth/` and `lib/data/` without changing UI components. Complaint submission flows through `lib/services/complaints.service.ts` for future n8n webhooks.

## Deploy on Vercel

```bash
npm run build
```

Connect the repository to Vercel — no extra configuration required.

## License

MIT
