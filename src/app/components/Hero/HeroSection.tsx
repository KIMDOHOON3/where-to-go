'use client';

import Image from 'next/image';
import { useTourWeather } from '@/app/hooks/useTourWeather';

const HeroSection = () => {
  // 서울 지역 코드 (기본값으로 설정)
  const { data: weatherData, isLoading: weatherLoading } = useTourWeather('1');

  const getWeatherIcon = (condition: string) => {
    const iconMap: Record<string, string> = {
      맑음: '☀️',
      흐림: '☁️',
      비: '🌧️',
      눈: '❄️',
    };
    return iconMap[condition] || '🌤️';
  };

  return (
    <section className="relative h-[400px] w-full overflow-hidden md:h-[500px] lg:h-[600px]">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/main/main1.png"
          alt="여행 배경"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* 오버레이 */}
        <div className="from-black/40 via-black/20 to-black/60 absolute inset-0 bg-gradient-to-b" />
      </div>

      {/* 날씨 배너 (상단 우측) */}
      {!weatherLoading && weatherData?.current && (
        <div className="bg-white/90 absolute right-6 top-6 z-20 rounded-lg px-4 py-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getWeatherIcon(weatherData.current.condition)}</span>
            <div className="text-gray-800 text-sm">
              <p className="font-semibold">{weatherData.current.temperature}°C</p>
              <p className="text-gray-600">{weatherData.current.condition}</p>
              <p className="text-gray-500 text-xs">습도 {weatherData.current.humidity}%</p>
            </div>
          </div>
        </div>
      )}

      {/* 컨텐츠 */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
          당신의 완벽한 여행을 찾아드릴게요
        </h1>
        <p className="text-white/90 mb-8 max-w-2xl text-lg drop-shadow-md md:text-xl">
          가족, 친구, 연인, 혼자, 반려견과 함께하는
          <br className="hidden md:block" />
          나에게 딱 맞는 여행 코스를 발견하세요
        </p>

        {/* 오늘의 추천 배너 */}
        {!weatherLoading && weatherData?.recommendation && (
          <div className="text-gray-900 mb-6 rounded-full bg-yellow-400/90 px-6 py-2 text-sm font-semibold drop-shadow-md">
            💡 {weatherData.recommendation}
          </div>
        )}

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
