import axios from 'axios';
import { AreaItem } from '@/app/types/ItemType';
import { areaCodeMap, categoryMap } from '@/app/constant/SlideConstant';
import { handleAxiosError, logError } from '@/app/utils/errorHandler';
import { ERROR_MESSAGES } from '@/app/constant/errorMessages';

export const getTourListApi = async (
  selectedArea: string,
  numOfRows: number,
  pageNo: number,
  selectcontentTypeId?: string
): Promise<AreaItem[]> => {
  const areaCode = areaCodeMap[selectedArea] || '';
  const contentTypeId = selectcontentTypeId ? categoryMap[selectcontentTypeId] : '';

  const params = {
    pageNo,
    numOfRows,
    areaCode,
    arrange: 'R',
    contentTypeId,
  };

  try {
    const response = await axios.get('/api/tourlist', { 
      params,
      timeout: 10000,
    });

    const items = response.data?.response?.body?.items?.item ?? [];
    const list = Array.isArray(items) ? items : [items];

    return list.map((item: AreaItem) => ({
      title: item.title ?? '',
      addr1: item.addr1 ?? '',
      mapx: item.mapx ?? '',
      mapy: item.mapy ?? '',
      firstimage: item.firstimage ?? '',
      firstimage2: item.firstimage2 ?? '',
      contenttypeid: item.contenttypeid ?? '',
      contentid: item.contentid ?? '',
    }));
  } catch (error) {
    logError('getTourListApi', error);
    throw handleAxiosError(error, ERROR_MESSAGES.TOUR_LIST);
  }
};