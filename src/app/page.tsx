"use client";

import { useEffect, useState } from "react";
import FirstSection from "@/components/section/intro/firstSection";
import MainScreen from "@/components/section/main/MainScreen";
import { useCoupleStore } from "@/store/useCoupleStore";

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false);
  const isOnboarded = useCoupleStore((state) => state.isOnboarded);
  const setOnboarded = useCoupleStore((state) => state.setOnboarded);

  // Hydration 완료 대기 (SSR/CSR 불일치 방지)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Hydration 전에는 로딩 상태 표시
  if (!isHydrated) {
    return null;
  }

  if (isOnboarded) {
    return <MainScreen />;
  }

  return <FirstSection onComplete={() => setOnboarded(true)} />;
}
