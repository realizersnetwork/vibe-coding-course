"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { id: number; from: "me" | "you"; text: string; time: string };

function now() {
  const d = new Date();
  const am = d.getHours() < 12 ? "오전" : "오후";
  const h = d.getHours() % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${am} ${h}:${m}`;
}

export default function Page() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 1, from: "you", text: "안녕하세요", time: "오전 10:00" },
    { id: 2, from: "me", text: "반갑습니다", time: "오전 10:01" },
    { id: 3, from: "me", text: "커서로 카카오톡 클론코딩하니까 정말 재밌네요!", time: "오후 5:19" },
  ]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send() {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "me", text: t, time: now() }]);
    setText("");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#b2c7d9]">
      <header className="flex h-12 items-center justify-between bg-[#a9bdce] px-3 text-sm">
        <span>← 채팅방 이름</span>
        <span className="flex gap-3 text-base">🔔 ⇥</span>
      </header>
      <main className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
        {msgs.map((m) => (
          <div key={m.id} className={`flex items-end gap-1 ${m.from === "me" ? "justify-end" : ""}`}>
            {m.from === "you" && (
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs">사</div>
            )}
            {m.from === "me" && <span className="text-[10px] text-black/50">{m.time}</span>}
            <div
              className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                m.from === "me" ? "bg-[#FEE500]" : "bg-white"
              }`}
            >
              {m.text}
            </div>
            {m.from === "you" && <span className="text-[10px] text-black/50">{m.time}</span>}
          </div>
        ))}
        <div ref={end} />
      </main>
      <form
        className="flex items-center gap-2 bg-white px-3 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="h-10 flex-1 rounded-full border border-[#ddd] px-4 text-sm outline-none"
        />
        <button type="submit" className="grid h-10 w-10 place-items-center rounded-full bg-[#FEE500]">
          ➤
        </button>
      </form>
    </div>
  );
}
