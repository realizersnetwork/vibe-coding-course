"use client";

import { useCallback, useEffect, useState } from "react";

type Board = number[][];

function empty(): Board {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function add(b: Board): Board {
  const n = b.map((r) => [...r]);
  const spots: [number, number][] = [];
  n.forEach((r, i) => r.forEach((v, j) => v === 0 && spots.push([i, j])));
  if (!spots.length) return n;
  const [i, j] = spots[Math.floor(Math.random() * spots.length)];
  n[i][j] = Math.random() < 0.9 ? 2 : 4;
  return n;
}

function slide(row: number[]): { row: number[]; score: number } {
  const nums = row.filter((n) => n);
  const out: number[] = [];
  let score = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      out.push(nums[i] * 2);
      score += nums[i] * 2;
      i++;
    } else out.push(nums[i]);
  }
  while (out.length < 4) out.push(0);
  return { row: out, score };
}

function rotate(b: Board): Board {
  return b[0].map((_, i) => b.map((r) => r[i]).reverse());
}

function move(b: Board, dir: "L" | "R" | "U" | "D"): { board: Board; score: number; moved: boolean } {
  let t = b.map((r) => [...r]);
  const times = { L: 0, U: 3, R: 2, D: 1 }[dir];
  for (let i = 0; i < times; i++) t = rotate(t);
  let score = 0;
  t = t.map((r) => {
    const s = slide(r);
    score += s.score;
    return s.row;
  });
  for (let i = 0; i < (4 - times) % 4; i++) t = rotate(t);
  const moved = t.some((r, i) => r.some((v, j) => v !== b[i][j]));
  return { board: t, score, moved };
}

function stuck(b: Board) {
  if (b.some((r) => r.includes(0))) return false;
  for (const dir of ["L", "R", "U", "D"] as const) {
    if (move(b, dir).moved) return false;
  }
  return true;
}

const colors: Record<number, string> = {
  0: "bg-[#cdc1b4]",
  2: "bg-[#eee4da] text-[#776e65]",
  4: "bg-[#ede0c8] text-[#776e65]",
  8: "bg-[#f2b179] text-white",
  16: "bg-[#f59563] text-white",
  32: "bg-[#f67c5f] text-white",
  64: "bg-[#f65e3b] text-white",
  128: "bg-[#edcf72] text-white",
  256: "bg-[#edcc61] text-white",
  512: "bg-[#edc850] text-white",
  1024: "bg-[#edc53f] text-white",
  2048: "bg-[#edc22e] text-white",
};

export default function Page() {
  const [board, setBoard] = useState<Board>(() => add(add(empty())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [dead, setDead] = useState(false);

  const play = useCallback((dir: "L" | "R" | "U" | "D") => {
    setBoard((b) => {
      const r = move(b, dir);
      if (!r.moved) return b;
      const next = add(r.board);
      setScore((s) => {
        const n = s + r.score;
        setBest((best) => Math.max(best, n));
        return n;
      });
      if (stuck(next)) setDead(true);
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, "L" | "R" | "U" | "D"> = {
        ArrowLeft: "L",
        ArrowRight: "R",
        ArrowUp: "U",
        ArrowDown: "D",
      };
      if (map[e.key]) {
        e.preventDefault();
        play(map[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play]);

  return (
    <div className="grid min-h-screen place-items-center text-[#776e65]">
      <div className="w-[min(92vw,420px)]">
        <div className="mb-4 flex items-end justify-between">
          <h1 className="text-5xl font-bold">2048</h1>
          <div className="flex gap-2 text-center text-white">
            <div className="rounded-md bg-[#bbada0] px-4 py-2 text-xs">
              SCORE<div className="text-lg font-bold">{score}</div>
            </div>
            <div className="rounded-md bg-[#bbada0] px-4 py-2 text-xs">
              BEST<div className="text-lg font-bold">{best}</div>
            </div>
          </div>
        </div>
        <button
          className="mb-3 rounded bg-[#8f7a66] px-3 py-1 text-sm text-white"
          onClick={() => {
            setBoard(add(add(empty())));
            setScore(0);
            setDead(false);
          }}
        >
          New Game
        </button>
        <div className="relative grid grid-cols-4 gap-2 rounded-md bg-[#bbada0] p-3">
          {board.flat().map((n, i) => (
            <div
              key={i}
              className={`grid aspect-square place-items-center rounded-md text-2xl font-bold ${colors[n] || "bg-[#3c3a32] text-white"}`}
            >
              {n || ""}
            </div>
          ))}
          {dead && (
            <div className="absolute inset-0 grid place-items-center bg-white/70 text-xl font-bold">Game over</div>
          )}
        </div>
        <p className="mt-3 text-sm">키보드 방향키로 조작 · 같은 숫자끼리 합쳐집니다.</p>
      </div>
    </div>
  );
}
