"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import MemoryGrid from "@/components/section/main/MemoryGrid";
import { SAMPLE_MEMORIES } from "@/components/section/main/MemoryGrid";

const Wrap = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 90px;
  background: #faf5f4;
`;

const Header = styled.div`
  padding: 20px 16px 16px;
  background: linear-gradient(160deg, #fff5f4 0%, #ffeae8 100%);
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -0.8px;
  margin-bottom: 4px;
`;

const Sub = styled.p`
  font-size: 14px;
  color: #9e6b65;
  font-weight: 500;
`;

const GridWrap = styled.div`
  padding: 20px 0 0;
`;

const AddBtn = styled.button`
  margin: 20px 16px 0;
  width: calc(100% - 32px);
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

export default function GalleryTab() {
  const [activeFilter, setActiveFilter] = useState("전체");

  const filtered =
    activeFilter === "전체"
      ? SAMPLE_MEMORIES
      : SAMPLE_MEMORIES.filter((m) => m.location === activeFilter);

  return (
    <Wrap>
      <Header>
        <Title>추억 사진첩</Title>
        <Sub>우리가 함께한 소중한 순간들</Sub>
      </Header>

      <GridWrap>
        <MemoryGrid
          memories={filtered}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          showAll
        />
      </GridWrap>

      <AddBtn>+ 새 추억 등록</AddBtn>
    </Wrap>
  );
}
