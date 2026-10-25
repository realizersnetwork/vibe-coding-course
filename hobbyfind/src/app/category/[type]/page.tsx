"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CATEGORIES, HOBBIES, type Category } from "@/data/hobbies";
import TopBar from "@/components/TopBar";
import HobbyCard from "@/components/HobbyCard";

export default function CategoryPage() {
  const params = useParams<{ type: string }>();
  const type = params.type as Category;
  const cat = CATEGORIES.find((c) => c.key === type);
  const items = HOBBIES.filter((h) => h.category === type);
  const { status } = useSession();
  const loggedIn = status === "authenticated";
  const [marks, setMarks] = useState<string[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!loggedIn) return;
    fetch("/api/bookmarks")
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "불러오기 실패");
        setMarks(j.ids || []);
      })
      .catch((e) => setErr(e.message));
  }, [loggedIn]);

  async function toggle(id: string) {
    if (!loggedIn) {
      location.href = "/login";
      return;
    }
    const res = await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hobbyId: id }),
    });
    const j = await res.json();
    if (!res.ok) {
      setErr(j.error || "저장 실패");
      return;
    }
    setMarks((prev) => (j.saved ? [...prev, id] : prev.filter((x) => x !== id)));
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <TopBar />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-sm font-semibold text-[#FF385C]">카테고리</p>
        <h1 className="mt-1 text-3xl font-bold text-[#222222]">{cat?.label || type}</h1>
        <p className="mt-2 text-[#737373]">{cat?.intro}</p>
        {err && <p className="mt-3 text-sm text-red-500">{err}</p>}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((h) => (
            <HobbyCard key={h.id} hobby={h} saved={marks.includes(h.id)} onToggle={toggle} showBookmark />
          ))}
        </div>
      </main>
    </div>
  );
}
