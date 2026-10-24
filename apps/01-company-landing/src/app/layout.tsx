import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "솔빛수학 — 생각하는 힘을 키우는 학원",
  description: "기업 소개 랜딩페이지 실습",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
