"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
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
          const res = await signIn("credentials", { email, password, redirect: false });
          setLoading(false);
          if (res?.error) {
            setErr(res.error === "CredentialsSignin" ? "이메일 또는 비밀번호가 다릅니다." : res.error);
            return;
          }
          location.href = "/";
        }}
      >
        <Link href="/" className="font-serif text-3xl">
          Shelf
        </Link>
        <h1 className="mt-4 text-lg font-semibold">로그인</h1>
        <input className="mt-6 w-full border px-3 py-2" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="mt-2 w-full border px-3 py-2" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        <button disabled={loading} className="mt-4 w-full bg-black py-2 text-white">
          {loading ? "확인 중..." : "로그인"}
        </button>
        <p className="mt-3 text-center text-sm">
          계정이 없나요?{" "}
          <Link href="/signup" className="underline">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}
