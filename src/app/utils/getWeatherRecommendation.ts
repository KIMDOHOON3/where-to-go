interface WeatherRecommendation {
  weatherIcon: string;
  weatherTitle: string;
  weatherDescription: string;
  recommendationType: 'outdoor' | 'indoor' | 'both';
}

export const getWeatherRecommendation = (
  sky?: string, // 하늘상태: 1(맑음), 3(구름많음), 4(흐림)
  pty?: string, // 강수형태: 0(없음), 1(비), 2(비/눈), 3(눈), 4(소나기)
  tmp?: string // 기온
): WeatherRecommendation => {
  // 날씨 정보가 없으면 기본값 반환
  if (!sky || !pty) {
    return {
      weatherIcon: '☁️',
      weatherTitle: '날씨 정보 없음',
      weatherDescription: '현재 날씨를 확인할 수 없습니다',
      recommendationType: 'both',
    };
  }

  const temp = tmp ? parseInt(tmp) : 20;

  // 강수형태 우선 체크
  // 눈 (3: 눈)
  if (pty === '3') {
    return {
      weatherIcon: '❄️',
      weatherTitle: '눈이 내려요',
      weatherDescription: '겨울 풍경을 즐길 수 있는 곳',
      recommendationType: 'outdoor',
    };
  }

  // 비/눈 (2: 비/눈)
  if (pty === '2') {
    return {
      weatherIcon: '🌨️',
      weatherTitle: '진눈깨비',
      weatherDescription: '실내에서 따뜻하게',
      recommendationType: 'indoor',
    };
  }

  // 비 (1: 비, 4: 소나기)
  if (pty === '1' || pty === '4') {
    return {
      weatherIcon: '🌧️',
      weatherTitle: '비가 내려요',
      weatherDescription: '실내에서 즐기기 좋은 곳',
      recommendationType: 'indoor',
    };
  }

  // 강수 없음 - 하늘상태 체크
  // 맑음 (1)
  if (sky === '1') {
    if (temp > 28) {
      return {
        weatherIcon: '☀️',
        weatherTitle: '화창하지만 더워요',
        weatherDescription: '시원한 실내 또는 물가 명소',
        recommendationType: 'both',
      };
    }
    if (temp < 0) {
      return {
        weatherIcon: '☀️',
        weatherTitle: '맑지만 추워요',
        weatherDescription: '따뜻한 실내 명소 추천',
        recommendationType: 'both',
      };
    }
    return {
      weatherIcon: '☀️',
      weatherTitle: '화창한 날씨',
      weatherDescription: '야외 활동하기 완벽한 날',
      recommendationType: 'outdoor',
    };
  }

  // 구름많음 (3)
  if (sky === '3') {
    return {
      weatherIcon: '⛅',
      weatherTitle: '구름 조금',
      weatherDescription: '야외 활동하기 좋은 날',
      recommendationType: 'outdoor',
    };
  }

  // 흐림 (4)
  if (sky === '4') {
    return {
      weatherIcon: '☁️',
      weatherTitle: '흐린 날씨',
      weatherDescription: '실내외 모두 좋은 날',
      recommendationType: 'both',
    };
  }

  // 기본값
  return {
    weatherIcon: '☁️',
    weatherTitle: '날씨 확인 중',
    weatherDescription: '오늘의 추천 장소',
    recommendationType: 'both',
  };
};
