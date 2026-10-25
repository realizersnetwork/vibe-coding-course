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
    <div className="grid min-h-screen place-items-center bg-[#f7f7f7] px-4">
      <form
        className="w-[min(92vw,380px)] rounded-2xl bg-white p-8 shadow-sm"
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
          location.href = "/mypage";
        }}
      >
        <Link href="/" className="text-sm text-[#FF385C]">
          ← HobbyFind
        </Link>
        <h1 className="mt-4 text-2xl font-bold">로그인</h1>
        <input
          required
          className="mt-6 w-full rounded-lg border px-3 py-2"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="mt-2 w-full rounded-lg border px-3 py-2"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        <button disabled={loading} className="mt-4 w-full rounded-lg bg-[#FF385C] py-2 text-white">
          {loading ? "확인 중..." : "로그인"}
        </button>
        {process.env.NEXT_PUBLIC_KAKAO_ENABLED === "1" && (
          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-[#FEE500] py-2 text-sm font-medium text-black"
            onClick={() => signIn("kakao", { callbackUrl: "/mypage" })}
          >
            카카오로 로그인
          </button>
        )}
        <p className="mt-3 text-center text-sm">
          계정이 없나요?{" "}
          <Link href="/signup" className="text-[#FF385C]">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}
