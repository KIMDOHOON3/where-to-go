"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import DDayCard from "@/components/section/main/DDayCard";
import MiniCalendar from "@/components/section/main/MiniCalendar";
import MemoryGrid from "@/components/section/main/MemoryGrid";

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

// 시작일 — 실제 앱에서는 전역 상태에서 가져옴
const START_DATE = new Date(2023, 9, 15); // 2023.10.15

export default function HomeTab() {
  const [activeFilter, setActiveFilter] = useState("전체");

  return (
    <Wrap>
      <DDayCard startDate={START_DATE} title="우리의 이야기" />
      <MiniCalendar />
      <MemoryGrid
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <AddBtn>+ 새 추억 등록</AddBtn>
    </Wrap>
  );
}
