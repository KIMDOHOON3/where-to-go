import axios from 'axios';
import { VisitorStatsItem } from '@/app/types/ItemType';
import { handleAxiosError, logError } from '@/app/utils/errorHandler';
import { ERROR_MESSAGES } from '@/app/constant/errorMessages';
import { areaCodeMap } from '@/app/constant/SlideConstant';

interface VisitorStatsParams {
  startYmd?: string;
  endYmd?: string;
  areaCode?: string;
  numOfRows?: number;
  pageNo?: number;
}

/**
 * 관광빅데이터 방문자 통계 API 호출
 */
export const getVisitorStatsApi = async (
  params: VisitorStatsParams = {}
): Promise<VisitorStatsItem[]> => {
  const { startYmd, endYmd, areaCode, numOfRows = 100, pageNo = 1 } = params;

  const queryParams: Record<string, string | number> = {
    numOfRows,
    pageNo,
  };

  if (startYmd) queryParams.startYmd = startYmd;
  if (endYmd) queryParams.endYmd = endYmd;
  if (areaCode) queryParams.areaCode = areaCode;

  try {
    const response = await axios.get('/api/visitor-stats', {
      params: queryParams,
      timeout: 15000,
    });

    const items = response.data?.response?.body?.items?.item ?? [];
    const list = Array.isArray(items) ? items : [items];

    return list.map((item: Record<string, unknown>) => ({
      baseYmd: String(item.baseYmd ?? ''),
      areaCode: String(item.areaCode ?? ''),
      areaNm: String(item.areaNm ?? ''),
      touNum: Number(item.touNum ?? 0),
      touDivNm: item.touDivNm ? String(item.touDivNm) : undefined,
      signguCode: item.signguCode ? String(item.signguCode) : undefined,
      signguNm: item.signguNm ? String(item.signguNm) : undefined,
    }));
  } catch (error) {
    logError('getVisitorStatsApi', error);
    throw handleAxiosError(error, ERROR_MESSAGES.TOUR_LIST);
  }
};

/**
 * 지역별 총 방문자 수 집계
 */
export const getAreaVisitorCounts = async (
  selectedArea?: string
): Promise<Map<string, number>> => {
  const areaCode = selectedArea ? areaCodeMap[selectedArea] : undefined;

  const stats = await getVisitorStatsApi({ areaCode });

  const visitorMap = new Map<string, number>();

  for (const stat of stats) {
    const key = stat.areaNm;
    const current = visitorMap.get(key) || 0;
    visitorMap.set(key, current + stat.touNum);
  }

  return visitorMap;
};

/**
 * 인기 지역 목록 (방문자 수 기준 정렬)
 */
export const getPopularAreas = async (
  limit = 10
): Promise<Array<{ areaName: string; visitorCount: number }>> => {
  const visitorMap = await getAreaVisitorCounts();

  const sortedAreas = Array.from(visitorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([areaName, visitorCount]) => ({ areaName, visitorCount }));

  return sortedAreas;
};
