"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { useCoupleStore } from "@/store/useCoupleStore";
import AddEventModal from "@/components/modal/AddEventModal";
import EventDetailModal from "@/components/modal/EventDetailModal";

interface DateEvent {
  id: string;
  date: string;
  label: string;
  emoji: string;
  color: string;
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

const EventSection = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f5eeec;
`;

const EventHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const EventTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #666;
`;

const AddEventBtn = styled.button`
  background: #fff5f4;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #ffeae8;
  }
`;

const EventBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const EventBadge = styled.button<{ color: string }>`
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
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  transition: all 0.15s;

  &:hover {
    background: ${({ color }) => color}30;
  }
`;

const EmptyEvent = styled.p`
  font-size: 13px;
  color: #999;
  text-align: center;
  padding: 8px 0;
`;

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function getFirstDow(y: number, m: number) {
  return new Date(y, m, 1).getDay();
}

export default function MiniCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(today.getDate());
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DateEvent | null>(null);

  const events = useCoupleStore((state) => state.events);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDow = getFirstDow(viewYear, viewMonth);

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const getEventsForDay = (day: number) =>
    events.filter((e) => {
      const eventDate = new Date(e.date);
      return (
        eventDate.getFullYear() === viewYear &&
        eventDate.getMonth() === viewMonth &&
        eventDate.getDate() === day
      );
    });

  const selectedEvents = selected ? getEventsForDay(selected) : [];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const selectedDate = selected ? new Date(viewYear, viewMonth, selected) : null;

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

      {selected && (
        <EventSection>
          <EventHeader>
            <EventTitle>
              {viewMonth + 1}월 {selected}일
            </EventTitle>
            <AddEventBtn onClick={() => setShowModal(true)}>
              + 기념일 추가
            </AddEventBtn>
          </EventHeader>

          {selectedEvents.length > 0 ? (
            <EventBadges>
              {selectedEvents.map((e) => (
                <EventBadge
                  key={e.id}
                  color={e.color ?? "#ef4444"}
                  onClick={() => setSelectedEvent(e)}
                >
                  {e.emoji} {e.label}
                </EventBadge>
              ))}
            </EventBadges>
          ) : (
            <EmptyEvent>등록된 기념일이 없습니다</EmptyEvent>
          )}
        </EventSection>
      )}

      {showModal && selectedDate && (
        <AddEventModal
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
        />
      )}

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </Wrap>
  );
}
