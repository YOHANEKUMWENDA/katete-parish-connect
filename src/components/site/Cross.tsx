export function CrossIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2v20M5 8h14" />
    </svg>
  );
}

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[var(--gold)] ${className}`}>
      <span className="h-px w-12 bg-[var(--gold)] opacity-60" />
      <CrossIcon className="h-4 w-4" />
      <span className="h-px w-12 bg-[var(--gold)] opacity-60" />
    </div>
  );
}
