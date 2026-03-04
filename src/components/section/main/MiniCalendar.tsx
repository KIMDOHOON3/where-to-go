"use client";

import styled from "@emotion/styled";
import { useState } from "react";

export interface DateEvent {
  date: Date;
  label: string;
  emoji: string;
  color?: string;
}

const Wrap = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 16px 18px;
  margin: 0 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const MonthTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.3px;
`;

const NavBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #888;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
  &:hover { background: #f5f5f5; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayLabel = styled.div`
  text-align: center;
  font-size: 12px;
  color: #b0a09e;
  font-weight: 600;
  padding: 2px 0 6px;
`;

const DayCell = styled.div<{ isSelected: boolean; isEmpty: boolean; isToday: boolean }>`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
  cursor: ${({ isEmpty }) => (isEmpty ? "default" : "pointer")};

  .num {
    font-size: 14px;
    font-weight: ${({ isSelected, isToday }) => (isSelected || isToday ? "800" : "400")};
    color: ${({ isSelected, isToday }) =>
      isSelected ? "#fff" : isToday ? "#ef4444" : "#1a1a1a"};
    background: ${({ isSelected }) =>
      isSelected ? "linear-gradient(135deg, #f87171, #ef4444)" : "transparent"};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${({ isSelected }) =>
      isSelected ? "0 2px 8px rgba(239,68,68,0.35)" : "none"};
  }
`;

const EventDots = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
`;

const EventDot = styled.div<{ color: string }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const EventBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f5eeec;
`;

const EventBadge = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ color }) => color}18;
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #333;
  border: 1px solid ${({ color }) => color}30;
`;

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function getFirstDow(y: number, m: number) {
  return new Date(y, m, 1).getDay();
}

interface Props {
  events?: DateEvent[];
}

const SAMPLE_EVENTS: DateEvent[] = [
  { date: new Date(2024, 0, 18), label: "100일 기념일", emoji: "🎂", color: "#ef4444" },
  { date: new Date(2024, 0, 20), label: "함정 데이트", emoji: "☕", color: "#f97316" },
  { date: new Date(2024, 0, 18), label: "함정 데이트", emoji: "💑", color: "#ec4899" },
];

export default function MiniCalendar({ events = SAMPLE_EVENTS }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(today.getDate());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDow = getFirstDow(viewYear, viewMonth);

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const getEventsForDay = (day: number) =>
    events.filter(
      (e) =>
        e.date.getFullYear() === viewYear &&
        e.date.getMonth() === viewMonth &&
        e.date.getDate() === day
    );

  const selectedEvents = selected ? getEventsForDay(selected) : [];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  return (
    <Wrap>
      <Header>
        <NavBtn onClick={prevMonth}>‹</NavBtn>
        <MonthTitle>{viewYear}년 {viewMonth + 1}월</MonthTitle>
        <NavBtn onClick={nextMonth}>›</NavBtn>
      </Header>

      <Grid>
        {DAYS.map(d => <DayLabel key={d}>{d}</DayLabel>)}
        {cells.map((day, i) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const isSelected = day !== null && selected === day;
          const isToday =
            day !== null &&
            today.getFullYear() === viewYear &&
            today.getMonth() === viewMonth &&
            today.getDate() === day;

          return (
            <DayCell
              key={i}
              isSelected={isSelected}
              isToday={isToday && !isSelected}
              isEmpty={!day}
              onClick={() => day && setSelected(day)}
            >
              <div className="num">{day ?? ""}</div>
              {dayEvents.length > 0 && !isSelected && (
                <EventDots>
                  {dayEvents.slice(0, 3).map((e, j) => (
                    <EventDot key={j} color={e.color ?? "#ef4444"} />
                  ))}
                </EventDots>
              )}
            </DayCell>
          );
        })}
      </Grid>

      {selectedEvents.length > 0 && (
        <EventBadges>
          {selectedEvents.map((e, i) => (
            <EventBadge key={i} color={e.color ?? "#ef4444"}>
              {e.emoji} {e.label}
            </EventBadge>
          ))}
        </EventBadges>
      )}
    </Wrap>
  );
}
