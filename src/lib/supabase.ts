import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Service = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  duration_minutes: number;
  sort_order: number;
};

export type Barber = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
};

export type AdminBooking = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  service_name: string | null;
  barber_name: string | null;
  requested_date: string;
  requested_time: string;
  notes: string | null;
  status: "pending" | "confirmed" | "cancelled" | "done";
  created_at: string;
};
