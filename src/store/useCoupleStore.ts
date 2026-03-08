import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CoupleState {
  // 온보딩 완료 여부
  isOnboarded: boolean;

  // 사귄 날짜
  startDate: string | null; // ISO string으로 저장 (localStorage 호환)

  // 커플 정보
  coupleTitle: string;

  // 액션
  setOnboarded: (value: boolean) => void;
  setStartDate: (date: Date) => void;
  setCoupleTitle: (title: string) => void;
  reset: () => void;
}

export const useCoupleStore = create<CoupleState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      startDate: null,
      coupleTitle: "우리의 이야기",

      setOnboarded: (value) => set({ isOnboarded: value }),
      setStartDate: (date) => set({ startDate: date.toISOString() }),
      setCoupleTitle: (title) => set({ coupleTitle: title }),
      reset: () =>
        set({
          isOnboarded: false,
          startDate: null,
          coupleTitle: "우리의 이야기",
        }),
    }),
    {
      name: "couple-storage", // localStorage key
    }
  )
);

// 헬퍼: startDate를 Date 객체로 가져오기
export const useStartDate = () => {
  const startDate = useCoupleStore((state) => state.startDate);
  return startDate ? new Date(startDate) : null;
};
