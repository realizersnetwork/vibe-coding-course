import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "다른 색깔 찾기" };
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
