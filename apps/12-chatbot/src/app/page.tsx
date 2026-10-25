"use client";

import { useEffect, useState } from "react";

type M = { from: "bot" | "me"; text: string };
type Cat = "수강" | "운영" | "시설";

const rules: Record<Cat, { title: string; body: string }[]> = {
  수강: [
    { title: "수강료", body: "중등 월 32만 원, 고등 월 38만 원입니다. 형제 할인 10%가 있습니다." },
    { title: "환불", body: "개강 전 전액, 1/3 경과 전 2/3, 이후 환불되지 않습니다." },
  ],
  운영: [
    { title: "시간", body: "평일 16:00–22:00, 토요일 10:00–18:00. 일요일은 쉽니다." },
    { title: "상담", body: "방문 상담은 랜딩 예약 또는 02-000-0000으로 신청해 주세요." },
  ],
  시설: [
    { title: "위치", body: "강남구 테헤란로 인근, 2호선 역삼역 3번 출구 도보 4분입니다." },
    { title: "자습실", body: "평일 22:30까지 자습실을 개방합니다. 음식물은 반입 금지입니다." },
  ],
};

export default function Page() {
  const [cat, setCat] = useState<Cat | null>(null);
  const [msgs, setMsgs] = useState<M[]>([{ from: "bot", text: "안녕하세요. 솔빛수학 규정 안내봇입니다. 대분류를 먼저 골라 주세요." }]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("solbit-chat");
    if (saved) setMsgs(JSON.parse(saved));
  }, []);

  function push(next: M[]) {
    setMsgs(next);
    localStorage.setItem("solbit-chat", JSON.stringify(next));
  }

  function pickCat(c: Cat) {
    setCat(c);
    push([
      ...msgs,
      { from: "me", text: c },
      { from: "bot", text: `${c} 규정입니다. 항목을 고르거나 질문을 입력하세요. (${rules[c].map((r) => r.title).join(", ")})` },
    ]);
  }

  function answer(q: string) {
    if (!cat) return "먼저 대분류(수강/운영/시설)를 선택해 주세요.";
    const hit = rules[cat].find((r) => q.includes(r.title) || r.body.includes(q));
    if (hit) return hit.body;
    return "해당 규정을 찾지 못했습니다. 대분류 항목 이름으로 다시 물어봐 주세요.";
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-white">
      <header className="border-b px-4 py-3 font-semibold">솔빛 상담봇</header>
      <div className="flex gap-2 border-b px-3 py-2">
        {(Object.keys(rules) as Cat[]).map((c) => (
          <button key={c} onClick={() => pickCat(c)} className={`rounded-full px-3 py-1 text-sm ${cat === c ? "bg-black text-white" : "bg-neutral-100"}`}>
            {c}
          </button>
        ))}
      </div>
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
          push([...msgs, { from: "me", text: q }, { from: "bot", text: answer(q) }]);
          setText("");
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 rounded-full border px-4 py-2 text-sm" placeholder="규정을 입력하세요" />
        <button className="rounded-full bg-black px-4 text-white">전송</button>
      </form>
    </div>
  );
}
