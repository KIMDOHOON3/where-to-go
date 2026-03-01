import axios from 'axios';
import { EventItem } from '@/app/types/ItemType';
import { areaCodeMap } from '@/app/constant/SlideConstant';
import { handleAxiosError, logError } from '@/app/utils/errorHandler';
import { ERROR_MESSAGES } from '@/app/constant/errorMessages';

interface EventApiOptions {
  numOfRows?: number;
  pageNo?: number;
  eventEndDate?: string;
}

export const getEventApi = async (
  selectedArea: string,
  eventStartDate: string,
  options?: EventApiOptions
): Promise<EventItem[]> => {
  const areaCode = areaCodeMap[selectedArea] || '';

  try {
    const response = await axios.get('/api/event', {
      params: {
        eventStartDate,
        eventEndDate: options?.eventEndDate || eventStartDate,
        areaCode,
        pageNo: options?.pageNo || 1,
        numOfRows: options?.numOfRows || 5,
        arrange: 'R',
      },
      timeout: 30000,
    });

    const rawItems = response.data?.response?.body?.items?.item;

    if (!rawItems) return [];

    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    return items.filter(Boolean).map((item) => ({
      title: item.title ?? '',
      addr1: item.addr1 ?? '',
      addr2: item.addr2 ?? '',
      firstimage: item.firstimage ?? '',
      firstimage2: item.firstimage2 ?? '',
      contenttypeid: item.contenttypeid ?? '',
      contentid: item.contentid ?? '',
      tel: item.tel ?? '',
      eventstartdate: item.eventstartdate ?? '',
      eventenddate: item.eventenddate ?? '',
      mapx: item.mapx ?? '',
      mapy: item.mapy ?? '',
      areacode: item.areacode ?? '',
      sigungucode: item.sigungucode ?? '',
      progresstype: item.progresstype ?? '',
      festivaltype: item.festivaltype ?? '',
      cat1: item.cat1 ?? '',
      cat2: item.cat2 ?? '',
      cat3: item.cat3 ?? '',
    }));
  } catch (error) {
    logError('getEventApi', error);
    throw handleAxiosError(error, ERROR_MESSAGES.EVENT);
  }
};
