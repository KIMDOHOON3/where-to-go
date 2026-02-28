import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getTimeBasedRecommendation } from '@/app/utils/getTimeBasedRecommendation';
import { SearchApiResponse } from '@/app/types/ItemType';

export const useTodayRecommend = (areaCode: string = '1') => {
  const timeRec = getTimeBasedRecommendation();

  return useQuery<SearchApiResponse[], Error>({
    queryKey: ['todayRecommend', areaCode, timeRec.categoryFilter],
    queryFn: async () => {
      const response = await axios.get('/api/tourlist', {
        params: {
          areaCode,
          contentTypeId: timeRec.categoryFilter,
          numOfRows: 6,
          arrange: 'R',
        },
      });

      const rawItems = response.data?.response?.body?.items?.item ?? [];
      const items = Array.isArray(rawItems) ? rawItems : [rawItems];

      return items.filter((item: SearchApiResponse) => item && item.contentid);
    },
    staleTime: 1000 * 60 * 10, // 10분
    retry: 1,
  });
};
