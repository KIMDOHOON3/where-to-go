import { useQuery } from '@tanstack/react-query';
import {
  getVisitorStatsApi,
  getAreaVisitorCounts,
  getPopularAreas,
} from '@/app/api/getVisitorStatsApi';
import { VisitorStatsItem } from '@/app/types/ItemType';

interface UseVisitorStatsParams {
  startYmd?: string;
  endYmd?: string;
  areaCode?: string;
  numOfRows?: number;
  pageNo?: number;
}

/**
 * 방문자 통계 데이터 hook
 */
export function useVisitorStats(params: UseVisitorStatsParams = {}) {
  return useQuery<VisitorStatsItem[], Error>({
    queryKey: ['visitorStats', params],
    queryFn: () => getVisitorStatsApi(params),
    staleTime: 1000 * 60 * 60, // 1시간 캐시
    gcTime: 1000 * 60 * 60 * 2, // 2시간 유지
    retry: 1,
  });
}

/**
 * 지역별 방문자 수 집계 hook
 */
export function useAreaVisitorCounts(selectedArea?: string) {
  return useQuery<Map<string, number>, Error>({
    queryKey: ['areaVisitorCounts', selectedArea],
    queryFn: () => getAreaVisitorCounts(selectedArea),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    retry: 1,
  });
}

/**
 * 인기 지역 목록 hook
 */
export function usePopularAreas(limit = 10) {
  return useQuery<Array<{ areaName: string; visitorCount: number }>, Error>({
    queryKey: ['popularAreas', limit],
    queryFn: () => getPopularAreas(limit),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    retry: 1,
  });
}
