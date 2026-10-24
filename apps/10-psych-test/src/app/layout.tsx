import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "결혼관 유형 테스트" };
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
