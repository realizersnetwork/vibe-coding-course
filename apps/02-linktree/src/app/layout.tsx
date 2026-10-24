import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "리프 — 링크를 한곳에",
  description: "LinkTree 클론코딩",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
