-- HobbyFind 중급: NextAuth 사용자 + 북마크
create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text,
  provider text not null default 'credentials',
  created_at timestamptz default now()
);

alter table public.app_users alter column password_hash drop not null;
alter table public.app_users add column if not exists provider text not null default 'credentials';

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  hobby_id text not null,
  category text not null check (category in ('sports','intelligence','art')),
  created_at timestamptz default now(),
  unique (user_id, hobby_id)
);

alter table public.app_users enable row level security;
alter table public.bookmarks enable row level security;

-- 서버(service_role)만 접근. anon 직접 접근 차단
revoke all on public.app_users from anon, authenticated;
revoke all on public.bookmarks from anon, authenticated;
grant all on public.app_users to service_role;
grant all on public.bookmarks to service_role;
