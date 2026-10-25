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
    <div className="min-h-screen bg-[#F7F7F7]">
      <TopBar />
      <motion.section
        className="bg-white py-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold tracking-wide text-[#FF385C]">HOBBYFIND</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#222222] md:text-5xl">
            오늘, 어떤 취미를
            <br />
            시작해 볼까요?
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[#737373]">
            운동형 · 지능형 · 예술형으로 나눈 18가지 취미를 둘러보고, 마음에 드는 것을 북마크하세요.
          </p>
        </div>
      </motion.section>
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="취미 검색"
            className="h-11 flex-1 rounded-full border border-[#E5E5E5] bg-white px-5 text-sm outline-none focus:border-[#FF385C]"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-2 text-sm ${filter === "all" ? "bg-[#222222] text-white" : "border border-[#E5E5E5] bg-white"}`}
            >
              전체
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => (location.href = `/category/${c.key}`)}
                className="rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm hover:border-[#FF385C] hover:text-[#FF385C]"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        {err && <p className="mt-4 text-sm text-red-500">{err}</p>}
        {status === "loading" && <p className="mt-6 text-sm text-neutral-400">로딩 중...</p>}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((h) => (
            <HobbyCard key={h.id} hobby={h} saved={marks.includes(h.id)} onToggle={toggle} showBookmark />
          ))}
        </div>
        {list.length === 0 && <p className="mt-10 text-center text-sm text-[#737373]">검색 결과가 없습니다.</p>}
      </section>
    </div>
  );
}
