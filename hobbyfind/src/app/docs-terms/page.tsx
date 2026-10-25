import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <Link href="/signup" className="text-sm text-[#FF385C]">
        ← 회원가입
      </Link>
      <h1 className="mt-4 text-2xl font-bold">HobbyFind 이용약관</h1>
      <p className="mt-4 text-sm leading-6 text-neutral-600">
        HobbyFind는 취미 탐색과 북마크를 위한 학습용 서비스입니다. 이메일과 비밀번호는 인증 목적으로만
        사용하며, 북마크 데이터는 회원 계정에 연결해 저장합니다.
      </p>
    </main>
  );
}
