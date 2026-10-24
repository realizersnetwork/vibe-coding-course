"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="grid min-h-screen place-items-center bg-rose-50">
      <form
        className="w-[min(92vw,360px)] rounded-2xl bg-white p-8 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const saved = localStorage.getItem("hobbyfind-users");
          const users = saved ? JSON.parse(saved) as { email: string; password: string }[] : [];
          if (users.some((u) => u.email === email)) return;
          users.push({ email, password });
          localStorage.setItem("hobbyfind-users", JSON.stringify(users));
          localStorage.setItem("hobbyfind-user", email);
          location.href = "/mypage";
        }}
      >
        <Link href="/" className="text-sm text-rose-600">← HobbyFind</Link>
        <h1 className="mt-4 text-2xl font-bold">회원가입</h1>
        <input required className="mt-6 w-full rounded-lg border px-3 py-2" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required minLength={4} className="mt-2 w-full rounded-lg border px-3 py-2" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="mt-4 w-full rounded-lg bg-rose-600 py-2 text-white">가입하기</button>
      </form>
    </div>
  );
}
