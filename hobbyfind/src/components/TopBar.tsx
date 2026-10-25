"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CATEGORIES } from "@/data/hobbies";

export default function TopBar() {
  const { data, status } = useSession();
  const loggedIn = status === "authenticated" && data?.user;

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 text-sm">
        <Link href="/" className="text-lg font-bold text-[#FF385C]">
          HobbyFind
        </Link>
        <nav className="hidden gap-5 md:flex">
          {CATEGORIES.map((c) => (
            <Link key={c.key} href={`/category/${c.key}`} className="text-neutral-600 hover:text-neutral-900">
              {c.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <span className="text-neutral-400">확인 중...</span>
          ) : loggedIn ? (
            <>
              <Link href="/mypage" className="font-medium">
                마이페이지
              </Link>
              <button type="button" className="rounded-full border px-3 py-1" onClick={() => signOut({ callbackUrl: "/" })}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login">로그인</Link>
              <Link href="/signup" className="rounded-full bg-[#FF385C] px-3 py-1.5 font-medium text-white">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
