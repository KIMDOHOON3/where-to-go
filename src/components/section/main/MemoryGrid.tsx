"use client";

import styled from "@emotion/styled";

export interface Memory {
  id: string;
  title: string;
  location: string;
  date: string;
  emoji: string;
  color: string;
}

export const SAMPLE_MEMORIES: Memory[] = [
  { id: "1", title: "대전 여행", location: "대전", date: "23.11.10", emoji: "🌳", color: "#a3d9a5" },
  { id: "2", title: "함정 카페", location: "함정", date: "24.01.10", emoji: "☕", color: "#f4c997" },
  { id: "3", title: "함정 데이트", location: "함정", date: "24.01.10", emoji: "🌊", color: "#93c5fd" },
  { id: "4", title: "브런치", location: "서울", date: "24.01.15", emoji: "🥐", color: "#fde68a" },
  { id: "5", title: "제주 여행", location: "제주", date: "24.01.20", emoji: "🍊", color: "#fca5a5" },
  { id: "6", title: "한강 피크닉", location: "서울", date: "24.01.22", emoji: "🌸", color: "#d8b4fe" },
];

const LOCATIONS = ["전체", "대전", "함정", "서울", "제주"];

const Wrap = styled.div`
  padding: 0 16px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
`;

const FilterChip = styled.button<{ active: boolean }>`
  flex-shrink: 0;
  padding: 6px 16px;
  border-radius: 20px;
  border: ${({ active }) => (active ? "none" : "1.5px solid #e8d8d6")};
  background: ${({ active }) => (active ? "linear-gradient(135deg, #f87171, #ef4444)" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#888")};
  font-size: 13px;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const MemoryCard = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:active { transform: scale(0.97); }
`;

const MemoryImg = styled.div<{ color: string }>`
  aspect-ratio: 1;
  background: ${({ color }) => color}60;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  border-radius: 14px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.12) 100%);
  }
`;

const MemoryInfo = styled.div`
  padding: 6px 2px 0;
`;

const MemoryTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemoryMeta = styled.p`
  font-size: 11px;
  color: #b0a09e;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

interface Props {
  memories?: Memory[];
  activeFilter?: string;
  onFilterChange?: (f: string) => void;
  showAll?: boolean;
}

export default function MemoryGrid({
  memories = SAMPLE_MEMORIES,
  activeFilter = "전체",
  onFilterChange,
  showAll = false,
}: Props) {
  const filtered =
    activeFilter === "전체"
      ? memories
      : memories.filter((m) => m.location === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <Wrap>
      <SectionHeader>
        <SectionTitle>추억 사진첩</SectionTitle>
      </SectionHeader>

      <FilterRow>
        {LOCATIONS.map((loc) => (
          <FilterChip
            key={loc}
            active={activeFilter === loc}
            onClick={() => onFilterChange?.(loc)}
          >
            {loc === activeFilter && loc !== "전체" ? "📍" : ""}
            {loc}
          </FilterChip>
        ))}
      </FilterRow>

      <Grid>
        {displayed.map((m) => (
          <MemoryCard key={m.id} color={m.color}>
            <MemoryImg color={m.color}>{m.emoji}</MemoryImg>
            <MemoryInfo>
              <MemoryTitle>{m.title}</MemoryTitle>
              <MemoryMeta>📍{m.location} {m.date}</MemoryMeta>
            </MemoryInfo>
          </MemoryCard>
        ))}
      </Grid>
    </Wrap>
  );
}
