"use client";

import { useEffect, useMemo, useState } from "react";

const books = [
  { id: "b1", title: "사피엔스", by: "유발 하라리", type: "지식인", why: "인류의 큰 그림을 한 권에." },
  { id: "b2", title: "원칙", by: "레이 달리오", type: "기업가", why: "의사결정의 시스템을 만든다." },
  { id: "b3", title: "데미안", by: "헤르만 헤세", type: "예술가", why: "자아를 깨우는 소설." },
  { id: "b4", title: "아토믹 해빗", by: "제임스 클리어", type: "스포츠선수", why: "1%의 복리." },
  { id: "b5", title: "코스모스", by: "칼 세이건", type: "지식인", why: "밤하늘을 다시 보게 한다." },
  { id: "b6", title: "픽사 스토리텔링", by: "매튜 룬", type: "예술가", why: "이야기를 설계하는 법." },
];

const types = ["전체", "기업가", "연예인", "스포츠선수", "지식인", "예술가"];

export default function Page() {
  const [user, setUser] = useState<string | null>(null);
  const [filter, setFilter] = useState("전체");
  const [saved, setSaved] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("shelf-user"));
    setSaved(JSON.parse(localStorage.getItem("shelf-saved") || "[]"));
  }, []);

  const list = useMemo(() => books.filter((b) => filter === "전체" || b.type === filter), [filter]);

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f4ef]">
        <form
          className="w-80 bg-white p-8 shadow"
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("shelf-user", email || "reader@local");
            setUser(email || "reader@local");
          }}
        >
          <h1 className="font-serif text-3xl">Shelf</h1>
          <p className="mt-1 text-sm text-neutral-500">로그인 / 회원가입 (로컬 저장 · Supabase 키 연결 가능)</p>
          <input className="mt-6 w-full border px-3 py-2" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="mt-2 w-full border px-3 py-2" type="password" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} />
          <button className="mt-4 w-full bg-black py-2 text-white">입장</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <h1 className="font-serif text-3xl">Shelf</h1>
        <button onClick={() => { localStorage.removeItem("shelf-user"); setUser(null); }}>로그아웃</button>
      </header>
      <div className="mx-auto flex max-w-5xl flex-wrap gap-2 px-5">
        {types.map((t) => (
          <button key={t} onClick={() => setFilter(t)} className={`rounded-full px-3 py-1 text-sm ${filter === t ? "bg-black text-white" : "bg-white"}`}>
            {t}
          </button>
        ))}
      </div>
      <main className="mx-auto grid max-w-5xl gap-4 px-5 py-8 md:grid-cols-3">
        {list.map((b) => (
          <article key={b.id} className="bg-white p-5 shadow-sm">
            <p className="text-xs tracking-wide text-neutral-400">{b.type}</p>
            <h2 className="mt-2 font-serif text-2xl">{b.title}</h2>
            <p className="text-sm">{b.by}</p>
            <p className="mt-3 text-sm text-neutral-600">{b.why}</p>
            <button
              className="mt-4 text-sm underline"
              onClick={() => {
                const next = saved.includes(b.id) ? saved.filter((x) => x !== b.id) : [...saved, b.id];
                setSaved(next);
                localStorage.setItem("shelf-saved", JSON.stringify(next));
              }}
            >
              {saved.includes(b.id) ? "관심 해제" : "관심 책 저장"}
            </button>
          </article>
        ))}
      </main>
    </div>
  );
}
