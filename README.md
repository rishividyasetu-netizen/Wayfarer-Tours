# Wayfarer Tours

A Next.js App Router starter for domestic, inbound, and outbound small-group journeys.

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Install dependencies:

```bash
npm install
```

4. Generate and push the Prisma schema:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`. The admin preview is at `/admin`.

## Included

- Responsive Wayfarer travel storefront with domestic, inbound, and outbound filters
- Placeholder trips using remote Unsplash imagery
- Trip detail and booking-request modal with date and traveler selection
- `GET /api/tours` and `POST /api/bookings` route foundations
- Prisma models for tours, users, bookings, reviews, roles, statuses, and currencies
- Admin overview page with booking and revenue summary cards

Stripe/Razorpay checkout, NextAuth credentials/Google login, protected admin actions, and production payment webhooks are represented in the project dependencies/config placeholders and are the next integration layer.
