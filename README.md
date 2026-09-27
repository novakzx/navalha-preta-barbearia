# Navalha Preta Barbearia

Site institucional e sistema de agendamento para a barbearia Navalha Preta.
Feito com Next.js (App Router), Tailwind CSS e Supabase.

**Produção:** https://navalha-preta-barbearia.vercel.app

## Funcionalidades

- Landing page em tema escuro com fotos reais, serviços, equipe e galeria
- Formulário público de agendamento (`/`) que grava direto no Supabase
- Painel administrativo protegido por senha (`/admin`) para ver e atualizar
  o status dos agendamentos (pendente / confirmado / cancelado / concluído)

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- Supabase (Postgres + RPC com `SECURITY DEFINER` para o admin)
- Vercel (deploy)

## Rodando localmente

```bash
npm install
cp .env.example .env.local # preencha com as chaves do seu projeto Supabase
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima (publishable) do Supabase |

## Banco de dados

Tabelas: `services`, `barbers`, `bookings`, `admin_config`.
O acesso do painel admin é feito via RPCs (`admin_list_bookings`,
`admin_update_booking_status`) protegidas por senha com hash bcrypt
(pgcrypto), sem expor a service role key no cliente.

## Painel admin

Acesse `/admin` e entre com a senha do administrador (gerada na criação
do projeto — peça para quem configurou o site caso não a tenha).
