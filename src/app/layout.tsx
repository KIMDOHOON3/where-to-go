import type { Metadata } from "next";
import "@/styles/globals.css";
import EmotionRegistry from "@/providers/EmotionRegistry";

export const metadata: Metadata = {
  title: "Couple App",
  description: "CSS + Emotion starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}
