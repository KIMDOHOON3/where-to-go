import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TourApiRawItem } from '@/app/types/ApiResponseTypes';

// 최소한의 타입 정의. 실제 API 스펙이 더 복잡하므로 필요한 필드만 선언합니다.
export interface KakaoDocument {
  place_name: string;
  category_name: string;
  category_group_name: string;
  road_address_name?: string;
  address_name?: string;
  phone?: string;
  place_url?: string;
}

export interface WikiSearchItem {
  title: string;
  snippet: string;
}

export interface FallbackData {
  kakao: { documents: KakaoDocument[] } | null;
  wiki: { query: { search: WikiSearchItem[] } } | null;
}

export interface ImageItem {
  originimgurl: string;
  smallimageurl?: string;
  // 여기에 필요한 다른 필드가 있으면 추가
}

export interface DetailHookData {
  // 기본적으로 공공 API에 정의된 TourApiRawItem 형태를 기대하지만,
  // 일부 항목은 누락되거나 구조가 달라질 수 있으므로
  // 추가 필드를 허용하기 위해 Record로 확장합니다.
  common: (TourApiRawItem & Record<string, unknown>) | null;
  intro: unknown;
  images: ImageItem[] | null;
  kakao: KakaoDocument[] | null;
  wiki: WikiSearchItem[] | null;
  fallback: FallbackData;
}

export const useDetailData = (contentId: string, contentTypeId?: string, title?: string) => {
  return useQuery<DetailHookData, Error, DetailHookData>({
    queryKey: ['detail', contentId, contentTypeId, title],
    queryFn: async (): Promise<DetailHookData> => {
      try {
        interface RawDetailResponse {
          common?: unknown;
          intro?: unknown;
          images?: unknown;
          fallback?: unknown;
        }

        const response = await axios.get<RawDetailResponse>('/api/detail', {
          params: {
            contentId,
            contentTypeId,
            title,
          },
        });

        const commonData = response.data?.common as
          | (TourApiRawItem & Record<string, unknown>)
          | undefined;
        const commonItem = (commonData as any)?.response?.body?.items?.item;
        const introItem = (response.data?.intro as any)?.response?.body?.items?.item;
        const imageItems = (response.data?.images as any)?.response?.body?.items?.item;

        // API 응답이 배열일 수도 있고 객체일 수도 있음
        const commonNormalized = Array.isArray(commonItem) ? commonItem[0] : commonItem;
        const intro = Array.isArray(introItem) ? introItem[0] : introItem;
        const imagesNormalized = Array.isArray(imageItems)
          ? imageItems
          : imageItems
            ? [imageItems]
            : null;

        const fallbackData: FallbackData = (response.data?.fallback as any) || {
          kakao: null,
          wiki: null,
        };

        return {
          common: (commonNormalized || commonData) ?? null,
          intro,
          images: imagesNormalized,
          kakao: (response.data?.fallback as any)?.kakao?.documents || null,
          wiki: (response.data?.fallback as any)?.wiki?.query?.search || null,
          fallback: fallbackData,
        };
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const resp = err.response?.data;
          const message = resp ? JSON.stringify(resp) : err.message;
          throw new Error(message);
        }
        throw err;
      }
    },
    enabled: !!contentId,
    staleTime: 1000 * 60 * 30, // 30분
    retry: 1,
  });
};
