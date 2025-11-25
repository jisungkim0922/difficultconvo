
-- run this in Supabase SQL editor once if not created
create table if not exists posts (
  id bigserial primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  cover_url text,
  created_at timestamp with time zone default now()
);

