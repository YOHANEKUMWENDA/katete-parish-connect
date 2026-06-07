export function AnnouncementBar() {
  return (
    <div className="bg-[var(--navy-deep)] text-[var(--cream)] text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-2 flex items-center justify-center gap-2 text-center">
        <span className="text-[var(--gold)]">✦</span>
        <span>Next Sunday Mass at <strong className="text-[var(--gold)]">8:00 AM</strong> — All are welcome!</span>
      </div>
    </div>
  );
}
