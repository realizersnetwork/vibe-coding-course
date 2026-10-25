"use client";

import type { Hobby } from "@/data/hobbies";
import { CATEGORIES } from "@/data/hobbies";

export default function HobbyCard({
  hobby,
  saved,
  onToggle,
  showBookmark,
}: {
  hobby: Hobby;
  saved: boolean;
  onToggle: (id: string) => void;
  showBookmark: boolean;
}) {
  const label = CATEGORIES.find((c) => c.key === hobby.category)?.label;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img src={hobby.img} alt={hobby.name} className="h-56 w-full object-cover" />
        {showBookmark && (
          <button
            type="button"
            aria-label={saved ? "북마크 해제" : "북마크"}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg shadow"
            onClick={() => onToggle(hobby.id)}
          >
            {saved ? "♥" : "♡"}
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-[#FF385C]">{label}</p>
        <h3 className="mt-1 text-lg font-semibold text-[#222222]">{hobby.name}</h3>
        <p className="mt-1 text-sm leading-6 text-[#737373]">{hobby.summary}</p>
      </div>
    </article>
  );
}
