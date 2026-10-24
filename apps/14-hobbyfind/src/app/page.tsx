"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, HOBBIES, type Category } from "@/data/hobbies";

const KEY = "hobbyfind-user";

export default function Page() {
  const [user, setUser] = useState<string | null>(null);
  const [marks, setMarks] = useState<string[]>([]);

  useEffect(() => {
    setUser(localStorage.getItem(KEY));
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
      <Top user={user} />
      <section className="bg-rose-50 py-16">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-sm font-semibold text-rose-500">취미를 찾는 가장 짧은 길</p>
          <h1 className="mt-2 text-4xl font-bold">오늘, 어떤 사람이 되고 싶나요?</h1>
          <p className="mt-3 text-neutral-600">운동형 · 지능형 · 예술형 세 갈래로 취미를 고르고 북마크하세요.</p>
        </div>
      </section>
      {CATEGORIES.map((c) => (
        <CategoryRow key={c.key} cat={c.key} label={c.label} marks={marks} onToggle={toggle} />
      ))}
    </div>
  );
}

function Top({ user }: { user: string | null }) {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 text-sm">
        <Link href="/" className="font-bold text-rose-600">HobbyFind</Link>
        <nav className="flex gap-4">
          <Link href="/category/sports">운동형</Link>
          <Link href="/category/intelligence">지능형</Link>
          <Link href="/category/art">예술형</Link>
          {user ? <Link href="/mypage">마이페이지</Link> : <Link href="/login">로그인</Link>}
        </nav>
      </div>
    </header>
  );
}

function CategoryRow({
  cat,
  label,
  marks,
  onToggle,
}: {
  cat: Category;
  label: string;
  marks: string[];
  onToggle: (id: string) => void;
}) {
  const items = useMemo(() => HOBBIES.filter((h) => h.category === cat).slice(0, 4), [cat]);
  return (
    <section className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-bold">{label}</h2>
        <Link href={`/category/${cat}`} className="text-sm text-rose-600">더보기</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((h) => (
          <article key={h.id} className="rounded-2xl border p-4">
            <h3 className="font-semibold">{h.name}</h3>
            <p className="mt-1 text-sm text-neutral-500">{h.summary}</p>
            <button className="mt-3 text-sm text-rose-600" onClick={() => onToggle(h.id)}>
              {marks.includes(h.id) ? "북마크 해제" : "북마크"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export { Top };
