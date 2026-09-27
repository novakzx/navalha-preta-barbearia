"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { AdminBooking } from "@/lib/supabase";

const STORAGE_KEY = "navalha_admin_pw";

const STATUS_LABEL: Record<AdminBooking["status"], string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  cancelled: "Cancelado",
  done: "Concluído",
};

function formatDateTime(date: string, time: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y} às ${time.slice(0, 5)}`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadBookings(pw: string) {
    setLoading(true);
    const { data, error } = await supabase.rpc("admin_list_bookings", {
      p_password: pw,
    });
    setLoading(false);
    if (error) {
      setAuthed(false);
      sessionStorage.removeItem(STORAGE_KEY);
      setLoginError("Senha incorreta.");
      return false;
    }
    setAuthed(true);
    setBookings((data ?? []) as AdminBooking[]);
    return true;
  }

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPassword(stored);
      loadBookings(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError("");
    const ok = await loadBookings(password);
    if (ok) sessionStorage.setItem(STORAGE_KEY, password);
  }

  async function updateStatus(id: string, status: AdminBooking["status"]) {
    const { error } = await supabase.rpc("admin_update_booking_status", {
      p_password: password,
      p_id: id,
      p_status: status,
    });
    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  }

  if (!authed) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "var(--background)" }}
      >
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm"
          style={{ background: "var(--surface-1)", padding: "40px" }}
        >
          <h1 className="font-display font-bold uppercase text-white text-xl mb-6">
            Painel Admin
          </h1>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {loginError && (
            <p className="text-xs text-red-400 mt-3">{loginError}</p>
          )}
          <button type="submit" className="btn-primary w-full mt-5" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display font-bold uppercase text-white text-2xl">
            Agendamentos
          </h1>
          <button
            className="text-xs uppercase tracking-[0.093em] text-white/50 hover:text-white"
            onClick={() => {
              sessionStorage.removeItem(STORAGE_KEY);
              setAuthed(false);
              setPassword("");
            }}
          >
            Sair
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="text-white/50 uppercase tracking-[0.08em] border-b border-white/10">
                <th className="py-3 pr-4">Cliente</th>
                <th className="py-3 pr-4">Contato</th>
                <th className="py-3 pr-4">Serviço</th>
                <th className="py-3 pr-4">Barbeiro</th>
                <th className="py-3 pr-4">Data</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-white/5 text-white/80">
                  <td className="py-3 pr-4">{b.customer_name}</td>
                  <td className="py-3 pr-4">
                    {b.customer_phone}
                    {b.customer_email ? ` · ${b.customer_email}` : ""}
                  </td>
                  <td className="py-3 pr-4">{b.service_name ?? "—"}</td>
                  <td className="py-3 pr-4">{b.barber_name ?? "Sem preferência"}</td>
                  <td className="py-3 pr-4">
                    {formatDateTime(b.requested_date, b.requested_time)}
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateStatus(b.id, e.target.value as AdminBooking["status"])
                      }
                      className="!w-auto !p-2 text-[11px]"
                    >
                      {Object.entries(STATUS_LABEL).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-white/40">
                    Nenhum agendamento ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
