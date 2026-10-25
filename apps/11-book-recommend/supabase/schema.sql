create table if not exists public.shelf_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

create table if not exists public.shelf_saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.shelf_users(id) on delete cascade,
  book_id text not null,
  created_at timestamptz default now(),
  unique (user_id, book_id)
);

alter table public.shelf_users enable row level security;
alter table public.shelf_saves enable row level security;
revoke all on public.shelf_users from anon, authenticated;
revoke all on public.shelf_saves from anon, authenticated;
grant all on public.shelf_users to service_role;
grant all on public.shelf_saves to service_role;
