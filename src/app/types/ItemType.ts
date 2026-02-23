/**
 * 위치 기반 관광지 정보 타입
 */
export interface AreaItem {
  title: string;
  addr1: string;
  mapx: string;
  mapy: string;
  firstimage: string;
  firstimage2: string;
  contenttypeid: string;
  contentid: string;
  areacode?: string; // 지역 코드
  dist?: string; // 현재 위치로부터의 거리 (m)
  radius?: string; // 검색 반경 (m)
}

/**
 * 숙박 시설 정보 타입
 */
export interface StayItem {
  title: string;
  addr1: string;
  mapx: string;
  mapy: string;
  firstimage: string;
  firstimage2: string;
  contentid: string;
  contenttypeid: string;
  areacode?: string; // 지역 코드
}

/**
 * 행사/축제 정보 타입
 */
export interface EventItem {
  title: string;
  addr1: string;
  addr2?: string;
  firstimage: string;
  firstimage2: string;
  contenttypeid: string;
  contentid: string;
  tel?: string;
  eventstartdate: string; // 행사 시작일 (YYYYMMDD)
  eventenddate: string; // 행사 종료일 (YYYYMMDD)
  mapx?: string;
  mapy?: string;
  areacode?: string; // 지역 코드
  sigungucode?: string; // 시군구 코드
  progresstype?: string; // 진행 상태 (1: 진행중, 2: 진행예정, 3: 진행완료)
  festivaltype?: string; // 축제 유형
  cat1?: string; // 대분류 카테고리
  cat2?: string; // 중분류 카테고리
  cat3?: string; // 소분류 카테고리
}

/**
 * 위치 기반 API 응답 타입
 */
export interface LocationApiResponse {
  items: AreaItem[];
  areaCode: string;
}

/**
 * 검색 결과 아이템 타입
 */
export interface SearchApiResponse {
  title: string;
  addr1: string;
  firstimage: string;
  firstimage2: string;
  contenttypeid: string;
  contentid: string;
  tel: string;
}

/**
 * 메인 슬라이드 타입
 */
export interface MainSlideType {
  title: string;
  image: string;
  description: string;
  description2?: string;
}

/**
 * 지역 선택 슬라이드 타입
 */
export interface AreaSlideType {
  title: string;
  image: string;
}

/**
 * 사용자 위치 정보 타입
 */
export type UserLocation = {
  latitude: number;
  longitude: number;
} | null;
