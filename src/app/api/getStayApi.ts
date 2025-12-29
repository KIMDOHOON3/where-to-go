import axios from 'axios';
import { StayItem } from '@/app/types/ItemType';
import { areaCodeMap } from '@/app/constant/SlideConstant';

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
    if (axios.isAxiosError(error)) {
      console.error('❌ [getStayApi] Axios Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    } else {
      console.error('❌ [getStayApi] Error:', error);
    }
    throw new Error('숙소 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};