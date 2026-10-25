"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CATEGORIES, HOBBIES, type Category } from "@/data/hobbies";

export default function CategoryPage() {
  const params = useParams<{ type: string }>();
  const type = params.type as Category;
  const label = CATEGORIES.find((c) => c.key === type)?.label || type;
  const items = HOBBIES.filter((h) => h.category === type);
  const [marks, setMarks] = useState<string[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(localStorage.getItem("hobbyfind-user"));
    setMarks(JSON.parse(localStorage.getItem("hobbyfind-marks") || "[]"));
  }, []);

  function toggle(id: string) {
    if (!user) {
      location.href = "/login";
      return;
    }
    setMarks((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("hobbyfind-marks", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link href="/" className="font-bold text-rose-600">HobbyFind</Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">
        <p className="text-sm text-rose-500">카테고리</p>
        <h1 className="text-3xl font-bold">{label}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((h) => (
            <article key={h.id} className="overflow-hidden rounded-2xl border">
              <img src={h.img} alt="" className="h-44 w-full object-cover" />
              <div className="p-5">
              <h2 className="text-lg font-semibold">{h.name}</h2>
              <p className="mt-2 text-sm text-neutral-500">{h.summary}</p>
              <button className="mt-4 text-sm font-semibold text-rose-600" onClick={() => toggle(h.id)}>
                {marks.includes(h.id) ? "북마크 해제" : "북마크"}
              </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
