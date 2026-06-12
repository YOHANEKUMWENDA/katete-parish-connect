// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getToken() {
  return localStorage.getItem("admin_token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// ── Auth ───────────────────────────────────────────────
export async function adminLogin(email: string, password: string) {
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error("Invalid email or password");
  const data = await res.json();
  localStorage.setItem("admin_token", data.access_token);
  localStorage.setItem("admin_name", data.name);
  return data;
}

export function adminLogout() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_name");
}

export function isLoggedIn() {
  return !!getToken();
}

// ── Events (public) ────────────────────────────────────
export async function fetchPublicEvents() {
  const res = await fetch(`${API_URL}/events/`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

// ── Events (admin) ─────────────────────────────────────
export async function fetchAllEvents() {
  const res = await fetch(`${API_URL}/events/all`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function createEvent(data: object) {
  const res = await fetch(`${API_URL}/events/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

export async function updateEvent(id: number, data: object) {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update event");
  return res.json();
}

export async function deleteEvent(id: number) {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete event");
  return res.json();
}

// ── Messages ───────────────────────────────────────────
export async function sendMessage(data: object) {
  const res = await fetch(`${API_URL}/messages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export async function fetchMessages() {
  const res = await fetch(`${API_URL}/messages/`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function markMessageRead(id: number) {
  const res = await fetch(`${API_URL}/messages/${id}/read`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to mark as read");
  return res.json();
}

export async function deleteMessage(id: number) {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete message");
  return res.json();
}
