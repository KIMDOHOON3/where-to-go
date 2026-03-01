import axios from 'axios';
import { CourseItem } from '@/app/types/ItemType';
import { areaCodeMap } from '@/app/constant/SlideConstant';
import { handleAxiosError, logError } from '@/app/utils/errorHandler';
import { ERROR_MESSAGES } from '@/app/constant/errorMessages';
import { TRAVEL_TYPE_PARAMS, TRAVEL_TYPES } from '@/app/constant/apiConstants';

type TravelType = (typeof TRAVEL_TYPES)[keyof typeof TRAVEL_TYPES];

interface CourseApiParams {
  selectedArea: string;
  numOfRows: number;
  pageNo: number;
  travelType?: TravelType;
}

export const getCourseApi = async ({
  selectedArea,
  numOfRows,
  pageNo,
  travelType,
}: CourseApiParams): Promise<CourseItem[]> => {
  const areaCode = areaCodeMap[selectedArea] || '';

  // 여행 타입에 맞는 파라미터 가져오기
  const typeParams = travelType ? TRAVEL_TYPE_PARAMS[travelType] : null;

  const params: Record<string, string | number> = {
    pageNo,
    numOfRows,
    arrange: 'R', // 최신순 정렬
  };

  if (areaCode) {
    params.areaCode = areaCode;
  }

  // 여행 타입별 콘텐츠 타입과 카테고리 적용
  if (typeParams) {
    params.contentTypeId = typeParams.contentTypeId;
    if (typeParams.cat1) {
      params.cat1 = typeParams.cat1;
    }
  } else {
    params.contentTypeId = '12'; // 기본값: 관광지
  }

  try {
    const response = await axios.get('/api/course', {
      params,
      timeout: 30000,
    });

    const items = response.data?.response?.body?.items?.item ?? [];
    const list = Array.isArray(items) ? items : [items];

    return list.map((item: CourseItem) => ({
      title: item.title ?? '',
      addr1: item.addr1 ?? '',
      mapx: item.mapx ?? '',
      mapy: item.mapy ?? '',
      firstimage: item.firstimage ?? '',
      firstimage2: item.firstimage2 ?? '',
      contenttypeid: item.contenttypeid ?? '',
      contentid: item.contentid ?? '',
      areacode: item.areacode ?? '',
      cat1: item.cat1 ?? '',
      cat2: item.cat2 ?? '',
      cat3: item.cat3 ?? '',
    }));
  } catch (error) {
    logError('getCourseApi', error);
    throw handleAxiosError(error, ERROR_MESSAGES.TOUR_LIST);
  }
};

// 하위 호환성을 위한 간단한 버전
export const getCourseApiSimple = async (
  selectedArea: string,
  numOfRows: number,
  pageNo: number
): Promise<CourseItem[]> => {
  return getCourseApi({ selectedArea, numOfRows, pageNo });
};
