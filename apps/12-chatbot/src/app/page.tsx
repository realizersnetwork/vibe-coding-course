"use client";

import { useState } from "react";

type M = { from: "bot" | "me"; text: string };

const faq: Record<string, string> = {
  수강료: "중등 월 32만 원, 고등 월 38만 원입니다. 형제 할인 10%가 있습니다.",
  시간: "평일 16:00–22:00, 토요일 10:00–18:00 운영합니다. 일요일은 쉽니다.",
  위치: "강남구 테헤란로 인근, 2호선 역삼역 3번 출구 도보 4분입니다.",
  상담: "방문 상담은 랜딩페이지 예약 또는 02-000-0000으로 신청해 주세요.",
};

function reply(q: string) {
  const hit = Object.keys(faq).find((k) => q.includes(k));
  if (hit) return faq[hit];
  return "솔빛수학 상담봇입니다. ‘수강료, 시간, 위치, 상담’ 중 궁금한 단어를 넣어 질문해 주세요. (OpenAI 키를 넣으면 일반 상담으로 확장됩니다)";
}

export default function Page() {
  const [msgs, setMsgs] = useState<M[]>([{ from: "bot", text: "안녕하세요. 솔빛수학 학부모 상담봇입니다." }]);
  const [text, setText] = useState("");

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-white">
      <header className="border-b px-4 py-3 font-semibold">솔빛 상담봇</header>
      <main className="flex-1 space-y-2 overflow-y-auto p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "me" ? "ml-auto bg-lime-200" : "bg-neutral-100"}`}>
            {m.text}
          </div>
        ))}
      </main>
      <form
        className="flex gap-2 border-t p-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          const q = text.trim();
          setMsgs((m) => [...m, { from: "me", text: q }, { from: "bot", text: reply(q) }]);
          setText("");
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 rounded-full border px-4 py-2 text-sm" placeholder="질문을 입력하세요" />
        <button className="rounded-full bg-black px-4 text-white">전송</button>
      </form>
    </div>
  );
}
