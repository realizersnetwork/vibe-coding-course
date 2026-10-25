"use client";

import { useEffect, useState } from "react";

type Chirp = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  text: string;
  likes: number;
  liked: boolean;
  time: string;
  comments: { id: string; text: string }[];
};

const seed: Chirp[] = [
  {
    id: "1",
    name: "서윤",
    handle: "seoyoon",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    text: "비 오는 창가에서 초고를 고친다. 문장 하나가 하루를 바꾼다.",
    likes: 128,
    liked: false,
    time: "2시간",
    comments: [{ id: "c1", text: "문장 좋다." }],
  },
  {
    id: "2",
    name: "민준",
    handle: "minjun",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    text: "한강 새벽 러닝. 헤드램프 대신 가로등만으로도 충분했다.",
    likes: 64,
    liked: false,
    time: "5시간",
    comments: [],
  },
  {
    id: "3",
    name: "하나",
    handle: "hana.trip",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop",
    text: "제주 동쪽 카페. 창밖 바람이 메뉴판보다 먼저 말을 건넨다.",
    likes: 210,
    liked: true,
    time: "1일",
    comments: [],
  },
];

const trends = ["바이브코딩", "솔빛수학", "HobbyFind", "Next.js 16"];

export default function Page() {
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [draft, setDraft] = useState("");
  const [feed, setFeed] = useState<Chirp[]>(seed);
  const [tab, setTab] = useState<"home" | "search">("home");

  useEffect(() => {
    setUser(localStorage.getItem("chirp-user"));
  }, []);

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-black text-white">
        <form
          className="w-[min(92vw,360px)]"
          onSubmit={(e) => {
            e.preventDefault();
            const id = email || "reader@local";
            localStorage.setItem("chirp-user", id);
            setUser(id);
          }}
        >
          <h1 className="text-5xl font-black">Chirp</h1>
          <p className="mt-2 text-sm text-white/60">짧은 글. 로컬 로그인 · 키 없어도 동작</p>
          <input
            className="mt-8 w-full rounded-full bg-white/10 px-4 py-3"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="mt-3 w-full rounded-full bg-[#1d9bf0] py-3 font-semibold">입장</button>
        </form>
      </div>
    );
  }

  const shown = tab === "search" ? feed.filter((c) => c.text.includes("러닝") || c.text.includes("제주")) : feed;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)_240px]">
        <aside className="hidden flex-col gap-4 p-6 md:flex">
          <p className="text-2xl font-black">Chirp</p>
          <button className="text-left font-semibold" onClick={() => setTab("home")}>홈</button>
          <button className="text-left text-white/70" onClick={() => setTab("search")}>탐색</button>
          <button
            className="mt-auto text-left text-sm text-white/50"
            onClick={() => {
              localStorage.removeItem("chirp-user");
              setUser(null);
            }}
          >
            로그아웃
          </button>
        </aside>

        <main className="min-h-screen border-x border-white/10">
          <header className="sticky top-0 border-b border-white/10 bg-black/80 px-4 py-3 font-bold backdrop-blur">
            {tab === "home" ? "홈" : "탐색"}
          </header>
          {tab === "home" && (
            <form
              className="flex gap-3 border-b border-white/10 p-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                setFeed((prev) => [
                  {
                    id: String(Date.now()),
                    name: "나",
                    handle: user.split("@")[0],
                    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop",
                    text: draft.trim(),
                    likes: 0,
                    liked: false,
                    time: "지금",
                    comments: [],
                  },
                  ...prev,
                ]);
                setDraft("");
              }}
            >
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={140}
                placeholder="무슨 일이 일어나고 있나요?"
                className="h-20 flex-1 resize-none bg-transparent outline-none"
              />
              <button className="self-end rounded-full bg-[#1d9bf0] px-4 py-2 text-sm font-semibold">게시</button>
            </form>
          )}
          {shown.map((c) => (
            <article key={c.id} className="flex gap-3 border-b border-white/10 p-4">
              <img src={c.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-bold">{c.name}</span>{" "}
                  <span className="text-white/50">@{c.handle} · {c.time}</span>
                </p>
                {c.handle === user.split("@")[0] || c.name === "나" ? (
                  <div className="mt-2 flex gap-3 text-xs text-white/50">
                    <button
                      type="button"
                      onClick={() => {
                        const next = prompt("수정", c.text);
                        if (next == null) return;
                        setFeed((prev) => prev.map((x) => (x.id === c.id ? { ...x, text: next } : x)));
                      }}
                    >
                      수정
                    </button>
                    <button type="button" onClick={() => setFeed((prev) => prev.filter((x) => x.id !== c.id))}>
                      삭제
                    </button>
                  </div>
                ) : null}
                <p className="mt-1">{c.text}</p>
                <div className="mt-2 flex gap-4 text-sm">
                <button
                  className={c.liked ? "text-pink-400" : "text-white/50"}
                  onClick={() =>
                    setFeed((prev) =>
                      prev.map((x) =>
                        x.id === c.id
                          ? { ...x, liked: !x.liked, likes: x.liked ? x.likes - 1 : x.likes + 1 }
                          : x
                      )
                    )
                  }
                >
                  ♥ {c.likes}
                </button>
                <button
                  className="text-white/50"
                  onClick={() => {
                    const t = prompt("댓글");
                    if (!t) return;
                    setFeed((prev) =>
                      prev.map((x) =>
                        x.id === c.id ? { ...x, comments: [...x.comments, { id: String(Date.now()), text: t }] } : x
                      )
                    );
                  }}
                >
                  댓글 {c.comments.length}
                </button>
                </div>
                {c.comments.map((cm) => (
                  <p key={cm.id} className="mt-1 text-sm text-white/60">↳ {cm.text}</p>
                ))}
              </div>
            </article>
          ))}
        </main>

        <aside className="hidden p-4 md:block">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="font-bold">지금 뜨는 주제</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {trends.map((t) => (
                <li key={t}>#{t}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
