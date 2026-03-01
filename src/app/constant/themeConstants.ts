// 테마 여행 상수
export interface ThemeType {
  id: string;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
  image: string;
  category: 'feeling' | 'season' | 'special'; // 감성/시즌/특색
  keywords: string[]; // 검색 필터링용 키워드
  contentTypeIds?: string[]; // 콘텐츠 타입 필터
  cats?: string[]; // 카테고리 필터
}

export const THEMES: ThemeType[] = [
  // 감성 테마
  {
    id: 'nature-healing',
    name: '자연 힐링',
    emoji: '🌿',
    icon: '🌲',
    description: '숲, 바다, 산, 계곡에서 자연의 치유를 받다',
    color: 'from-green-400 to-emerald-600',
    bgColor: 'bg-green-50',
    image: '/main/main1.png',
    category: 'feeling',
    keywords: ['숲', '바다', '산', '계곡', '하이킹', '트레킹', '국립공원'],
  },
  {
    id: 'culture-history',
    name: '역사문화',
    emoji: '🏛️',
    icon: '⛩️',
    description: '고궁, 한옥, 문화유산에서 우리의 역사를 만나다',
    color: 'from-amber-400 to-amber-600',
    bgColor: 'bg-amber-50',
    image: '/main/main2.png',
    category: 'feeling',
    keywords: ['궁궐', '한옥', '사찰', '유산', '문화', '박물관', '유적지'],
  },
  {
    id: 'aesthetic-mood',
    name: '감성 카페',
    emoji: '🎨',
    icon: '☕',
    description: 'SNS 핫플, 포토존에서 감성 충전하기',
    color: 'from-pink-400 to-rose-600',
    bgColor: 'bg-pink-50',
    image: '/main/main3.png',
    category: 'feeling',
    keywords: ['카페', '포토존', '갤러리', '전시', '핫플레이스', '감성'],
  },
  {
    id: 'activity-adventure',
    name: '액티비티',
    emoji: '🎢',
    icon: '🏃',
    description: '테마파크, 레저스포츠로 신나는 경험하기',
    color: 'from-purple-400 to-indigo-600',
    bgColor: 'bg-purple-50',
    image: '/main/main1.png',
    category: 'feeling',
    keywords: ['테마파크', '레저', '스포츠', '액티비티', '체험', '짜릿함'],
  },
  {
    id: 'night-view',
    name: '도시 야경',
    emoji: '🌃',
    icon: '✨',
    description: '야경 명소, 루프탑에서 야경 감상하기',
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    image: '/main/main2.png',
    category: 'feeling',
    keywords: ['야경', '루프탑', '전망대', '밤', '도시', '경관'],
  },
  {
    id: 'food-tour',
    name: '맛집 투어',
    emoji: '🍜',
    icon: '🍽️',
    description: '지역 특산물과 유명 맛집을 순회하기',
    color: 'from-orange-400 to-red-600',
    bgColor: 'bg-orange-50',
    image: '/main/main3.png',
    category: 'feeling',
    keywords: ['맛집', '식당', '특산물', '음식', '요리', '맛'],
  },

  // 시즌 테마
  {
    id: 'spring-flower',
    name: '봄꽃 명소',
    emoji: '🌸',
    icon: '🌺',
    description: '벚꽃, 튤립, 목련으로 물든 봄',
    color: 'from-pink-300 to-pink-500',
    bgColor: 'bg-pink-50',
    image: '/main/main1.png',
    category: 'season',
    keywords: ['벚꽃', '봄', '꽃', '튤립', '목련', '3월', '4월', '5월'],
  },
  {
    id: 'summer-beach',
    name: '여름 피서지',
    emoji: '🏖️',
    icon: '🌊',
    description: '시원한 바다와 물놀이로 여름을 즐기다',
    color: 'from-cyan-400 to-blue-600',
    bgColor: 'bg-cyan-50',
    image: '/main/main2.png',
    category: 'season',
    keywords: ['바다', '해변', '여름', '피서', '물놀이', '6월', '7월', '8월'],
  },
  {
    id: 'autumn-leaf',
    name: '가을 단풍',
    emoji: '🍁',
    icon: '🍂',
    description: '붉은 단풍으로 물든 산과 계곡',
    color: 'from-amber-400 to-orange-600',
    bgColor: 'bg-amber-50',
    image: '/main/main3.png',
    category: 'season',
    keywords: ['단풍', '가을', '낙엽', '산', '9월', '10월', '11월'],
  },
  {
    id: 'winter-snow',
    name: '겨울 설경',
    emoji: '❄️',
    icon: '⛄',
    description: '하얀 눈으로 덮인 겨울의 낭만',
    color: 'from-blue-300 to-cyan-500',
    bgColor: 'bg-blue-50',
    image: '/main/main1.png',
    category: 'season',
    keywords: ['눈', '겨울', '스키', '설경', '12월', '1월', '2월'],
  },

  // 특색 테마
  {
    id: 'pet-friendly',
    name: '반려동물 동반',
    emoji: '🐶',
    icon: '🐾',
    description: '반려동물과 함께 가는 특별한 여행',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50',
    image: '/main/main2.png',
    category: 'special',
    keywords: ['반려동물', '동반', '개', '고양이', '펫프렌들리'],
  },
  {
    id: 'drama-filming',
    name: '드라마 촬영지',
    emoji: '🎬',
    icon: '🎥',
    description: '유명 드라마와 영화의 촬영지 탐방',
    color: 'from-red-400 to-pink-600',
    bgColor: 'bg-red-50',
    image: '/main/main3.png',
    category: 'special',
    keywords: ['드라마', '영화', '촬영지', '셋트장', '배우'],
  },
  {
    id: 'walking-trail',
    name: '걷기 좋은 길',
    emoji: '🚶',
    icon: '👟',
    description: '경치 좋은 길을 천천히 산책하며 힐링하기',
    color: 'from-teal-400 to-green-600',
    bgColor: 'bg-teal-50',
    image: '/main/main1.png',
    category: 'special',
    keywords: ['산책', '트래킹', '길', '도보', '경로'],
  },
  {
    id: 'photo-spot',
    name: '인생샷 명소',
    emoji: '📸',
    icon: '🖼️',
    description: '감동의 풍경을 카메라에 담다',
    color: 'from-violet-400 to-purple-600',
    bgColor: 'bg-violet-50',
    image: '/main/main2.png',
    category: 'special',
    keywords: ['사진', '풍경', '뷰', '포토존', '인생샷'],
  },
];

export const THEME_CATEGORIES = {
  feeling: {
    name: '감성별 테마',
    emoji: '💭',
    description: '어떤 분위기의 여행을 원하세요?',
  },
  season: {
    name: '계절별 테마',
    emoji: '🌍',
    description: '지금 가기 좋은 시즌을 선택하세요',
  },
  special: {
    name: '특색 테마',
    emoji: '✨',
    description: '특별한 관심사로 찾아보세요',
  },
};
