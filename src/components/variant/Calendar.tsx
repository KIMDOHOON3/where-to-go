"use client";

import styled from "@emotion/styled";
import { useState } from "react";

interface CalendarProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

const Wrapper = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const MonthTitle = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #212121;
  letter-spacing: -0.3px;
`;

const NavBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #555;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.15s;
  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayLabel = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #9ca3af;
  padding: 4px 0 8px;
`;

const DayCell = styled.button<{
  isSelected: boolean;
  isToday: boolean;
  isEmpty: boolean;
}>`
  aspect-ratio: 1;
  border: none;
  border-radius: 50%;
  font-size: 15px;
  font-weight: ${({ isSelected, isToday }) =>
    isSelected || isToday ? "700" : "400"};
  cursor: ${({ isEmpty }) => (isEmpty ? "default" : "pointer")};
  background: ${({ isSelected }) =>
    isSelected
      ? "linear-gradient(135deg, #f87171, #ef4444)"
      : "transparent"};
  color: ${({ isSelected, isToday, isEmpty }) => {
    if (isEmpty) return "transparent";
    if (isSelected) return "#fff";
    if (isToday) return "#ef4444";
    return "#212121";
  }};
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0 2px 8px rgba(239,68,68,0.35)" : "none"};
  transition: all 0.15s ease;
  font-family: "Pretendard", sans-serif;

  &:hover {
    background: ${({ isSelected, isEmpty }) =>
      isSelected || isEmpty ? undefined : "rgba(239,68,68,0.1)"};
    color: ${({ isSelected, isEmpty }) =>
      isSelected || isEmpty ? undefined : "#ef4444"};
  }
`;

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  // 0=Sun, convert to Mon-first: Mon=0
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

export default function Calendar({ selectedDate, onSelect }: CalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(
    selectedDate?.getFullYear() ?? today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    selectedDate?.getMonth() ?? today.getMonth()
  );

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDow = getFirstDayOfWeek(viewYear, viewMonth);

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <Wrapper>
      <Header>
        <NavBtn onClick={prevMonth}>‹</NavBtn>
        <MonthTitle>
          {viewYear}년 {viewMonth + 1}월
        </MonthTitle>
        <NavBtn onClick={nextMonth}>›</NavBtn>
      </Header>
      <Grid>
        {DAYS.map((d) => (
          <DayLabel key={d}>{d}</DayLabel>
        ))}
        {cells.map((day, i) => {
          const isSelected =
            !!day &&
            !!selectedDate &&
            selectedDate.getFullYear() === viewYear &&
            selectedDate.getMonth() === viewMonth &&
            selectedDate.getDate() === day;

          const isToday =
            !!day &&
            today.getFullYear() === viewYear &&
            today.getMonth() === viewMonth &&
            today.getDate() === day;

          return (
            <DayCell
              key={i}
              isSelected={isSelected}
              isToday={isToday && !isSelected}
              isEmpty={!day}
              onClick={() =>
                day && onSelect(new Date(viewYear, viewMonth, day))
              }
            >
              {day ?? ""}
            </DayCell>
          );
        })}
      </Grid>
    </Wrapper>
  );
}
