-- Cada vez que Amira abre WhatsApp desde el panel queda registrado a quien y por
-- que. Registra que se abrio el chat, no que el mensaje se envio.
-- Solo la cuenta de Amira puede leer y escribir. Aplicada el 12/10/2026.
create table if not exists contactos (
  id bigint generated always as identity primary key,
  alumna_id bigint not null references alumnas(id) on delete cascade,
  motivo text not null default 'otro',
  created_at timestamptz not null default now()
);
create index if not exists contactos_alumna_fecha on contactos (alumna_id, created_at desc);
alter table contactos enable row level security;
create policy contactos_admin on contactos for all
  using (auth.email() = 'amiralezcano@gmail.com')
  with check (auth.email() = 'amiralezcano@gmail.com');
