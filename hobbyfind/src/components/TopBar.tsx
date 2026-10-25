"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CATEGORIES } from "@/data/hobbies";

export default function TopBar() {
  const { data, status } = useSession();
  const loggedIn = status === "authenticated" && data?.user;

  return (
    <header className="sticky top-0 z-20 border-b border-[#E5E5E5] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 text-sm">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#FF385C]">
          HobbyFind
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {CATEGORIES.map((c) => (
            <Link key={c.key} href={`/category/${c.key}`} className="text-[#222222] hover:text-[#FF385C]">
              {c.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <span className="text-neutral-400">확인 중...</span>
          ) : loggedIn ? (
            <>
              <Link href="/mypage" className="rounded-full px-3 py-1.5 font-medium hover:bg-[#F7F7F7]">
                마이페이지
              </Link>
              <button
                type="button"
                className="rounded-full border border-[#E5E5E5] px-3 py-1.5"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full px-3 py-1.5 hover:bg-[#F7F7F7]">
                로그인
              </Link>
              <Link href="/signup" className="rounded-full bg-[#FF385C] px-4 py-1.5 font-medium text-white">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-[#E5E5E5] px-5 py-2 text-sm md:hidden">
        {CATEGORIES.map((c) => (
          <Link key={c.key} href={`/category/${c.key}`} className="whitespace-nowrap text-[#222222]">
            {c.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
