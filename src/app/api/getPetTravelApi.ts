import axios from 'axios';
import { PetTravelItem } from '@/app/types/ItemType';
import { areaCodeMap } from '@/app/constant/SlideConstant';
import { handleAxiosError, logError } from '@/app/utils/errorHandler';
import { ERROR_MESSAGES } from '@/app/constant/errorMessages';

export const getPetTravelApi = async (
  selectedArea: string,
  numOfRows: number,
  pageNo: number
): Promise<PetTravelItem[]> => {
  const areaCode = areaCodeMap[selectedArea] || '';

  const params = {
    pageNo,
    numOfRows,
    areaCode,
    arrange: 'R',
    contentTypeId: '12', // 관광지 (반려동물 동반 가능 필터링은 별도)
  };

  try {
    const response = await axios.get('/api/pettravel', {
      params,
      timeout: 30000,
    });

    const items = response.data?.response?.body?.items?.item ?? [];
    const list = Array.isArray(items) ? items : [items];

    return list.map((item: PetTravelItem) => ({
      title: item.title ?? '',
      addr1: item.addr1 ?? '',
      mapx: item.mapx ?? '',
      mapy: item.mapy ?? '',
      firstimage: item.firstimage ?? '',
      firstimage2: item.firstimage2 ?? '',
      contenttypeid: item.contenttypeid ?? '',
      contentid: item.contentid ?? '',
      areacode: item.areacode ?? '',
      tel: item.tel ?? '',
    }));
  } catch (error) {
    logError('getPetTravelApi', error);
    throw handleAxiosError(error, ERROR_MESSAGES.TOUR_LIST);
  }
};
