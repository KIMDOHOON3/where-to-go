"use client";

import styled from "@emotion/styled";
import MiniCalendar from "@/components/section/main/MiniCalendar";

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

const CalendarWrap = styled.div`
  padding: 20px 0;
`;

export default function CalendarTab() {
  return (
    <Wrap>
      <Header>
        <Title>캘린더</Title>
        <Sub>우리의 특별한 날들</Sub>
      </Header>
      <CalendarWrap>
        <MiniCalendar />
      </CalendarWrap>
    </Wrap>
  );
}
