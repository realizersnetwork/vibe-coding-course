import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "노란톡 — 채팅방",
  description: "카카오톡 채팅방 1페이지 클론",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
