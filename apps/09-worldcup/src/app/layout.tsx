import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "이상형 월드컵" };
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
