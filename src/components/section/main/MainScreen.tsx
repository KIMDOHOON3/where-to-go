"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import BottomNav, { TabType } from "@/components/layout/BottomNav";
import HomeTab from "@/components/section/main/HomeTab";
import CalendarTab from "@/components/section/main/CalendarTab";
import GalleryTab from "@/components/section/gallery/GalleryTab";
import MoreTab from "@/components/section/main/MoreTab";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Shell = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  background: #ffeae8;
`;

const Phone = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #faf5f4;
  overflow: hidden;

  @media (min-width: 600px) {
    min-height: 844px;
    max-height: 844px;
    border-radius: 48px;
    margin: 24px 0;
    box-shadow:
      0 32px 80px rgba(0, 0, 0, 0.22),
      0 0 0 1px rgba(0, 0, 0, 0.06);
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  animation: ${fadeIn} 0.25s ease;
`;

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  return (
    <Shell>
      <Phone>
        <TabContent key={activeTab}>
          {activeTab === "home" && <HomeTab />}
          {activeTab === "calendar" && <CalendarTab />}
          {activeTab === "gallery" && <GalleryTab />}
          {activeTab === "more" && <MoreTab />}
        </TabContent>

        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      </Phone>
    </Shell>
  );
}
