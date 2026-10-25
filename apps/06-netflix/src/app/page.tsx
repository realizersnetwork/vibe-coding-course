"use client";

import { useState } from "react";

const titles = [
  { id: "t1", name: "오징어 게임", img: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=800&h=450&fit=crop", desc: "생존 게임이 시작된다." },
  { id: "t2", name: "불꽃", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=450&fit=crop", desc: "산 위의 밤." },
  { id: "t3", name: "해변", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop", desc: "여름의 잔상." },
  { id: "t4", name: "도시", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=450&fit=crop", desc: "잠들지 않는 거리." },
  { id: "t5", name: "숲", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop", desc: "발자국만 남긴 길." },
  { id: "t6", name: "안개", img: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=450&fit=crop", desc: "보이지 않는 적." },
  { id: "t7", name: "열차", img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=450&fit=crop", desc: "끝없는 레일." },
  { id: "t8", name: "사막", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=450&fit=crop", desc: "모래 위의 발자국." },
  { id: "t9", name: "비", img: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800&h=450&fit=crop", desc: "창밖의 밤." },
  { id: "t10", name: "등대", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop&sat=-20", desc: "마지막 빛." },
  { id: "t11", name: "시장", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop", desc: "냄새와 목소리." },
  { id: "t12", name: "서고", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop", desc: "먼지 쌓인 이름." },
  { id: "t13", name: "무대", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop", desc: "조명이 꺼지기 전." },
  { id: "t14", name: "터널", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop", desc: "끝은 아직 없다." },
  { id: "t15", name: "항구", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop&hue=20", desc: "떠나는 배." },
  { id: "t16", name: "옥상", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=450&fit=crop&hue=40", desc: "도시 위의 숨." },
  { id: "t17", name: "눈", img: "https://images.unsplash.com/photo-1418985991508-e47386d3a511?w=800&h=450&fit=crop", desc: "발자국이 지워진다." },
  { id: "t18", name: "불", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=450&fit=crop&hue=30", desc: "남은 온기." },
  { id: "t19", name: "섬", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop&hue=80", desc: "물 위의 집." },
  { id: "t20", name: "길", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop&hue=50", desc: "아직 걸어갈 밤." },
];

export default function Page() {
  const [authed, setAuthed] = useState(false);
  const [detail, setDetail] = useState<(typeof titles)[0] | null>(null);
  const [email, setEmail] = useState("");

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-[url('https://images.unsplash.com/photo-1440404653325-ab127d49ea17?w=1600&q=60')] bg-cover">
        <form
          className="w-[min(92vw,400px)] rounded bg-black/80 p-10"
          onSubmit={(e) => {
            e.preventDefault();
            setAuthed(true);
          }}
        >
          <h1 className="text-3xl font-bold text-[#e50914]">NUVIX</h1>
          <p className="mt-2 text-sm text-white/70">로그인 (아무 이메일이나 가능 · 실습용)</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" className="mt-6 w-full rounded bg-[#333] px-3 py-3" />
          <input type="password" placeholder="비밀번호" className="mt-3 w-full rounded bg-[#333] px-3 py-3" />
          <button className="mt-6 w-full rounded bg-[#e50914] py-3 font-semibold">로그인</button>
        </form>
      </div>
    );
  }

  const hero = titles[0];
  return (
    <div className="min-h-screen">
      <header className="flex items-center gap-6 px-8 py-4 text-sm">
        <span className="text-2xl font-black text-[#e50914]">NUVIX</span>
        <span>홈</span>
        <span className="text-white/70">시리즈</span>
        <span className="text-white/70">영화</span>
        <button className="ml-auto text-white/70" onClick={() => setAuthed(false)}>로그아웃</button>
      </header>
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero.img})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="relative z-10 max-w-xl px-8 pt-32 animate-[fade_0.8s_ease]">
          <h2 className="text-5xl font-black">{hero.name}</h2>
          <p className="mt-4 text-white/80">{hero.desc}</p>
          <div className="mt-6 flex gap-3">
            <button className="rounded bg-white px-5 py-2 font-semibold text-black">▶ 재생</button>
            <button className="rounded bg-white/30 px-5 py-2" onClick={() => setDetail(hero)}>상세 정보</button>
          </div>
        </div>
      </section>
      <section className="px-8 py-8">
        <h3 className="mb-3 font-semibold">인기 콘텐츠</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {titles.map((t) => (
            <button key={t.id} className="transition hover:scale-105" onClick={() => setDetail(t)}>
              <img src={t.img} alt={t.name} className="aspect-video w-full rounded object-cover" />
              <p className="mt-1 text-left text-sm">{t.name}</p>
            </button>
          ))}
        </div>
      </section>
      {detail && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-black/70 p-4" onClick={() => setDetail(null)}>
          <div className="max-w-lg overflow-hidden rounded-xl bg-[#181818]" onClick={(e) => e.stopPropagation()}>
            <img src={detail.img} alt="" className="h-48 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-2xl font-bold">{detail.name}</h3>
              <p className="mt-2 text-white/70">{detail.desc}</p>
              <button className="mt-4 text-sm text-white/50" onClick={() => setDetail(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes fade { from { opacity: 0; transform: translateY(12px);} to { opacity:1; transform:none;} }`}</style>
    </div>
  );
}
