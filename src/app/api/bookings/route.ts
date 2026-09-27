import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}(:\d{2})?$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const customerName = String(body.customer_name || "").trim();
  const customerPhone = String(body.customer_phone || "").trim();
  const customerEmail = String(body.customer_email || "").trim();
  const serviceId = String(body.service_id || "").trim();
  const barberId = String(body.barber_id || "").trim();
  const requestedDate = String(body.requested_date || "").trim();
  const requestedTime = String(body.requested_time || "").trim();
  const notes = String(body.notes || "").trim();

  if (!customerName || customerName.length > 120) {
    return NextResponse.json({ error: "Nome inválido." }, { status: 400 });
  }
  if (!customerPhone || customerPhone.length > 30) {
    return NextResponse.json({ error: "Telefone inválido." }, { status: 400 });
  }
  if (!UUID_RE.test(serviceId)) {
    return NextResponse.json({ error: "Serviço inválido." }, { status: 400 });
  }
  if (barberId && !UUID_RE.test(barberId)) {
    return NextResponse.json({ error: "Barbeiro inválido." }, { status: 400 });
  }
  if (!DATE_RE.test(requestedDate)) {
    return NextResponse.json({ error: "Data inválida." }, { status: 400 });
  }
  if (!TIME_RE.test(requestedTime)) {
    return NextResponse.json({ error: "Horário inválido." }, { status: 400 });
  }
  if (customerEmail && customerEmail.length > 160) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const { error } = await supabase.from("bookings").insert({
    customer_name: customerName,
    customer_phone: customerPhone,
    customer_email: customerEmail || null,
    service_id: serviceId,
    barber_id: barberId || null,
    requested_date: requestedDate,
    requested_time: requestedTime,
    notes: notes || null,
  });

  if (error) {
    return NextResponse.json({ error: "Não foi possível salvar o agendamento." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
