"use client";

import { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { BOOKS, TYPES } from "@/data/books";

export default function Page() {
  const { data, status } = useSession();
  const loggedIn = status === "authenticated";
  const [filter, setFilter] = useState("전체");
  const [saved, setSaved] = useState<string[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") location.href = "/login";
    if (status !== "authenticated") return;
    fetch("/api/saves")
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "관심 책을 불러오지 못했습니다.");
        setSaved(j.ids || []);
      })
      .catch((e) => setErr(e.message));
  }, [status]);

  const list = useMemo(() => BOOKS.filter((b) => filter === "전체" || b.type === filter), [filter]);

  async function toggle(id: string) {
    setErr("");
    const res = await fetch("/api/saves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: id }),
    });
    const j = await res.json();
    if (!res.ok) {
      setErr(j.error || "저장에 실패했습니다.");
      return;
    }
    setSaved((prev) => (j.saved ? [...prev, id] : prev.filter((x) => x !== id)));
  }

  if (status === "loading" || !loggedIn) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f4ef] text-sm text-neutral-500">로딩 중...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <h1 className="font-serif text-3xl">Shelf</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-neutral-500">{data?.user?.email}</span>
          <button type="button" onClick={() => signOut({ callbackUrl: "/login" })}>
            로그아웃
          </button>
        </div>
      </header>
      <div className="mx-auto flex max-w-5xl flex-wrap gap-2 px-5">
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`rounded-full px-3 py-1 text-sm ${filter === t ? "bg-black text-white" : "bg-white"}`}
          >
            {t}
          </button>
        ))}
      </div>
      {err && <p className="mx-auto max-w-5xl px-5 pt-4 text-sm text-red-500">{err}</p>}
      <main className="mx-auto grid max-w-5xl gap-4 px-5 py-8 md:grid-cols-3">
        {list.map((b) => (
          <article key={b.id} className="bg-white p-5 shadow-sm">
            <p className="text-xs tracking-wide text-neutral-400">
              {b.type} · {b.celeb} 추천
            </p>
            <h2 className="mt-2 font-serif text-2xl">{b.title}</h2>
            <p className="text-sm">{b.by}</p>
            <p className="mt-3 text-sm text-neutral-600">{b.why}</p>
            <button type="button" className="mt-4 text-sm underline" onClick={() => toggle(b.id)}>
              {saved.includes(b.id) ? "관심 해제" : "관심 책 저장"}
            </button>
          </article>
        ))}
      </main>
      <p className="mx-auto max-w-5xl px-5 pb-10 text-sm text-neutral-500">관심 책 {saved.length}권</p>
    </div>
  );
}
