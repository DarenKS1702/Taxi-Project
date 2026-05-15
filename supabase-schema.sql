-- Supabase schema for the bookings table

create extension if not exists "pgcrypto";

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  pickup_location text not null,
  dropoff_location text not null,
  pickup_time timestamptz not null,
  passengers int not null default 1,
  created_at timestamptz not null default now()
);
