import { useQuery } from '@tanstack/react-query';

interface NearbyPlace {
  contentid: number;
  title: string;
  addr1: string;
  addr2?: string;
  firstimage?: string;
  tel?: string;
  mapx?: string;
  mapy?: string;
}

interface NearbyPlacesResponse {
  items: NearbyPlace[];
  totalCount: number;
}

export function useNearbyPlaces(
  mapx?: string,
  mapy?: string,
  contentType?: string, // '32' = 숙박, '39' = 음식점
  numOfRows: number = 5
) {
  return useQuery<NearbyPlacesResponse>({
    queryKey: ['nearbyPlaces', mapx, mapy, contentType, numOfRows],
    queryFn: async () => {
      if (!mapx || !mapy || !contentType) {
        throw new Error('Missing required parameters');
      }

      const params = new URLSearchParams({
        mapx,
        mapy,
        contentType,
        numOfRows: String(numOfRows),
      });

      const response = await fetch(`/api/nearby?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch nearby places');
      }

      return response.json();
    },
    enabled: !!(mapx && mapy && contentType),
    staleTime: 3600000, // 1시간
  });
}
