"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid min-h-screen place-items-center bg-[#f7f4ef] px-4">
      <form
        className="w-80 bg-white p-8 shadow"
        onSubmit={async (e) => {
          e.preventDefault();
          setErr("");
          setLoading(true);
          const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const j = await res.json();
          if (!res.ok) {
            setLoading(false);
            setErr(j.error || "가입에 실패했습니다.");
            return;
          }
          const login = await signIn("credentials", { email, password, redirect: false });
          setLoading(false);
          if (login?.error) {
            setErr(login.error);
            return;
          }
          location.href = "/";
        }}
      >
        <Link href="/" className="font-serif text-3xl">
          Shelf
        </Link>
        <h1 className="mt-4 text-lg font-semibold">회원가입</h1>
        <input className="mt-6 w-full border px-3 py-2" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="mt-2 w-full border px-3 py-2" type="password" placeholder="비밀번호 (4자 이상)" minLength={4} value={password} onChange={(e) => setPassword(e.target.value)} required />
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        <button disabled={loading} className="mt-4 w-full bg-black py-2 text-white">
          {loading ? "가입 중..." : "가입하기"}
        </button>
        <p className="mt-3 text-center text-sm">
          이미 계정이 있나요?{" "}
          <Link href="/login" className="underline">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
