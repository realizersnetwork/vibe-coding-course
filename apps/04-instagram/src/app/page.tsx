"use client";

import { useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
};

type Comment = { id: string; user: string; text: string };

type Post = {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
};

const me: User = {
  id: "me",
  name: "한서윤",
  handle: "seoyoon.studio",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop",
  bio: "서울 · 사진",
};

const friends: User[] = [
  {
    id: "u1",
    name: "민준",
    handle: "user1",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop",
    bio: "바다를 찍습니다",
  },
  {
    id: "u2",
    name: "하나",
    handle: "user2",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop",
    bio: "여행 기록",
  },
  {
    id: "u3",
    name: "도윤",
    handle: "night.walk",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop",
    bio: "야경",
  },
];

const suggested: User[] = [
  {
    id: "s1",
    name: "홍길동",
    handle: "gildong",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop",
    bio: "회원님을 위한 추천",
  },
  {
    id: "s2",
    name: "김철수",
    handle: "chulsoo.kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop",
    bio: "회원님을 위한 추천",
  },
  {
    id: "s3",
    name: "이영희",
    handle: "younghee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop",
    bio: "회원님을 위한 추천",
  },
];

const seedPosts: Post[] = [
  {
    id: "p1",
    user: friends[0],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&h=1080&fit=crop",
    caption: "1번째 게시물입니다. 오늘도 좋은 하루 되세요!",
    likes: 67,
    liked: false,
    comments: [{ id: "c1", user: "user2", text: "멋지다!" }],
  },
  {
    id: "p2",
    user: friends[1],
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080&h=1350&fit=crop",
    caption: "바람이 좋은 날의 아치.",
    likes: 128,
    liked: false,
    comments: [],
  },
  {
    id: "p3",
    user: friends[2],
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1080&fit=crop",
    caption: "서울 밤. 불빛만 남기고 귀가.",
    likes: 214,
    liked: true,
    comments: [{ id: "c2", user: "seoyoon.studio", text: "이 각도 저장함" }],
  },
];

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "#ed4956" : "none"} stroke={filled ? "#ed4956" : "currentColor"} strokeWidth="1.8">
      <path d="M12 20s-7-4.4-9.3-8.2C.7 8.6 2.2 5 5.6 5c2 0 3.3 1.2 4.1 2.3C10.5 6.2 11.8 5 13.8 5c3.4 0 4.9 3.6 2.9 6.8C19 15.6 12 20 12 20z" />
    </svg>
  );
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(seedPosts);
  const [follows, setFollows] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.user.name.toLowerCase().includes(q) ||
        p.user.handle.toLowerCase().includes(q) ||
        p.caption.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const people = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = [...friends, ...suggested];
    if (!q) return [];
    return all.filter((u) => u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));
  }, [query]);

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }

  function addComment(id: string) {
    const text = (drafts[id] || "").trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, { id: `${id}-${p.comments.length}`, user: me.handle, text }] }
          : p
      )
    );
    setDrafts((d) => ({ ...d, [id]: "" }));
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-20 border-b border-[#dbdbdb] bg-white">
        <div className="mx-auto flex h-[60px] max-w-[975px] items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-[11px] font-bold text-white">
              L
            </span>
            <span className="font-[Georgia] text-[22px] tracking-tight">LUMI</span>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색"
            className="h-9 w-[268px] rounded-lg bg-[#efefef] px-4 text-sm outline-none placeholder:text-[#737373]"
          />
          <div className="flex items-center gap-4 text-xl">
            <span title="홈">⌂</span>
            <span title="공유">✈</span>
            <img src={me.avatar} alt={me.name} className="h-6 w-6 rounded-full object-cover" />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[975px] grid-cols-1 gap-8 px-5 py-8 lg:grid-cols-[470px_320px] lg:justify-center">
        <section className="space-y-4">
          <div className="flex gap-4 overflow-x-auto rounded-xl border border-[#dbdbdb] bg-white px-4 py-3">
            {[me, ...friends].map((u) => (
              <div key={u.id} className="flex w-16 shrink-0 flex-col items-center gap-1">
                <span className="rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px]">
                  <img src={u.avatar} alt={u.name} className="h-14 w-14 rounded-full border-2 border-white object-cover" />
                </span>
                <span className="w-full truncate text-center text-[11px]">{u.handle}</span>
              </div>
            ))}
          </div>

          {people.length > 0 && (
            <div className="rounded-xl border border-[#dbdbdb] bg-white p-4">
              <p className="mb-2 text-xs font-semibold text-[#737373]">계정</p>
              {people.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{u.handle}</p>
                      <p className="text-xs text-[#737373]">{u.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {visible.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-xl border border-[#dbdbdb] bg-white">
              <div className="flex items-center gap-3 px-3 py-2">
                <img src={post.user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{post.user.handle}</p>
                  <p className="text-xs text-[#737373]">{post.user.name}</p>
                </div>
              </div>
              <button type="button" className="block w-full" onDoubleClick={() => toggleLike(post.id)}>
                <img src={post.image} alt="" className="aspect-square w-full object-cover" />
              </button>
              <div className="px-3 py-2">
                <div className="mb-2 flex gap-3">
                  <button type="button" onClick={() => toggleLike(post.id)} aria-label="좋아요">
                    <Heart filled={post.liked} />
                  </button>
                  <span aria-hidden>💬</span>
                </div>
                <p className="text-sm font-semibold">좋아요 {post.likes}개</p>
                <p className="mt-1 text-sm">
                  <span className="font-semibold">{post.user.handle}</span> {post.caption}
                </p>
                {post.comments.map((c) => (
                  <p key={c.id} className="text-sm">
                    <span className="font-semibold">{c.user}</span> {c.text}
                  </p>
                ))}
                <form
                  className="mt-2 flex border-t border-[#efefef] pt-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addComment(post.id);
                  }}
                >
                  <input
                    value={drafts[post.id] || ""}
                    onChange={(e) => setDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                    placeholder="댓글 달기..."
                    className="flex-1 text-sm outline-none"
                  />
                  <button type="submit" className="text-sm font-semibold text-[#0095f6]">
                    게시
                  </button>
                </form>
              </div>
            </article>
          ))}
        </section>

        <aside className="hidden lg:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={me.avatar} alt="" className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{me.handle}</p>
                <p className="text-sm text-[#737373]">{me.name}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm">
            <p className="font-semibold text-[#737373]">회원님을 위한 추천</p>
            <button type="button" className="text-xs font-semibold">모두 보기</button>
          </div>
          <ul className="mt-3 space-y-3">
            {suggested.map((u) => (
              <li key={u.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{u.name}</p>
                    <p className="text-xs text-[#737373]">{u.bio}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFollows((f) => ({ ...f, [u.id]: !f[u.id] }))}
                  className="text-xs font-semibold text-[#0095f6]"
                >
                  {follows[u.id] ? "팔로잉" : "팔로우"}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[11px] text-[#c7c7c7]">© 2026 LUMI · 교육 실습용 피드</p>
        </aside>
      </main>
    </div>
  );
}
