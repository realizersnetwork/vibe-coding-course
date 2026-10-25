"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { CATEGORIES, HOBBIES, type Category } from "@/data/hobbies";
import TopBar from "@/components/TopBar";
import HobbyCard from "@/components/HobbyCard";

export default function Page() {
  const { status } = useSession();
  const loggedIn = status === "authenticated";
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [q, setQ] = useState("");
  const [marks, setMarks] = useState<string[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      setMarks([]);
      return;
    }
    fetch("/api/bookmarks")
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "북마크를 불러오지 못했습니다.");
        setMarks(j.ids || []);
      })
      .catch((e) => setErr(e.message));
  }, [loggedIn]);

  async function toggle(id: string) {
    if (!loggedIn) {
      location.href = "/login";
      return;
    }
    setErr("");
    const res = await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hobbyId: id }),
    });
    const j = await res.json();
    if (!res.ok) {
      setErr(j.error || "저장에 실패했습니다.");
      return;
    }
    setMarks((prev) => (j.saved ? [...prev, id] : prev.filter((x) => x !== id)));
  }

  const list = useMemo(() => {
    const base = filter === "all" ? HOBBIES : HOBBIES.filter((h) => h.category === filter);
    const s = q.trim();
    if (!s) return base;
    return base.filter((h) => h.name.includes(s) || h.summary.includes(s));
  }, [filter, q]);

  return (
    <div>
      <TopBar />
      <motion.section
        className="bg-white py-16"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold text-[#FF385C]">취미를 찾는 가장 짧은 길</p>
          <h1 className="mt-2 text-4xl font-bold">오늘, 어떤 사람이 되고 싶나요?</h1>
          <p className="mt-3 max-w-xl text-neutral-600">
            운동형 · 지능형 · 예술형으로 나뉜 취미를 둘러보고, 로그인 후 북마크하세요.
          </p>
        </div>
      </motion.section>
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-1.5 text-sm ${filter === "all" ? "bg-neutral-900 text-white" : "bg-white border"}`}
          >
            전체
          </button>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="취미 검색"
            className="rounded-full border bg-white px-4 py-1.5 text-sm"
          />
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => (location.href = `/category/${c.key}`)}
              className="rounded-full border bg-white px-4 py-1.5 text-sm"
            >
              {c.label}
            </button>
          ))}
        </div>
        {err && <p className="mt-4 text-sm text-red-500">{err}</p>}
        {status === "loading" && <p className="mt-6 text-sm text-neutral-400">로딩 중...</p>}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((h) => (
            <HobbyCard key={h.id} hobby={h} saved={marks.includes(h.id)} onToggle={toggle} showBookmark />
          ))}
        </div>
      </section>
    </div>
  );
}
