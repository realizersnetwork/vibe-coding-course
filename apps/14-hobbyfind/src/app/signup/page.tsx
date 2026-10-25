"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid min-h-screen place-items-center bg-[#f7f7f7] px-4">
      <form
        className="w-[min(92vw,380px)] rounded-2xl bg-white p-8 shadow-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          setErr("");
          if (password !== confirm) {
            setErr("비밀번호가 일치하지 않습니다.");
            return;
          }
          if (!agree) {
            setErr("이용약관에 동의해 주세요.");
            return;
          }
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
          location.href = "/mypage";
        }}
      >
        <Link href="/" className="text-sm text-[#FF385C]">
          ← HobbyFind
        </Link>
        <h1 className="mt-4 text-2xl font-bold">회원가입</h1>
        <input
          required
          className="mt-6 w-full rounded-lg border px-3 py-2"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          minLength={4}
          className="mt-2 w-full rounded-lg border px-3 py-2"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          minLength={4}
          className="mt-2 w-full rounded-lg border px-3 py-2"
          type="password"
          placeholder="비밀번호 확인"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <label className="mt-3 flex items-start gap-2 text-sm text-neutral-600">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>
            <Link href="/docs-terms" className="underline">
              이용약관
            </Link>
            에 동의합니다.
          </span>
        </label>
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        <button disabled={loading} className="mt-4 w-full rounded-lg bg-[#FF385C] py-2 text-white">
          {loading ? "가입 중..." : "가입하기"}
        </button>
        <p className="mt-3 text-center text-sm">
          이미 계정이 있나요?{" "}
          <Link href="/login" className="text-[#FF385C]">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
