import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "솔빛수학 — 움직이는 학원 랜딩",
  description: "캐러셀·페이드 인터랙션이 있는 학원 소개 랜딩. Step 3 실습",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
