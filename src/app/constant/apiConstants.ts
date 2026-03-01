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
  COURSE: 'areaBasedList2', // 여행코스 (contentTypeId=25)
  PET_TRAVEL: 'areaBasedList2', // 반려동물 동반여행
} as const;

/**
 * 여행 타입 정의
 */
export const TRAVEL_TYPES = {
  FAMILY: 'family',
  FRIENDS: 'friends',
  COUPLE: 'couple',
  SOLO: 'solo',
  FOREIGNER: 'foreigner',
  PET: 'pet',
} as const;

/**
 * 여행 타입 정보
 */
export const TRAVEL_TYPE_INFO = [
  {
    id: TRAVEL_TYPES.FAMILY,
    title: '가족여행',
    icon: '👨‍👩‍👧‍👦',
    description: '온 가족이 함께하는 행복한 여행',
    color: 'bg-amber-100',
    hoverColor: 'hover:bg-amber-200',
    image: '/main/main1.png',
  },
  {
    id: TRAVEL_TYPES.FRIENDS,
    title: '친구여행',
    icon: '👫',
    description: '친구들과 떠나는 신나는 여행',
    color: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200',
    image: '/main/main2.png',
  },
  {
    id: TRAVEL_TYPES.COUPLE,
    title: '연인여행',
    icon: '💑',
    description: '둘만의 로맨틱한 여행',
    color: 'bg-pink-100',
    hoverColor: 'hover:bg-pink-200',
    image: '/main/main3.png',
  },
  {
    id: TRAVEL_TYPES.SOLO,
    title: '혼자여행',
    icon: '🚶',
    description: '나를 찾아 떠나는 힐링 여행',
    color: 'bg-green-100',
    hoverColor: 'hover:bg-green-200',
    image: '/main/main1.png',
  },
  {
    id: TRAVEL_TYPES.FOREIGNER,
    title: '외국인 코스',
    icon: '🌏',
    description: '한국의 매력을 느끼는 여행',
    color: 'bg-purple-100',
    hoverColor: 'hover:bg-purple-200',
    image: '/main/main2.png',
  },
  {
    id: TRAVEL_TYPES.PET,
    title: '반려견과 함께',
    icon: '🐕',
    description: '반려동물과 함께하는 여행',
    color: 'bg-orange-100',
    hoverColor: 'hover:bg-orange-200',
    image: '/main/main3.png',
  },
] as const;

/**
 * 여행 타입별 API 파라미터 설정
 * 각 여행 타입에 맞는 콘텐츠 타입, 카테고리, 키워드 정의
 */
export const TRAVEL_TYPE_PARAMS = {
  [TRAVEL_TYPES.FAMILY]: {
    contentTypeId: '12', // 관광지
    cat1: 'A01', // 자연 (아이들과 함께 즐기기 좋음)
    keywords: ['체험', '놀이', '공원', '동물원', '식물원', '박물관'],
  },
  [TRAVEL_TYPES.FRIENDS]: {
    contentTypeId: '28', // 레포츠
    cat1: 'A03', // 레포츠
    keywords: ['레포츠', '액티비티', '클라이밍', '서핑', '스키'],
  },
  [TRAVEL_TYPES.COUPLE]: {
    contentTypeId: '12', // 관광지
    cat1: 'A01', // 자연 (로맨틱한 자연 경관)
    keywords: ['야경', '일몰', '해변', '카페', '정원'],
  },
  [TRAVEL_TYPES.SOLO]: {
    contentTypeId: '14', // 문화시설
    cat1: 'A02', // 인문(문화/예술/역사)
    keywords: ['사찰', '템플', '힐링', '명상', '산책'],
  },
  [TRAVEL_TYPES.FOREIGNER]: {
    contentTypeId: '12', // 관광지
    cat1: 'A02', // 인문(문화/예술/역사)
    keywords: ['전통', '궁궐', '한옥', '문화재', 'UNESCO'],
  },
  [TRAVEL_TYPES.PET]: {
    contentTypeId: '12', // 관광지 (pettravel API 별도 사용)
    cat1: 'A01', // 자연
    keywords: ['반려동물', '애견', '펫', '공원'],
  },
} as const;

/**
 * 콘텐츠 타입 ID 정의
 */
export const CONTENT_TYPE_IDS = {
  TOURIST_ATTRACTION: '12', // 관광지
  CULTURAL_FACILITY: '14', // 문화시설
  FESTIVAL: '15', // 축제/공연/행사
  TRAVEL_COURSE: '25', // 여행코스
  LEISURE_SPORTS: '28', // 레포츠
  ACCOMMODATION: '32', // 숙박
  SHOPPING: '38', // 쇼핑
  RESTAURANT: '39', // 음식점
} as const;

/**
 * 카테고리 대분류 정의
 */
export const CATEGORY_CODES = {
  NATURE: 'A01', // 자연
  CULTURE: 'A02', // 인문(문화/예술/역사)
  LEISURE: 'A03', // 레포츠
  SHOPPING: 'A04', // 쇼핑
  FOOD: 'A05', // 음식
  ACCOMMODATION: 'B02', // 숙박
  COURSE: 'C01', // 추천코스
} as const;
