"use client";

import { useState } from "react";

const questions = [
  { q: "연인의 흡연 습관에 대해 어떻게 생각하세요?", a: ["흡연은 건강에 해롭고 결혼 생활에도 지장 줄 수 있어 반대한다", "가끔이나 상황에 따라 괜찮지만, 건강과 배려를 지켜 줬으면 좋겠다", "크게 상관없다. 본인의 자유라고 생각한다"] },
  { q: "결혼 후 돈 관리는?", a: ["공동 계좌 중심", "각자 관리 + 생활비", "상황에 따라"] },
  { q: "아이 계획은?", a: ["꼭 갖고 싶다", "아직 모르겠다", "없어도 된다"] },
  { q: "주말의 이상적인 모습은?", a: ["집에서 회복", "바깥 데이트", "친구/가족과 시간"] },
];

const types = [
  { name: "현실 안착형", tags: ["안정", "실용", "계획", "배려"], talk: ["결혼 후 재정 계획", "가족과의 관계 유지 방법", "육아와 교육관"] },
  { name: "자유 동반형", tags: ["자율", "대화", "유연"], talk: ["각자의 시간과 공간", "여행 빈도", "커리어 우선순위"] },
];

export default function Page() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const done = i >= questions.length;
  const result = score >= 4 ? types[0] : types[1];

  if (done) {
    return (
      <div className="mx-auto min-h-screen max-w-xl px-5 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-violet-400">총 {questions.length}개 질문 중 {questions.length}개 답변 완료</p>
          <h1 className="mt-4 text-3xl font-bold text-violet-900">{result.name}</h1>
          <div className="mt-3 flex gap-2">
            {result.tags.map((t) => (
              <span key={t} className="rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-700">#{t}</span>
            ))}
          </div>
          <h2 className="mt-8 font-semibold text-violet-800">추천 대화 주제</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600">
            {result.talk.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <button className="mt-8 text-sm text-violet-500" onClick={() => { setI(0); setScore(0); }}>처음부터</button>
        </div>
      </div>
    );
  }

  const cur = questions[i];
  return (
    <div className="mx-auto min-h-screen max-w-xl px-5 py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-center text-sm font-semibold text-violet-500">결혼관 유형 테스트</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-violet-100">
          <div className="h-full bg-violet-500" style={{ width: `${(i / questions.length) * 100}%` }} />
        </div>
        <h1 className="mt-8 text-xl font-bold text-violet-900">{cur.q}</h1>
        <div className="mt-6 space-y-3">
          {cur.a.map((opt, idx) => (
            <button
              key={opt}
              className="block w-full rounded-2xl border px-4 py-3 text-left text-sm hover:border-violet-400"
              onClick={() => {
                setScore((s) => s + (idx === 0 ? 2 : idx === 1 ? 1 : 0));
                setI(i + 1);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-between text-xs text-violet-400">
          <button disabled={i === 0} onClick={() => setI(Math.max(0, i - 1))}>이전</button>
          <span>{i + 1} / {questions.length}</span>
        </div>
      </div>
    </div>
  );
}
