import axios from 'axios';
import { SearchApiResponse } from '@/app/types/ItemType';

// 검색 정보 조회 (BFF 호출)
export const getSearchApi = async (
  keyword: string,
  numOfRows: number,
  contentTypeId: string | null
): Promise<SearchApiResponse[]> => {
  if (!keyword) {
    return [];
  }

  const params = Object.fromEntries(
    Object.entries({
      pageNo: 1,
      numOfRows,
      keyword,
      contentTypeId,
    }).filter(([, v]) => v !== null && v !== undefined && v !== '')
  );


  try {
    const response = await axios.get('/api/search', { 
      params,
      timeout: 10000,
    });

    const items = response.data?.response?.body?.items?.item ?? [];
    const list = Array.isArray(items) ? items : [items];


    return list.map((item) => ({
      title: item.title ?? '',
      addr1: item.addr1 ?? '',
      firstimage: item.firstimage ?? '',
      firstimage2: item.firstimage2 ?? '',
      contenttypeid: item.contenttypeid ?? '',
      contentid: item.contentid ?? '',
      tel: item.tel ?? '',
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ [getSearchApi] Axios Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    } else {
      console.error('❌ [getSearchApi] Error:', error);
    }
    throw new Error('검색 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};