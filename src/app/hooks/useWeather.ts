import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface WeatherData {
  sky: string; // 하늘상태 (1: 맑음, 3: 구름많음, 4: 흐림)
  pty: string; // 강수형태 (0: 없음, 1: 비, 2: 비/눈, 3: 눈, 4: 소나기)
  tmp: string; // 기온
}

// 위경도 → 격자 좌표 변환 (기상청 API는 격자 좌표 사용)
const convertToGrid = (_lat: number, _lon: number): { nx: number; ny: number } => {
  // 서울 기준 (37.5665, 126.978) → 격자 (60, 127)
  // 간단하게 주요 도시 고정값 사용
  const cities = {
    seoul: { nx: 60, ny: 127 }, // 서울
    busan: { nx: 98, ny: 76 }, // 부산
    jeju: { nx: 52, ny: 38 }, // 제주
  };

  // 기본값은 서울
  return cities.seoul;
};

export const useWeather = (_lat: number = 37.5665, _lon: number = 126.978) => {
  return useQuery<WeatherData | null, Error>({
    queryKey: ['weather', _lat, _lon],
    queryFn: async () => {
      const apiKey = process.env.NEXT_PUBLIC_KMA_API_KEY;

      // API 키가 없으면 null 반환
      if (!apiKey) {
        return null;
      }

      try {
        const grid = convertToGrid(_lat, _lon);
        const now = new Date();
        const baseDate = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

        // 기상청 API는 매시간 40분에 발표 (ex: 0200 → 0210 발표)
        const baseTime = String(now.getHours()).padStart(2, '0') + '00';

        const response = await axios.get('/api/weather', {
          params: {
            serviceKey: apiKey,
            base_date: baseDate,
            base_time: baseTime,
            nx: grid.nx,
            ny: grid.ny,
          },
        });

        const itemsRaw = response.data?.response?.body?.items?.item || [];
        interface KMAItem {
          category: string;
          fcstValue: string;
        }
        const items: KMAItem[] = Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw];

        // SKY(하늘상태), PTY(강수형태), TMP(기온) 추출
        const sky = items.find((item) => item.category === 'SKY')?.fcstValue || '1';
        const pty = items.find((item) => item.category === 'PTY')?.fcstValue || '0';
        const tmp = items.find((item) => item.category === 'TMP')?.fcstValue || '20';

        return { sky, pty, tmp };
      } catch (error) {
        console.error('날씨 정보를 가져오는데 실패했습니다:', error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 30, // 30분
    retry: 0,
    enabled: !!process.env.NEXT_PUBLIC_KMA_API_KEY,
  });
};
