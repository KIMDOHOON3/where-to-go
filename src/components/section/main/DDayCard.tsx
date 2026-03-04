"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
`;

const Card = styled.div`
  background: linear-gradient(135deg, #fff5f4 0%, #ffeae8 100%);
  border-radius: 24px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 16px rgba(239, 68, 68, 0.08);
  margin: 0 16px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -0.8px;
`;

const DateRange = styled.p`
  font-size: 13px;
  color: #9e6b65;
  font-weight: 500;
  letter-spacing: -0.2px;
`;

const Right = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 12px 18px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.15);
  min-width: 90px;
`;

const DLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: #ef4444;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const DCount = styled.p`
  font-size: 28px;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -1px;
  line-height: 1;

  span {
    color: #ef4444;
  }
`;

const Heart = styled.p`
  font-size: 11px;
  color: #ef4444;
  font-weight: 600;
  margin-top: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

interface Props {
  startDate: Date;
  title?: string;
}

function formatDate(d: Date) {
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function DDayCard({ startDate, title = "우리의 이야기" }: Props) {
  const today = new Date();
  const diff =
    Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const endStr = formatDate(today);
  const startStr = formatDate(startDate);

  // milestone title
  const milestone =
    diff === 100
      ? "우리 100일"
      : diff === 200
      ? "우리 200일"
      : diff === 365
      ? "우리 1주년"
      : title;

  return (
    <Card>
      <Left>
        <Title>{milestone}</Title>
        <DateRange>
          {startStr} — {endStr}
        </DateRange>
      </Left>
      <Right>
        <DLabel>D-Day</DLabel>
        <DCount>
          <span>D+</span>
          {diff}
        </DCount>
        <Heart>♥ days</Heart>
      </Right>
    </Card>
  );
}
