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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const EmptyEmoji = styled.span`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  font-size: 15px;
  color: #999;
  font-weight: 500;
  line-height: 1.5;
`;

interface Props {
  memories?: Memory[];
  activeFilter?: string;
  onFilterChange?: (f: string) => void;
  showAll?: boolean;
  onMemoryClick?: (memory: Memory) => void;
}

export default function MemoryGrid({
  memories = [],
  activeFilter = "전체",
  onFilterChange,
  showAll = false,
  onMemoryClick,
}: Props) {
  // 위치 목록 동적 생성
  const locations = ["전체", ...Array.from(new Set(memories.map((m) => m.location)))];

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

      {memories.length > 0 && (
        <FilterRow>
          {locations.map((loc) => (
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
      )}

      {displayed.length > 0 ? (
        <Grid>
          {displayed.map((m) => (
            <MemoryCard
              key={m.id}
              color={m.color}
              onClick={() => onMemoryClick?.(m)}
            >
              <MemoryImg color={m.color}>{m.emoji}</MemoryImg>
              <MemoryInfo>
                <MemoryTitle>{m.title}</MemoryTitle>
                <MemoryMeta>📍{m.location} {m.date}</MemoryMeta>
              </MemoryInfo>
            </MemoryCard>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <EmptyEmoji>📸</EmptyEmoji>
          <EmptyText>
            아직 등록된 추억이 없어요<br />
            첫 추억을 등록해보세요!
          </EmptyText>
        </EmptyState>
      )}
    </Wrap>
  );
}
