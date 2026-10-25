"use client";

import type { Hobby } from "@/data/hobbies";

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
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img src={hobby.img} alt={hobby.name} className="h-44 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{hobby.name}</h3>
        <p className="mt-1 text-sm text-neutral-500">{hobby.summary}</p>
        {showBookmark && (
          <button
            type="button"
            className={`mt-3 text-sm font-semibold ${saved ? "text-neutral-500" : "text-[#FF385C]"}`}
            onClick={() => onToggle(hobby.id)}
          >
            {saved ? "북마크 해제" : "북마크"}
          </button>
        )}
      </div>
    </article>
  );
}
