// app/api/getLocationApi.ts
import axios from 'axios';
import { AreaItem } from '@/app/types/ItemType';
import getUserLocation from '@/app/utils/getUserLocation';
import { handleAxiosError, logError } from '@/app/utils/errorHandler';
import { ERROR_MESSAGES } from '@/app/constant/errorMessages';

// 위치 기반 관광 정보 조회 (BFF 호출)
export const getLocationApi = async (
  radius: number = 5000,
  numOfRows: number = 100
): Promise<{ items: AreaItem[]; areaCode: string }> => {
  try {
    // 사용자 위치 가져오기
    const { latitude, longitude } = await getUserLocation();

    const params = {
      pageNo: 1,
      numOfRows,
      arrange: 'R',
      mapX: longitude,
      mapY: latitude,
      radius,
    };

    const response = await axios.get('/api/location', { params });

    const items = response.data?.response?.body?.items?.item ?? [];
    const list = Array.isArray(items) ? items : [items];

    // 필요한 값만 추출
    const formattedItems: AreaItem[] = list.map((item) => ({
      title: item.title ?? '',
      addr1: item.addr1 ?? '',
      mapx: item.mapx ?? '',
      mapy: item.mapy ?? '',
      dist: item.dist ?? '',
      firstimage: item.firstimage ?? '',
      firstimage2: item.firstimage2 ?? '',
      contenttypeid: item.contenttypeid ?? '',
      contentid: item.contentid ?? '',
      areacode: item.areacode ?? '',
    }));

    return {
      items: formattedItems,
      areaCode: formattedItems[0]?.areacode || '',
    };
  } catch (error) {
    logError('getLocationApi', error);
    throw handleAxiosError(error, ERROR_MESSAGES.LOCATION);
  }
};
