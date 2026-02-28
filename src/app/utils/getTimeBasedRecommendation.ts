interface TimeBasedRecommendation {
  icon: string;
  title: string;
  description: string;
  keywords: string[];
  categoryFilter: string; // '12' = 관광지, '39' = 맛집
}

export const getTimeBasedRecommendation = (): TimeBasedRecommendation => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0(일) ~ 6(토)
  const isWeekend = day === 0 || day === 6; // 주말: 토요일, 일요일

  // 오전 (06:00-11:00)
  if (hour >= 6 && hour < 11) {
    if (isWeekend) {
      return {
        icon: '🌅',
        title: '주말 아침, 가족과 함께',
        description: '가족 나들이하기 좋은 자연 명소',
        keywords: ['공원', '가족', '자연', '나들이'],
        categoryFilter: '12', // 관광지
      };
    }
    return {
      icon: '☕',
      title: '평일 아침, 여유로운 시작',
      description: '한적하게 즐길 수 있는 산책로',
      keywords: ['공원', '산책', '조용한'],
      categoryFilter: '12', // 관광지
    };
  }

  // 점심 (11:00-14:00)
  if (hour >= 11 && hour < 14) {
    if (isWeekend) {
      return {
        icon: '🍽️',
        title: '주말 점심, 인기 맛집',
        description: '줄 서서라도 먹고 싶은 맛집',
        keywords: ['맛집', '인기', '맛있는'],
        categoryFilter: '39', // 맛집
      };
    }
    return {
      icon: '🍜',
      title: '평일 점심, 한적한 맛집',
      description: '여유롭게 즐기는 점심 식사',
      keywords: ['맛집', '한적한', '점심'],
      categoryFilter: '39', // 맛집
    };
  }

  // 오후 (14:00-18:00)
  if (hour >= 14 && hour < 18) {
    if (isWeekend) {
      return {
        icon: '🎡',
        title: '주말 오후, 즐거운 나들이',
        description: '온 가족이 함께 즐길 수 있는 곳',
        keywords: ['테마파크', '박물관', '가족', '나들이'],
        categoryFilter: '12', // 관광지
      };
    }
    return {
      icon: '🏛️',
      title: '평일 오후, 조용한 문화생활',
      description: '한적하게 즐기는 문화 공간',
      keywords: ['미술관', '전시', '조용한', '문화'],
      categoryFilter: '12', // 관광지
    };
  }

  // 저녁 (18:00-22:00)
  if (hour >= 18 && hour < 22) {
    if (isWeekend) {
      return {
        icon: '🌆',
        title: '주말 저녁, 화려한 야경',
        description: '활기찬 분위기의 야경 명소',
        keywords: ['야경', '데이트', '인기'],
        categoryFilter: '12', // 관광지
      };
    }
    return {
      icon: '🌃',
      title: '평일 저녁, 한적한 야경',
      description: '조용히 즐기는 밤의 풍경',
      keywords: ['야경', '한적한', '조용한'],
      categoryFilter: '12', // 관광지
    };
  }

  // 심야 (22:00-06:00)
  if (isWeekend) {
    return {
      icon: '🌙',
      title: '주말 심야, 밤샘 명소',
      description: '늦은 시간까지 활기찬 곳',
      keywords: ['24시간', '심야', '카페', '활기찬'],
      categoryFilter: '39', // 맛집
    };
  }
  return {
    icon: '💤',
    title: '평일 심야, 조용한 휴식',
    description: '조용히 쉴 수 있는 24시간 공간',
    keywords: ['24시간', '조용한', '휴식'],
    categoryFilter: '39', // 맛집
  };
};
