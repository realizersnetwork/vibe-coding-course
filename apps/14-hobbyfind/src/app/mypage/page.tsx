"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, HOBBIES } from "@/data/hobbies";

export default function MyPage() {
  const [user, setUser] = useState<string | null>(null);
  const [marks, setMarks] = useState<string[]>([]);

  useEffect(() => {
    const u = localStorage.getItem("hobbyfind-user");
    if (!u) {
      location.href = "/login";
      return;
    }
    setUser(u);
    setMarks(JSON.parse(localStorage.getItem("hobbyfind-marks") || "[]"));
  }, []);

  const stats = useMemo(() => {
    return CATEGORIES.map((c) => ({
      ...c,
      count: HOBBIES.filter((h) => h.category === c.key && marks.includes(h.id)).length,
    }));
  }, [marks]);

  const saved = HOBBIES.filter((h) => marks.includes(h.id));

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 text-sm">
          <Link href="/" className="font-bold text-rose-600">HobbyFind</Link>
          <button
            onClick={() => {
              localStorage.removeItem("hobbyfind-user");
              location.href = "/";
            }}
          >
            로그아웃
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="text-2xl font-bold">마이페이지</h1>
        <p className="mt-1 text-neutral-500">{user}</p>
        <h2 className="mt-8 font-semibold">카테고리별 북마크 통계</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.key} className="rounded-2xl border p-5">
              <p className="text-sm text-neutral-500">{s.label}</p>
              <p className="text-3xl font-bold text-rose-600">{s.count}</p>
              <div className="mt-2 h-2 rounded-full bg-rose-100">
                <div className="h-full rounded-full bg-rose-500" style={{ width: `${Math.min(100, s.count * 25)}%` }} />
              </div>
            </div>
          ))}
        </div>
        <h2 className="mt-10 font-semibold">저장한 취미</h2>
        <ul className="mt-3 space-y-2">
          {saved.map((h) => (
            <li key={h.id} className="rounded-xl border px-4 py-3">
              {h.name} · {CATEGORIES.find((c) => c.key === h.category)?.label}
            </li>
          ))}
          {saved.length === 0 && <p className="text-sm text-neutral-400">아직 북마크가 없습니다.</p>}
        </ul>
      </main>
    </div>
  );
}
