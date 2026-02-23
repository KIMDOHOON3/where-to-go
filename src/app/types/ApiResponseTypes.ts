/**
 * 한국관광공사 API 공통 응답 구조
 */
export interface TourApiResponse<T> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: T | T[];
      };
      numOfRows?: number;
      pageNo?: number;
      totalCount?: number;
    };
  };
}

/**
 * API에서 반환하는 원본 아이템 타입
 */
export interface TourApiRawItem {
  // 공통 필드
  title: string;
  addr1: string;
  addr2?: string;
  mapx: string;
  mapy: string;
  firstimage: string;
  firstimage2: string;
  contentid: string;
  contenttypeid: string;

  // 지역 정보
  areacode?: string;
  sigungucode?: string;

  // 선택적 필드
  tel?: string;
  dist?: string; // 거리 (위치 기반 검색 시)

  // 행사 관련
  eventstartdate?: string;
  eventenddate?: string;
  progresstype?: string;
  festivaltype?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
}
