import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { adminLogin } from "@/lib/api";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // no useEffect needed anymore

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminLogin(email, password);
      navigate({ to: "/admin/dashboard" });
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  // ... rest of JSX stays the same

  return (
    <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--navy)] mb-4">
            <span className="text-[var(--gold)] text-2xl">✝</span>
          </div>
          <h1 className="font-serif text-3xl text-[var(--navy-deep)]">Admin Portal</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">St. Thereza Catholic Church</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-[var(--shadow-elegant)] p-8 space-y-5 border border-[var(--border)]"
        >
          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">{error}</p>
          )}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[var(--navy-deep)]">Email Address</label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@email.com"
              autoComplete="username"
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[var(--navy-deep)]">Password</label>
            <input
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-md border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full rounded-full bg-[var(--navy)] py-3 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-xs text-[var(--muted-foreground)] mt-6">
          <a href="/" className="hover:text-[var(--gold)] transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}