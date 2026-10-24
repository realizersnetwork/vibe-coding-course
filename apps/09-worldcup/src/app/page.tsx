"use client";

import { useMemo, useState } from "react";

const seed = [
  ["한강 야경", "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800"],
  ["제주 바다", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"],
  ["캠핑", "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800"],
  ["카페", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"],
  ["산", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"],
  ["전시", "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800"],
  ["영화", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800"],
  ["맛집", "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"],
].map(([name, img], i) => ({ id: i, name, img }));

export default function Page() {
  const [round, setRound] = useState(seed);
  const [idx, setIdx] = useState(0);
  const [next, setNext] = useState<typeof seed>([]);
  const left = round[idx];
  const right = round[idx + 1];
  const title = useMemo(() => {
    if (round.length === 1) return "우승";
    return `${round.length}강`;
  }, [round]);

  function pick(item: (typeof seed)[0]) {
    const n = [...next, item];
    if (idx + 2 >= round.length) {
      setRound(n);
      setNext([]);
      setIdx(0);
    } else {
      setNext(n);
      setIdx(idx + 2);
    }
  }

  if (round.length === 1) {
    return (
      <div className="grid min-h-screen place-items-center bg-neutral-950 text-white">
        <div className="text-center">
          <p className="text-sm text-white/60">최종 우승</p>
          <img src={round[0].img} alt="" className="mx-auto mt-4 h-64 w-80 rounded-xl object-cover" />
          <h1 className="mt-4 text-3xl font-bold">{round[0].name}</h1>
          <button className="mt-6 rounded bg-white px-4 py-2 text-black" onClick={() => { setRound(seed); setIdx(0); setNext([]); }}>다시</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <h1 className="pt-8 text-center text-2xl font-bold">주말 데이트 {title}</h1>
      <p className="text-center text-white/50">{idx / 2 + 1} / {round.length / 2}</p>
      <div className="mx-auto mt-8 grid max-w-5xl gap-4 px-4 md:grid-cols-2">
        {[left, right].map((item) => (
          <button key={item.id} onClick={() => pick(item)} className="overflow-hidden rounded-2xl bg-neutral-900">
            <img src={item.img} alt={item.name} className="h-72 w-full object-cover" />
            <p className="p-4 text-xl font-semibold">{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
