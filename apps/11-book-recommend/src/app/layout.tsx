import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Shelf — 유명인 추천 도서" };
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
