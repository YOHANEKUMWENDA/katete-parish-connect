import { uploadBulletin } from "@/lib/api";
import { FileUp } from "lucide-react";
import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  isLoggedIn, adminLogout,
  fetchAllEvents, createEvent, updateEvent, deleteEvent,
  fetchMessages, markMessageRead, deleteMessage,
  fetchAnnouncement, updateAnnouncement,
  fetchPrayerRequests, markPrayerRead,
} from "@/lib/api";
import { Calendar, Mail, Trash2, Edit, Plus, LogOut, CheckCircle, Eye, Megaphone, HandHeart } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !localStorage.getItem("admin_token")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminDashboard,
});

interface Event {
  id: number; title: string; description: string;
  event_date: string; location: string; category: string; is_published: boolean;
}
interface Message {
  id: number; name: string; email: string;
  subject: string; message: string; is_read: boolean; received_at: string;
}
interface PrayerRequest {
  id: number; name: string | null; request: string;
  is_anonymous: boolean; is_read: boolean; submitted_at: string;
}

const emptyEvent = {
  title: "", description: "", event_date: "", location: "", category: "", is_published: true,
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");
  const [bulletinUploading, setBulletinUploading] = useState(false);
  const [tab, setTab] = useState<"events" | "messages" | "announcement" | "prayers">("events");
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [announcementSaving, setAnnouncementSaving] = useState(false);
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [prayersLoading, setPrayersLoading] = useState(true);
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerRequest | null>(null);

  useEffect(() => {
    setAdminName(localStorage.getItem("admin_name") || "Admin");
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) { navigate({ to: "/admin/login" }); return; }
    loadEvents();
    loadMessages();
    loadPrayers();
    fetchAnnouncement().then(setAnnouncement);
  }, []);

  async function handleBulletinUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBulletinUploading(true);
    try {
      await uploadBulletin(file);
      alert("Bulletin uploaded successfully!");
    } catch {
      alert("Failed to upload bulletin.");
    } finally {
      setBulletinUploading(false);
    }
  }

  async function loadEvents() {
    setEventsLoading(true);
    try { setEvents(await fetchAllEvents()); } catch {}
    finally { setEventsLoading(false); }
  }

  async function loadMessages() {
    setMessagesLoading(true);
    try { setMessages(await fetchMessages()); } catch {}
    finally { setMessagesLoading(false); }
  }

  async function loadPrayers() {
    setPrayersLoading(true);
    try { setPrayers(await fetchPrayerRequests()); } catch {}
    finally { setPrayersLoading(false); }
  }

  async function handleSaveAnnouncement() {
    setAnnouncementSaving(true);
    try {
      await updateAnnouncement(announcement);
      alert("Announcement updated!");
    } catch {
      alert("Failed to update announcement.");
    } finally {
      setAnnouncementSaving(false);
    }
  }

  function handleLogout() {
    adminLogout();
    navigate({ to: "/admin/login" });
  }

  function openCreate() {
    setEditingEvent(null);
    setForm(emptyEvent);
    setShowForm(true);
  }

  function openEdit(e: Event) {
    setEditingEvent(e);
    setForm({
      title: e.title, description: e.description || "",
      event_date: e.event_date.slice(0, 16),
      location: e.location || "", category: e.category || "",
      is_published: e.is_published,
    });
    setShowForm(true);
  }

  async function handleSaveEvent(ev: React.FormEvent) {
    ev.preventDefault();
    try {
      if (editingEvent) { await updateEvent(editingEvent.id, form); }
      else { await createEvent(form); }
      setShowForm(false);
      loadEvents();
    } catch { alert("Failed to save event."); }
  }

  async function handleDeleteEvent(id: number) {
    if (!confirm("Delete this event?")) return;
    await deleteEvent(id);
    loadEvents();
  }

  async function handleMarkRead(id: number) {
    await markMessageRead(id);
    loadMessages();
    if (selectedMsg?.id === id) setSelectedMsg({ ...selectedMsg, is_read: true });
  }

  async function handleDeleteMessage(id: number) {
    if (!confirm("Delete this message?")) return;
    await deleteMessage(id);
    setSelectedMsg(null);
    loadMessages();
  }

  async function handleMarkPrayerRead(id: number) {
    await markPrayerRead(id);
    loadPrayers();
    if (selectedPrayer?.id === id) setSelectedPrayer({ ...selectedPrayer, is_read: true });
  }

  const unread = messages.filter(m => !m.is_read).length;
  const unreadPrayers = prayers.filter(p => !p.is_read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[var(--navy)] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[var(--gold)] text-xl">✝</span>
          <div>
            <p className="font-serif text-lg">St. Thereza Admin</p>
            <p className="text-xs text-gray-300">Welcome, {adminName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-xs text-gray-300 hover:text-white">View Site →</a>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6">
          {[
            { key: "events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
            { key: "messages", label: `Messages${unread > 0 ? ` (${unread})` : ""}`, icon: <Mail className="h-4 w-4" /> },
            { key: "prayers", label: `Prayers${unreadPrayers > 0 ? ` (${unreadPrayers})` : ""}`, icon: <HandHeart className="h-4 w-4" /> },
            { key: "announcement", label: "Announcement", icon: <Megaphone className="h-4 w-4" /> },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as "events" | "messages" | "announcement" | "prayers")}
              className={`flex items-center gap-2 py-4 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.key
                  ? "border-[var(--gold)] text-[var(--navy-deep)]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* ── EVENTS TAB ── */}
        {tab === "events" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Manage Events</h2>
              <button onClick={openCreate} className="flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
                <Plus className="h-4 w-4" /> New Event
              </button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
                  <h3 className="font-serif text-xl text-[var(--navy-deep)] mb-4">
                    {editingEvent ? "Edit Event" : "Create New Event"}
                  </h3>
                  <form onSubmit={handleSaveEvent} className="space-y-4">
                    <input required placeholder="Event Title" value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm" />
                    <textarea placeholder="Description" value={form.description} rows={3}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm" />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-600">Date & Time</label>
                        <input required type="datetime-local" value={form.event_date}
                          onChange={e => setForm({ ...form, event_date: e.target.value })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600">Category</label>
                        <select value={form.category}
                          onChange={e => setForm({ ...form, category: e.target.value })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm">
                          <option value="">Select category</option>
                          {["Mass", "Youth", "Outreach", "Meeting", "Retreat", "Other"].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <input placeholder="Location" value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm" />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={form.is_published}
                        onChange={e => setForm({ ...form, is_published: e.target.checked })} />
                      Publish (visible on website)
                    </label>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" className="flex-1 rounded-full bg-[var(--navy)] py-2 text-sm font-semibold text-white hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
                        {editingEvent ? "Save Changes" : "Create Event"}
                      </button>
                      <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {eventsLoading ? (
              <p className="text-gray-500">Loading events…</p>
            ) : events.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No events yet. Create your first one!</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Title</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Date</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Category</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {events.map(e => (
                      <tr key={e.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[var(--navy-deep)]">{e.title}</td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(e.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-6 py-4">
                          {e.category && <span className="rounded-full bg-[var(--navy)] text-[var(--gold)] px-2 py-0.5 text-xs">{e.category}</span>}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${e.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {e.is_published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <button onClick={() => openEdit(e)} className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDeleteEvent(e.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {tab === "messages" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl text-[var(--navy-deep)] mb-4">Inbox</h2>
              {messagesLoading ? (
                <p className="text-gray-500">Loading messages…</p>
              ) : messages.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No messages yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map(m => (
                    <div key={m.id}
                      onClick={() => { setSelectedMsg(m); if (!m.is_read) handleMarkRead(m.id); }}
                      className={`rounded-xl p-4 cursor-pointer border transition-all ${
                        selectedMsg?.id === m.id ? "border-[var(--gold)] bg-amber-50"
                        : m.is_read ? "border-gray-200 bg-white hover:bg-gray-50"
                        : "border-blue-200 bg-blue-50 hover:bg-blue-100"
                      }`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className={`text-sm truncate ${!m.is_read ? "font-bold text-[var(--navy-deep)]" : "font-medium text-gray-700"}`}>{m.name}</p>
                          <p className="text-xs text-gray-500 truncate">{m.subject || "No subject"}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!m.is_read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                          <span className="text-xs text-gray-400">
                            {new Date(m.received_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              {selectedMsg ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[var(--navy-deep)]">{selectedMsg.subject || "No subject"}</h3>
                      <p className="text-sm text-gray-500">From: {selectedMsg.name} &lt;{selectedMsg.email}&gt;</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(selectedMsg.received_at).toLocaleString("en-GB")}</p>
                    </div>
                    <div className="flex gap-2">
                      {!selectedMsg.is_read && (
                        <button onClick={() => handleMarkRead(selectedMsg.id)} className="p-1.5 rounded-md hover:bg-green-50 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button onClick={() => handleDeleteMessage(selectedMsg.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMsg.message}</p>
                  </div>
                  <a href={`mailto:${selectedMsg.email}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors">
                    <Mail className="h-4 w-4" /> Reply via Email
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Eye className="h-10 w-10 mb-2 opacity-30" />
                  <p className="text-sm">Select a message to read it</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PRAYERS TAB ── */}
        {tab === "prayers" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl text-[var(--navy-deep)] mb-4">Prayer Requests</h2>
              {prayersLoading ? (
                <p className="text-gray-500">Loading prayer requests…</p>
              ) : prayers.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <HandHeart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No prayer requests yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {prayers.map(p => (
                    <div key={p.id}
                      onClick={() => { setSelectedPrayer(p); if (!p.is_read) handleMarkPrayerRead(p.id); }}
                      className={`rounded-xl p-4 cursor-pointer border transition-all ${
                        selectedPrayer?.id === p.id ? "border-[var(--gold)] bg-amber-50"
                        : p.is_read ? "border-gray-200 bg-white hover:bg-gray-50"
                        : "border-blue-200 bg-blue-50 hover:bg-blue-100"
                      }`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className={`text-sm truncate ${!p.is_read ? "font-bold text-[var(--navy-deep)]" : "font-medium text-gray-700"}`}>
                            {p.is_anonymous ? "Anonymous" : p.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{p.request}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!p.is_read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                          <span className="text-xs text-gray-400">
                            {new Date(p.submitted_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              {selectedPrayer ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[var(--navy-deep)]">
                        {selectedPrayer.is_anonymous ? "Anonymous Request" : selectedPrayer.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{new Date(selectedPrayer.submitted_at).toLocaleString("en-GB")}</p>
                    </div>
                    {!selectedPrayer.is_read && (
                      <button onClick={() => handleMarkPrayerRead(selectedPrayer.id)} className="p-1.5 rounded-md hover:bg-green-50 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedPrayer.request}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Eye className="h-10 w-10 mb-2 opacity-30" />
                  <p className="text-sm">Select a request to read it</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ANNOUNCEMENT TAB ── */}
        {tab === "announcement" && (
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl text-[var(--navy-deep)] mb-2">Announcement Bar</h2>
            <p className="text-sm text-gray-500 mb-4">This text appears at the top of every page on the public site.</p>
            <textarea rows={3} value={announcement}
              onChange={e => setAnnouncement(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm"
              placeholder="e.g. Next Sunday Mass at 8:00 AM — All are welcome!" />
            <button onClick={handleSaveAnnouncement} disabled={announcementSaving}
              className="mt-3 rounded-full bg-[var(--navy)] px-6 py-2 text-sm font-semibold text-white hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors disabled:opacity-60">
              {announcementSaving ? "Saving…" : "Save Announcement"}
            </button>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="font-serif text-xl text-[var(--navy-deep)] mb-2">Parish Bulletin</h3>
              <p className="text-sm text-gray-500 mb-4">Upload this week's bulletin PDF. It will be available for download on the public site.</p>
              <label className={`inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold cursor-pointer transition-colors ${
                bulletinUploading
                  ? "bg-gray-300 text-gray-500"
                  : "bg-[var(--navy)] text-white hover:bg-[var(--gold)] hover:text-[var(--navy-deep)]"
              }`}>
                <FileUp className="h-4 w-4" />
                {bulletinUploading ? "Uploading…" : "Upload PDF"}
                <input type="file" accept=".pdf" className="hidden" onChange={handleBulletinUpload} disabled={bulletinUploading} />
              </label>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}