"use client";

import { useEffect, useMemo, useState } from "react";

function hsl(h: number, l: number) {
  return `hsl(${h} 70% ${l}%)`;
}

export default function Page() {
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(15);
  const [over, setOver] = useState(false);

  const size = Math.min(2 + Math.floor((stage - 1) / 2), 7);
  const cells = size * size;
  const odd = useMemo(() => Math.floor(Math.random() * cells), [stage, cells]);
  const hue = useMemo(() => Math.floor(Math.random() * 360), [stage]);
  const delta = Math.max(4, 18 - stage);

  useEffect(() => {
    if (over) return;
    const t = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setOver(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [over]);

  function click(i: number) {
    if (over) return;
    if (i === odd) {
      setScore((s) => s + 1);
      setStage((s) => s + 1);
    } else {
      setLeft((s) => Math.max(0, s - 3));
      if (left <= 3) setOver(true);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-neutral-100">
      <div className="w-[min(92vw,420px)]">
        <p className="mb-3 text-sm">스테이지: {stage}, 남은 시간: {left}, 점수: {score}</p>
        {over ? (
          <div className="rounded-xl bg-white p-8 text-center">
            <p className="text-xl font-bold">종료</p>
            <p className="mt-2">점수 {score}</p>
            <button
              className="mt-4 rounded bg-black px-4 py-2 text-white"
              onClick={() => {
                setStage(1);
                setScore(0);
                setLeft(15);
                setOver(false);
              }}
            >
              다시
            </button>
          </div>
        ) : (
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {Array.from({ length: cells }, (_, i) => (
              <button
                key={`${stage}-${i}`}
                className="aspect-square"
                style={{ background: hsl(hue, i === odd ? 38 : 38 + delta) }}
                onClick={() => click(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
