import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useDetailData = (contentId: string, contentTypeId?: string) => {
  return useQuery({
    queryKey: ['detail', contentId, contentTypeId],
    queryFn: async () => {
      const response = await axios.get('/api/detail', {
        params: {
          contentId,
          contentTypeId,
        },
      });

      const commonItem = response.data?.common?.response?.body?.items?.item;
      const introItem = response.data?.intro?.response?.body?.items?.item;

      // API 응답이 배열일 수도 있고 객체일 수도 있음
      const common = Array.isArray(commonItem) ? commonItem[0] : commonItem;
      const intro = Array.isArray(introItem) ? introItem[0] : introItem;

      return {
        common,
        intro,
      };
    },
    enabled: !!contentId,
    staleTime: 1000 * 60 * 30, // 30분
    retry: 1,
  });
};
