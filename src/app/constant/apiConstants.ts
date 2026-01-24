/**
 * Tour API 관련 설정 상수
 */
export const API_CONFIG = {
  BASE_URL: 'https://apis.data.go.kr/B551011/KorService2',
  SERVICE_KEY: process.env.TOUR_API_KEY,
  DEFAULT_PARAMS: {
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
  },
} as const;

/**
 * Tour API 엔드포인트
 */
export const API_ENDPOINTS = {
  TOUR_LIST: 'areaBasedList2',
  LOCATION_BASED: 'locationBasedList2',
  STAY: 'searchStay2',
  EVENT: 'searchFestival2',
  SEARCH: 'searchKeyword2',
} as const;
