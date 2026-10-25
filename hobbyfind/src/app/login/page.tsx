"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const e = new URLSearchParams(location.search).get("error");
    if (!e) return;
    if (e === "google" || e === "OAuthSignin" || e === "OAuthCallback") {
      setErr("소셜 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } else {
      setErr("로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }, []);

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
        <h1 className="mt-4 text-center text-2xl font-bold">로그인</h1>
        <p className="mt-1 text-center text-sm text-neutral-500">계정에 로그인하여 취미를 북마크하고 관리하세요</p>
        <label className="mt-6 block text-sm font-medium">이메일</label>
        <input
          required
          type="email"
          className="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mt-3 block text-sm font-medium">비밀번호</label>
        <input
          required
          className="mt-1 w-full rounded-lg border px-3 py-2"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        <button disabled={loading} className="mt-4 w-full rounded-lg bg-[#FF385C] py-2 text-white">
          {loading ? "확인 중..." : "로그인"}
        </button>
        <button
          type="button"
          className="mt-2 w-full rounded-lg border py-2 text-sm font-medium"
          onClick={() => signIn("google", { callbackUrl: "/mypage" })}
        >
          Google로 로그인
        </button>
        <button
          type="button"
          className="mt-2 w-full rounded-lg bg-[#FEE500] py-2 text-sm font-medium text-black"
          onClick={() => signIn("kakao", { callbackUrl: "/mypage" })}
        >
          카카오로 로그인
        </button>
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
