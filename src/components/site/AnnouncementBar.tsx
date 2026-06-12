import { useEffect, useState } from "react";
import { fetchAnnouncement } from "@/lib/api";

export function AnnouncementBar() {
  const [text, setText] = useState("Next Sunday Mass at 8:00 AM — All are welcome!");

  useEffect(() => {
    fetchAnnouncement().then(setText);
  }, []);

  return (
    <div className="bg-[var(--navy-deep)] text-[var(--cream)] text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-2 flex items-center justify-center gap-2 text-center">
        <span className="text-[var(--gold)]">✦</span>
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
}