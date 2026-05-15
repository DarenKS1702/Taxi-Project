# Taxi Booking Website

A mobile-responsive React + Tailwind CSS taxi booking website with:

- Hero section with `Book Now` CTA and reviews
- Booking form that saves data to Supabase `bookings` table
- Google Maps display with Apple Maps directions link
- `.ics` calendar file generation upon confirmation

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in your Supabase and Google Maps credentials.
3. Install dependencies:

```bash
npm install
```

4. Run locally:

```bash
npm run dev
```

## Supabase schema

Use the SQL in `supabase-schema.sql` to create the `bookings` table.

## Notes

- The map uses the Google Maps JavaScript API and requires `VITE_GOOGLE_MAPS_KEY`.
- Booking form data is stored in local storage while editing.
- After a successful booking, an `.ics` file is downloaded automatically.
