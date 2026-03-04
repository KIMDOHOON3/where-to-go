"use client";

import { useState } from "react";
import FirstSection from "@/components/section/intro/firstSection";
import MainScreen from "@/components/section/main/MainScreen";

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  if (isOnboarded) {
    return <MainScreen />;
  }

  return <FirstSection onComplete={() => setIsOnboarded(true)} />;
}
