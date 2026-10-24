"use client";

import { useState } from "react";

const sns = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "YouTube", href: "https://youtube.com" },
  { name: "GitHub", href: "https://github.com/realizersnetwork" },
];

export default function Page() {
  const [name, setName] = useState("한서윤");
  const [bio, setBio] = useState("만드는 사람 · 서울");
  const [links, setLinks] = useState([
    { id: 1, title: "포트폴리오", url: "https://github.com/realizersnetwork" },
    { id: 2, title: "블로그", url: "https://vercel.com" },
    { id: 3, title: "연락하기", url: "mailto:realizersco@gmail.com" },
  ]);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="min-h-screen bg-[#0b1f0e] text-[#e8f5e9]">
      <header className="mx-auto flex max-w-md items-center justify-between px-5 py-4 text-sm">
        <span className="font-semibold tracking-wide">LEAF</span>
        <button type="button" onClick={() => setEdit((v) => !v)} className="rounded-full border border-white/20 px-3 py-1">
          {edit ? "미리보기" : "프로필 수정"}
        </button>
      </header>
      <main className="mx-auto max-w-md px-5 pb-16 text-center">
        <div className="mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full bg-[#254F1A] text-3xl">서</div>
        {edit ? (
          <div className="space-y-2 text-left">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg bg-white/10 px-3 py-2" />
            <input value={bio} onChange={(e) => setBio(e.target.value)} className="w-full rounded-lg bg-white/10 px-3 py-2" />
            <div className="flex gap-2">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="링크 제목" className="flex-1 rounded-lg bg-white/10 px-3 py-2" />
              <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" className="flex-1 rounded-lg bg-white/10 px-3 py-2" />
              <button
                type="button"
                className="rounded-lg bg-[#6fcf1b] px-3 text-black"
                onClick={() => {
                  if (!title || !url) return;
                  setLinks((l) => [...l, { id: Date.now(), title, url }]);
                  setTitle("");
                  setUrl("");
                }}
              >
                추가
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="mt-1 text-white/70">{bio}</p>
          </>
        )}
        <div className="mt-6 flex justify-center gap-3 text-sm">
          {sns.map((s) => (
            <a key={s.name} href={s.href} className="rounded-full border border-white/20 px-3 py-1" target="_blank" rel="noreferrer">
              {s.name}
            </a>
          ))}
        </div>
        <ul className="mt-8 space-y-3">
          {links.map((l) => (
            <li key={l.id} className="flex items-center gap-2">
              <a href={l.url} target="_blank" rel="noreferrer" className="block flex-1 rounded-full bg-[#254F1A] py-3 font-medium hover:bg-[#2f6622]">
                {l.title}
              </a>
              {edit && (
                <button type="button" className="text-xs text-white/50" onClick={() => setLinks((x) => x.filter((i) => i.id !== l.id))}>
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
