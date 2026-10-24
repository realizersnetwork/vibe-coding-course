import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "HobbyFind",
  description: "운동형 · 지능형 · 예술형 취미 추천",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
