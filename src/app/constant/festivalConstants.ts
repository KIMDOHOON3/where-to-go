// 행사 카테고리 정의
export const FESTIVAL_CATEGORIES = [
  { id: 'all', name: '전체', emoji: '🎉' },
  { id: 'music', name: '음악·공연', emoji: '🎵' },
  { id: 'food', name: '음식·축제', emoji: '🍴' },
  { id: 'culture', name: '문화·전시', emoji: '🎨' },
  { id: 'nature', name: '자연·산책', emoji: '🌿' },
] as const;

// 행사 타입 매핑
export const FESTIVAL_TYPE_MAPPING: Record<string, string> = {
  '12': 'music', // 공연, 행사
  '15': 'food', // 축제
  '28': 'culture', // 문화시설
  '32': 'nature', // 자연
  '25': 'culture', // 여행코스
  '38': 'culture', // 웹툰
} as const;

export const getFestivalCategory = (contentTypeId: string): string => {
  return FESTIVAL_TYPE_MAPPING[contentTypeId] || 'all';
};
