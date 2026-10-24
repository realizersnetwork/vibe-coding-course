"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    title: "소수 정예, 매일 오답",
    text: "중등부터 고등까지 아이 속도에 맞춘 수학.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=900&fit=crop",
  },
  {
    title: "학부모 주간 리포트",
    text: "무엇을 틀렸고, 다음 주에 무엇을 잡는지 공유합니다.",
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&h=900&fit=crop",
  },
  {
    title: "내신 2주 전 집중반",
    text: "시험 범위만 압축해서 반복합니다.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=900&fit=crop",
  },
];

const reviews = [
  { who: "중2 학부모", say: "숙제를 미루던 아이가 스스로 오답노트를 펼칩니다." },
  { who: "고1 학부모", say: "서술형 점수가 한 학기 만에 올랐어요." },
  { who: "중3 학부모", say: "상담이 짧고 구체적입니다. 다음 숙제가 보입니다." },
];

export default function Page() {
  const [i, setI] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 4200);
    return () => clearInterval(t);
  }, []);

  const slide = slides[i];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <a href="#top" className="font-bold text-[#3d8900]">솔빛수학</a>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#classes">수업</a>
            <a href="#reviews">후기</a>
            <a href="#visit">상담</a>
          </nav>
        </div>
      </header>

      <section id="top" className="relative h-[72vh] overflow-hidden bg-black">
        <img
          key={slide.img}
          src={slide.img}
          alt=""
          className="kenburns absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-end px-5 pb-16 text-white">
          <p className="fade-up text-sm font-semibold text-[#6fcf1b]">Step 3 · 움직이는 랜딩</p>
          <h1 className="fade-up mt-2 text-4xl font-bold md:text-5xl">{slide.title}</h1>
          <p className="fade-up mt-3 max-w-lg text-white/80">{slide.text}</p>
          <div className="mt-6 flex gap-2">
            {slides.map((_, n) => (
              <button
                key={n}
                aria-label={`${n + 1}번 슬라이드`}
                onClick={() => setI(n)}
                className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-[#6fcf1b]" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="classes" className="mx-auto max-w-5xl px-5 py-20">
        <h2 className="text-2xl font-bold">수업이 흐르는 방식</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["개념 영상 + 대면 풀이", "매일 12문제 루틴", "시험 2주 압축반"].map((t, n) => (
            <article
              key={t}
              className="fade-up rounded-2xl border p-6"
              style={{ animationDelay: `${n * 0.12}s` }}
            >
              <p className="text-sm text-[#3d8900]">0{n + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-neutral-600">암기가 아니라 풀이 순서를 몸에 남깁니다.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-[#f4fbea] py-16">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-2xl font-bold">학부모 한 줄</h2>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {reviews.map((r) => (
              <blockquote key={r.who} className="min-w-[260px] rounded-2xl bg-white p-6 shadow-sm">
                <p>{r.say}</p>
                <footer className="mt-3 text-sm text-neutral-500">{r.who}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="mx-auto max-w-md px-5 py-16">
        <h2 className="text-2xl font-bold">상담 예약</h2>
        {sent ? (
          <p className="mt-4 text-[#3d8900]">접수했습니다. 하루 안에 연락드립니다.</p>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input required placeholder="학부모 성함" className="w-full rounded-lg border px-3 py-2" />
            <input required placeholder="연락처" className="w-full rounded-lg border px-3 py-2" />
            <button className="w-full rounded-full bg-[#6fcf1b] py-3 font-semibold">예약하기</button>
          </form>
        )}
      </section>
    </div>
  );
}
