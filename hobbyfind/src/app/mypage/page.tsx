"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { CATEGORIES, HOBBIES } from "@/data/hobbies";
import TopBar from "@/components/TopBar";
import HobbyCard from "@/components/HobbyCard";

export default function MyPage() {
  const { data, status } = useSession();
  const [marks, setMarks] = useState<string[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") location.href = "/login";
    if (status !== "authenticated") return;
    fetch("/api/bookmarks")
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "불러오기 실패");
        setMarks(j.ids || []);
      })
      .catch((e) => setErr(e.message));
  }, [status]);

  async function toggle(id: string) {
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

  const saved = HOBBIES.filter((h) => marks.includes(h.id));
  const stats = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        count: saved.filter((h) => h.category === c.key).length,
      })),
    [saved]
  );
  const total = saved.length || 1;

  if (status === "loading") {
    return (
      <div>
        <TopBar />
        <p className="p-10 text-sm text-neutral-400">로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-2xl font-bold">마이페이지</h1>
        <p className="mt-1 text-neutral-500">{data?.user?.email}</p>
        <p className="mt-2 text-sm">북마크 총 {saved.length}개</p>
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        <h2 className="mt-8 font-semibold">카테고리별 북마크 통계</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.key} className="rounded-2xl border bg-white p-5">
              <p className="text-sm text-neutral-500">{s.label}</p>
              <p className="text-3xl font-bold text-[#FF385C]">{s.count}</p>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-[#FF385C]"
                  style={{ width: `${Math.round((s.count / total) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <h2 className="mt-10 font-semibold">저장한 취미</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((h) => (
            <HobbyCard key={h.id} hobby={h} saved onToggle={toggle} showBookmark />
          ))}
        </div>
        {saved.length === 0 && <p className="mt-4 text-sm text-neutral-400">아직 북마크가 없습니다.</p>}
      </main>
    </div>
  );
}
