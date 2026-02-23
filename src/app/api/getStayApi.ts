import axios from 'axios';
import { StayItem } from '@/app/types/ItemType';
import { areaCodeMap } from '@/app/constant/SlideConstant';
import { handleAxiosError, logError } from '@/app/utils/errorHandler';
import { ERROR_MESSAGES } from '@/app/constant/errorMessages';

export const getStayApi = async (selectedArea: string): Promise<StayItem[]> => {
  const areaCode = areaCodeMap[selectedArea] || '';

  const params = {
    pageNo: 1,
    numOfRows: 10,
    areaCode,
    arrange: 'R',
  };


  try {
    const response = await axios.get('/api/stay', {
      params,
      timeout: 10000,
    });

    const rawItems = response.data?.response?.body?.items?.item ?? [];
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    return items.map((item) => ({
      title: item.title ?? '',
      addr1: item.addr1 ?? '',
      mapx: item.mapx ?? '',
      mapy: item.mapy ?? '',
      firstimage: item.firstimage ?? '',
      firstimage2: item.firstimage2 ?? '',
      contentid: item.contentid ?? '',
      contenttypeid: item.contenttypeid ?? '',
      areaCode: item.areacode ?? '',
    }));
  } catch (error) {
    logError('getStayApi', error);
    throw handleAxiosError(error, ERROR_MESSAGES.STAY);
  }
};