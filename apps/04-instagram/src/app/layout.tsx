import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMI — 순간을 담다",
  description: "사진 피드 소셜. Step 2 인스타그램 클론코딩 실습",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
