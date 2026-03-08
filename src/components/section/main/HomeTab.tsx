"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import DDayCard from "@/components/section/main/DDayCard";
import MiniCalendar from "@/components/section/main/MiniCalendar";
import MemoryGrid from "@/components/section/main/MemoryGrid";
import AddMemoryModal from "@/components/modal/AddMemoryModal";
import { useCoupleStore, useStartDate } from "@/store/useCoupleStore";

const Wrap = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 90px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #faf5f4;
`;

const AddBtn = styled.button`
  margin: 0 16px;
  padding: 18px;
  border-radius: 50px;
  border: none;
  background: linear-gradient(135deg, #f87171, #ef4444);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  font-family: "Pretendard", sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.35);
  letter-spacing: -0.3px;
  transition: all 0.15s ease;

  &:active { transform: scale(0.98); }
`;

export default function HomeTab() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [showModal, setShowModal] = useState(false);
  const startDate = useStartDate();
  const coupleTitle = useCoupleStore((state) => state.coupleTitle);
  const memories = useCoupleStore((state) => state.memories);

  // store memories를 MemoryGrid 형식으로 변환
  const formattedMemories = memories.map((m) => ({
    ...m,
    date: new Date(m.date).toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\. /g, ".").replace(/\.$/, ""),
  }));

  return (
    <Wrap>
      {startDate && <DDayCard startDate={startDate} title={coupleTitle} />}
      <MiniCalendar />
      <MemoryGrid
        memories={formattedMemories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <AddBtn onClick={() => setShowModal(true)}>+ 새 추억 등록</AddBtn>

      {showModal && <AddMemoryModal onClose={() => setShowModal(false)} />}
    </Wrap>
  );
}
