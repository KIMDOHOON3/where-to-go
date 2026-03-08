import { create } from "zustand";
import { persist } from "zustand/middleware";

// 추억 타입
export interface Memory {
  id: string;
  title: string;
  location: string;
  date: string; // ISO string
  emoji: string;
  color: string;
}

// 기념일/이벤트 타입
export interface DateEvent {
  id: string;
  date: string; // ISO string
  label: string;
  emoji: string;
  color: string;
}

interface CoupleState {
  // 온보딩 완료 여부
  isOnboarded: boolean;

  // 사귄 날짜
  startDate: string | null;

  // 커플 정보
  coupleTitle: string;

  // 추억 목록
  memories: Memory[];

  // 기념일/이벤트 목록
  events: DateEvent[];

  // 액션
  setOnboarded: (value: boolean) => void;
  setStartDate: (date: Date) => void;
  setCoupleTitle: (title: string) => void;

  // 추억 액션
  addMemory: (memory: Omit<Memory, "id">) => void;
  removeMemory: (id: string) => void;

  // 기념일 액션
  addEvent: (event: Omit<DateEvent, "id">) => void;
  removeEvent: (id: string) => void;

  reset: () => void;
}

// 고유 ID 생성
const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export const useCoupleStore = create<CoupleState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      startDate: null,
      coupleTitle: "우리의 이야기",
      memories: [],
      events: [],

      setOnboarded: (value) => set({ isOnboarded: value }),
      setStartDate: (date) => set({ startDate: date.toISOString() }),
      setCoupleTitle: (title) => set({ coupleTitle: title }),

      addMemory: (memory) =>
        set((state) => ({
          memories: [...state.memories, { ...memory, id: generateId() }],
        })),
      removeMemory: (id) =>
        set((state) => ({
          memories: state.memories.filter((m) => m.id !== id),
        })),

      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: generateId() }],
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),

      reset: () =>
        set({
          isOnboarded: false,
          startDate: null,
          coupleTitle: "우리의 이야기",
          memories: [],
          events: [],
        }),
    }),
    {
      name: "couple-storage",
    }
  )
);

// 헬퍼: startDate를 Date 객체로 가져오기
export const useStartDate = () => {
  const startDate = useCoupleStore((state) => state.startDate);
  return startDate ? new Date(startDate) : null;
};

// 헬퍼: events를 DateEvent 형태로 (Date 객체 포함)
export const useEventsWithDate = () => {
  const events = useCoupleStore((state) => state.events);
  return events.map((e) => ({
    ...e,
    date: new Date(e.date),
  }));
};
