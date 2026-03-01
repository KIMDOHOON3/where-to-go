// src/app/api/tour-weather/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const areaCode = searchParams.get('areaCode');

  if (!areaCode) {
    return NextResponse.json({ error: 'areaCode가 필요합니다' }, { status: 400 });
  }

  const serviceKey = process.env.TOUR_WEATHER_API_KEY;

  if (!serviceKey) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다' }, { status: 500 });
  }

  try {
    const decodedKey = decodeURIComponent(serviceKey);

    // 관광코스별 관광지 상세 날씨 조회서비스 호출
    await axios.get('https://apis.data.go.kr/B551011/KorService2/areaBasedList2', {
      params: {
        serviceKey: decodedKey,
        areaCode,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        _type: 'json',
        numOfRows: 10,
        pageNo: 1,
      },
      timeout: 10000,
    });

    // 현재 간단한 날씨 정보 시뮬레이션
    // 실제로는 기상청 API에서 상세 날씨 데이터를 받아야 함
    const now = new Date();
    const weatherInfo = {
      current: {
        areaCode,
        date: now.toISOString().split('T')[0],
        hour: now.getHours().toString().padStart(2, '0'),
        temperature: Math.floor(Math.random() * 15) + 10,
        condition: ['맑음', '흐림', '비', '눈'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 15) + 3,
        rainProbability: Math.floor(Math.random() * 60),
      },
      forecast: [
        {
          areaCode,
          date: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          hour: '12',
          temperature: Math.floor(Math.random() * 15) + 10,
          condition: ['맑음', '흐림', '비'][Math.floor(Math.random() * 3)],
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 15) + 3,
          rainProbability: Math.floor(Math.random() * 60),
        },
      ],
      recommendation: '날씨가 좋으니 야외 활동에 최고예요! 햇빛 차단제를 꼭 준비하세요.',
    };

    return NextResponse.json({ data: weatherInfo });
  } catch (error) {
    console.error('Tour Weather API 호출 실패:', error);
    return NextResponse.json(
      { error: '날씨 정보를 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
};
