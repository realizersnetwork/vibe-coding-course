import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "HobbyFind",
  description: "운동형 · 지능형 · 예술형 취미 추천",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="bg-white text-neutral-900">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[#f7f7f7] text-neutral-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
