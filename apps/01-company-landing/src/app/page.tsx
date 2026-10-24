"use client";

import { useState } from "react";

const teachers = [
  { name: "김도현", role: "원장 · 수학과 석사", bio: "10년 내신·수능 지도" },
  { name: "박서연", role: "중등 전임", bio: "개념부터 서술형까지" },
  { name: "이준호", role: "고등 전임", bio: "미적분·기하 집중반" },
];

export default function Page() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <a href="#top" className="font-bold text-[#3d8900]">솔빛수학</a>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#about">소개</a>
            <a href="#stats">성과</a>
            <a href="#teachers">강사진</a>
            <a href="#visit">방문 예약</a>
          </nav>
        </div>
      </header>
      <section id="top" className="bg-[#f4fbea] py-24">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-sm font-semibold text-[#3d8900]">학부모를 위한 수학 전문 학원</p>
          <h1 className="mt-3 max-w-xl text-4xl font-bold leading-tight md:text-5xl">
            암기가 아니라<br />생각하는 힘으로.
          </h1>
          <p className="mt-4 max-w-lg text-neutral-600">
            중등부터 고등까지, 아이 속도에 맞춘 소수 정예 수업입니다.
          </p>
          <a href="#visit" className="mt-8 inline-block rounded-full bg-[#6fcf1b] px-6 py-3 font-semibold text-black">
            상담 예약하기
          </a>
        </div>
      </section>
      <section id="stats" className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 py-16 md:grid-cols-4">
        {[
          ["98%", "숙제 완료율"],
          ["1:8", "반 정원"],
          ["12년", "운영"],
          ["4.9", "학부모 평점"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-2xl bg-neutral-50 p-6 text-center">
            <p className="text-3xl font-bold text-[#3d8900]">{n}</p>
            <p className="mt-1 text-sm text-neutral-500">{l}</p>
          </div>
        ))}
      </section>
      <section id="about" className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-2xl font-bold">차별점</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["매일 오답 루틴", "학부모 주간 리포트", "내신 2주 전 집중반"].map((t) => (
              <div key={t} className="rounded-2xl bg-white p-6 shadow-sm">{t}</div>
            ))}
          </div>
        </div>
      </section>
      <section id="teachers" className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-2xl font-bold">강사진</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {teachers.map((t) => (
            <article key={t.name} className="rounded-2xl border p-6">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-[#3d8900]">{t.role}</p>
              <p className="mt-2 text-sm text-neutral-600">{t.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="visit" className="bg-[#f4fbea] py-16">
        <form
          className="mx-auto max-w-md space-y-3 px-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2 className="text-2xl font-bold">방문 예약</h2>
          <input required placeholder="학부모 성함" className="w-full rounded-lg border px-3 py-2" />
          <input required placeholder="연락처" className="w-full rounded-lg border px-3 py-2" />
          <input type="date" className="w-full rounded-lg border px-3 py-2" />
          <button className="w-full rounded-lg bg-[#6fcf1b] py-3 font-semibold text-black">예약 요청</button>
          {sent && <p className="text-sm text-[#3d8900]">접수되었습니다. 상담 선생님이 연락드립니다.</p>}
        </form>
      </section>
      <footer className="border-t py-8 text-center text-sm text-neutral-500">
        서울시 강남구 · 02-000-0000 · 솔빛수학
      </footer>
    </div>
  );
}
