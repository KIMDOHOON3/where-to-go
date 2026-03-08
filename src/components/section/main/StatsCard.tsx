"use client";

import styled from "@emotion/styled";
import { useCoupleStore, useStartDate } from "@/store/useCoupleStore";

const Wrap = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  margin: 0 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #666;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const StatItem = styled.div<{ color: string }>`
  background: ${({ color }) => color}15;
  border-radius: 16px;
  padding: 16px 12px;
  text-align: center;
`;

const StatEmoji = styled.span`
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
`;

const StatValue = styled.p<{ color: string }>`
  font-size: 24px;
  font-weight: 800;
  color: ${({ color }) => color};
  letter-spacing: -0.5px;
`;

const StatLabel = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
  font-weight: 500;
`;

export default function StatsCard() {
  const startDate = useStartDate();
  const memories = useCoupleStore((state) => state.memories);
  const events = useCoupleStore((state) => state.events);

  // 함께한 일수 계산
  const daysTogether = startDate
    ? Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  return (
    <Wrap>
      <Title>우리의 기록</Title>
      <Grid>
        <StatItem color="#ef4444">
          <StatEmoji>💕</StatEmoji>
          <StatValue color="#ef4444">{daysTogether}</StatValue>
          <StatLabel>함께한 날</StatLabel>
        </StatItem>

        <StatItem color="#8b5cf6">
          <StatEmoji>📸</StatEmoji>
          <StatValue color="#8b5cf6">{memories.length}</StatValue>
          <StatLabel>추억</StatLabel>
        </StatItem>

        <StatItem color="#f97316">
          <StatEmoji>🎉</StatEmoji>
          <StatValue color="#f97316">{events.length}</StatValue>
          <StatLabel>기념일</StatLabel>
        </StatItem>
      </Grid>
    </Wrap>
  );
}
