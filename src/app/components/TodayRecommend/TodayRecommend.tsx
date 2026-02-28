'use client';

import { useState } from 'react';
import { useTodayRecommend } from '@/app/hooks/useTodayRecommend';
import { useWeather } from '@/app/hooks/useWeather';
import { getTimeBasedRecommendation } from '@/app/utils/getTimeBasedRecommendation';
import { getWeatherRecommendation } from '@/app/utils/getWeatherRecommendation';
import { SearchApiResponse } from '@/app/types/ItemType';
import { areaCodeMap } from '@/app/constant/SlideConstant';
import RecommendCard from './RecommendCard';
import Skeleton from '@/app/components/Common/Skeleton';

const POPULAR_AREAS = [
  { name: '전국', code: '' },
  { name: '서울', code: '1' },
  { name: '부산', code: '6' },
  { name: '제주', code: '39' },
];

const TodayRecommend = () => {
  const [selectedArea, setSelectedArea] = useState('전국');
  const timeRec = getTimeBasedRecommendation();
  const areaCode = areaCodeMap[selectedArea] || '';
  const { data, isLoading, error } = useTodayRecommend(areaCode);
  const { data: weatherData } = useWeather();

  // 날씨 정보 추출
  const weatherRec = weatherData
    ? getWeatherRecommendation(weatherData.sky, weatherData.pty, weatherData.tmp)
    : null;

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Skeleton className="mb-4 h-8 w-64" />
          <Skeleton className="mb-6 h-4 w-48" />
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-48 flex-shrink-0 md:h-48 md:w-56" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-red-50 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-red-600">에러 발생: {error.message}</p>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="bg-yellow-50 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-yellow-800">데이터가 없습니다. (data: {JSON.stringify(data)})</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">
            {timeRec.icon} {timeRec.title}
          </h2>
          <p className="text-sm text-gray-600 md:text-base">{timeRec.description}</p>

          {/* 날씨 정보 */}
          {weatherRec && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/60 px-4 py-2 backdrop-blur-sm">
              <span className="text-2xl">{weatherRec.weatherIcon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{weatherRec.weatherTitle}</p>
                <p className="text-xs text-gray-600">{weatherRec.weatherDescription}</p>
              </div>
              {weatherData && weatherData.tmp && (
                <span className="ml-auto text-sm font-medium text-gray-700">
                  {weatherData.tmp}°C
                </span>
              )}
            </div>
          )}
        </div>

        {/* 지역 선택 버튼 */}
        <div className="mb-4 flex gap-2">
          {POPULAR_AREAS.map((area) => (
            <button
              key={area.name}
              onClick={() => setSelectedArea(area.name)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedArea === area.name
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>

        <div className="scroll-container flex gap-4 overflow-x-auto pb-4">
          {data.slice(0, 6).map((item: SearchApiResponse) => (
            <RecommendCard key={item.contentid} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodayRecommend;
