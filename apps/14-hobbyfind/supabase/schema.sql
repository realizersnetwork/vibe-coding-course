-- HobbyFind intermediate
create table if not exists public.profiles (
  id uuid primary key default auth.uid(),
  email text,
  created_at timestamptz default now()
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hobby_id text not null,
  category text not null check (category in ('sports','intelligence','art')),
  created_at timestamptz default now(),
  unique (user_id, hobby_id)
);

alter table public.profiles enable row level security;
alter table public.bookmarks enable row level security;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own bookmarks" on public.bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
