
 Implementation Overview

 Tech Stack

- Next.js (pages router) with React and TypeScript
- Tailwind CSS for styling
- Supabase for database and authentication helpers
- React Query for client data fetching and caching
- Axios for API requests

 Project Structure

- `src/pages`: App routes and API routes
- `src/components`: Reusable UI components (booking forms, cards, animations)
- `src/admin`: Admin UI components (dashboard, calendar, stats)
- `src/lib`: Data access, helpers, validators, and mock data
- `public`: Static assets
- `docs`: API and deployment references

 Core Features

 Public Booking Flow

- Users can browse rooms and check availability.
- The booking form validates input and formats dates and currency.
- Booking data is submitted to internal API routes under `src/pages/api`.

 Admin Dashboard

- Admin routes are separated under `src/pages/admin`.
- Admin components live in `src/admin` for clarity and isolation.
- The dashboard shows booking stats and supports room management workflows.

 Payments

- Payment integrations are implemented as API routes under `src/pages/api/payments`.
- The client submits booking data, then the API handles provider requests and verification.

 Data Layer

- Database access and helpers are in `src/lib` (Supabase client, validators, constants).
- Schema references live in `docs` for review and migration planning.

 Implementation Notes

 API Design

- API routes are grouped by resource: `bookings`, `rooms`, `conference`, `admin`.
- Each route validates payloads and returns consistent JSON responses.

 Validation

- Request validation uses shared validators in `src/lib/validators.ts`.
- Client forms mirror server-side rules to reduce invalid submissions.

 UI/UX

- Reusable components handle consistent layout, animations, and empty states.
- The booking flow aims to minimize steps and clarify pricing.

 Running the App

 Standard Dev Server

```
npm run dev
```

 Admin Dev Server (alternate port)

To avoid Next.js lock conflicts when running two dev servers, the admin server uses a separate dist directory.

```
npm run dev:admin:alt
```

This script sets `NEXT_DIST_DIR=.next-admin` and runs on port 3002.

 What I Would Improve Next

- Add integration tests for booking + payment verification.
- Expand admin role management and audit logs.
- Add more robust error telemetry for API routes.

