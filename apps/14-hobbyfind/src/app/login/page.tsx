"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  return (
    <div className="grid min-h-screen place-items-center bg-rose-50">
      <form
        className="w-[min(92vw,360px)] rounded-2xl bg-white p-8 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const saved = localStorage.getItem("hobbyfind-users");
          const users = saved ? JSON.parse(saved) as { email: string; password: string }[] : [];
          const ok = users.find((u) => u.email === email && u.password === password);
          if (!ok) {
            setErr("이메일 또는 비밀번호가 다릅니다. 먼저 회원가입 하세요.");
            return;
          }
          localStorage.setItem("hobbyfind-user", email);
          location.href = "/mypage";
        }}
      >
        <Link href="/" className="text-sm text-rose-600">← HobbyFind</Link>
        <h1 className="mt-4 text-2xl font-bold">로그인</h1>
        <input className="mt-6 w-full rounded-lg border px-3 py-2" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mt-2 w-full rounded-lg border px-3 py-2" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        <button className="mt-4 w-full rounded-lg bg-rose-600 py-2 text-white">로그인</button>
        <p className="mt-3 text-center text-sm">
          계정이 없나요? <Link href="/signup" className="text-rose-600">회원가입</Link>
        </p>
      </form>
    </div>
  );
}
