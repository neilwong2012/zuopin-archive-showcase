import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zuopin-archive-neil.neil-wong2012.chatgpt.site"),
  title: "作品档案｜743 个网站与小程序源码展示",
  description:
    "从真实网站与小程序源码中整理、按原始样式还原的交互式作品展示，首批完成 6 个代表案例。",
  openGraph: {
    title: "作品档案｜让旧源码按原样重现",
    description: "从 743 个真实源码中，重新发现好作品。",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "作品档案首批六个源码还原作品" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "作品档案｜让旧源码按原样重现",
    description: "从 743 个真实源码中，重新发现好作品。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
