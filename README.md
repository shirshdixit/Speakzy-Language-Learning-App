# Speakzy

Speakzy is a Duolingo-inspired language learning app built with Next.js. It lets users choose a language, work through structured lessons, answer interactive challenges, earn points, manage hearts, track quests, and unlock a Pro experience through Stripe subscriptions.

## Features

- Language courses for Spanish, Japanese, French, Croatian, and Italian
- Unit and lesson based learning flow
- Interactive challenge types, including select and assist questions
- Audio prompts, illustrated answer options, and completion feedback
- Hearts, points, quests, and leaderboard progression
- Clerk authentication with protected learning routes
- Stripe-powered subscription support for Pro users
- Admin dashboard for managing courses, units, lessons, challenges, and options
- PostgreSQL database access through Drizzle ORM

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Clerk
- Drizzle ORM
- PostgreSQL / Neon
- Stripe
- React Admin
- Zustand

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- PostgreSQL database, such as Neon
- Clerk application
- Stripe account for subscription and webhook support

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
STRIPE_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=
```

### Database Setup

Push the Drizzle schema to your database:

```bash
npm run db:push
```

Seed the database with starter course content:

```bash
npm run db:seed
```

Open Drizzle Studio when you want to inspect or edit database records:

```bash
npm run db:studio
```

### Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev        # Start the Next.js development server
npm run build      # Create a production build
npm run start      # Start the production server
npm run lint       # Run linting
npm run db:push    # Push Drizzle schema changes
npm run db:seed    # Seed starter content
npm run db:studio  # Open Drizzle Studio
npm run db:prod    # Run the production database script
```

## Project Structure

```text
app/            Next.js routes, layouts, API handlers, lessons, admin, and main app pages
actions/        Server actions for progress, hearts, and subscriptions
components/     Shared UI, navigation, progress, quests, and modals
db/             Drizzle schema, queries, and database client
public/         Images, flags, mascot assets, and audio files
scripts/        Database seed and production scripts
store/          Zustand modal state
```

## Main Routes

- `/` - Marketing page with sign in and sign up actions
- `/learn` - Active course units and lessons
- `/courses` - Course selection
- `/lesson` and `/lesson/[lessonId]` - Lesson quiz flow
- `/leaderboard` - User ranking by points
- `/quests` - XP goals
- `/shop` - Hearts refill and Pro promotion
- `/admin` - Admin dashboard for learning content

## Deployment Notes

Set the same environment variables in your hosting provider before deploying. For Stripe subscriptions, configure the webhook endpoint at:

```text
/api/webhooks/stripe
```

Use `NEXT_PUBLIC_APP_URL` for the deployed application URL so checkout and redirects resolve correctly.
