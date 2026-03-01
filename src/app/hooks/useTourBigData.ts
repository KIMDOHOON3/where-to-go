import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface BigDataResponse {
  visitCount: number;
  trend: string;
  peakTime?: string;
  avgStayTime?: number;
}

interface BigDataItem {
  contentid?: string | number;
  visitCount?: number;
  avgStayTime?: number;
  peakTime?: string;
  rank?: number;
}

interface BigDataApiResponse {
  data?: BigDataItem[];
}

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const toTrend = (visitCount: number) => {
  if (visitCount > 80000) return 'hot';
  if (visitCount > 50000) return 'warm';
  return 'cool';
};

const getBigDataInfo = async (
  areaCode: string,
  contentTypeId?: string
): Promise<BigDataResponse> => {
  if (!areaCode) {
    return { visitCount: 0, trend: 'unknown' };
  }

  try {
    const response = await axios.get<BigDataApiResponse>('/api/bigdata', {
      params: {
        areaCode,
        contentTypeId,
      },
      timeout: 30000,
    });

    const data = response.data?.data || [];

    const latestData = data[0];
    if (!latestData) return { visitCount: 0, trend: 'unknown' };

    const visitCount = Number(latestData.visitCount || 0);

    return {
      visitCount,
      trend: toTrend(visitCount),
      avgStayTime: Number(latestData.avgStayTime || 0),
      peakTime: latestData.peakTime || '주말',
    };
  } catch (error) {
    console.error('BigData API 호출 실패:', error);
    return { visitCount: 0, trend: 'unknown' };
  }
};

export const useTourBigData = (areaCode: string, contentTypeId?: string, contentId?: string) => {
  return useQuery({
    queryKey: ['tourBigData', areaCode, contentTypeId],
    queryFn: () => getBigDataInfo(areaCode, contentTypeId),
    enabled: !!areaCode,
    staleTime: 1000 * 60 * 30, // 30분
    retry: 2,
    retryDelay: 1000,
    select: (baseData) => {
      if (!contentId || baseData.visitCount === 0) return baseData;

      // 콘텐츠별 소폭 변동값 (±10% 범위)
      const seed = hashString(`${areaCode}-${contentTypeId || 'all'}-${contentId}`);
      const variancePercent = (seed % 20) - 10; // -10% ~ +9%
      const variance = Math.floor(baseData.visitCount * (variancePercent / 100));
      const visitCount = Math.max(1000, baseData.visitCount + variance);

      return {
        ...baseData,
        visitCount,
        trend: toTrend(visitCount),
      };
    },
  });
};
