'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { TRAVEL_TYPE_INFO } from '@/app/constant/apiConstants';
import { useTourWeather } from '@/app/hooks/useTourWeather';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlideSection = () => {
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
    <Swiper
      modules={[EffectFade, Autoplay, Navigation, Pagination]}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="h-[500px] w-full md:h-[600px] lg:h-[700px]"
    >
      {/* 메인 히어로 슬라이드 */}
      <SwiperSlide>
        <div className="relative h-full w-full">
          <Image
            src="/main/main1.png"
            alt="여행 배경"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="from-black/40 via-black/20 to-black/60 absolute inset-0 bg-gradient-to-b" />

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

            {!weatherLoading && weatherData?.recommendation && (
              <div className="text-gray-900 mb-6 rounded-full bg-yellow-400/90 px-6 py-2 text-sm font-semibold drop-shadow-md">
                💡 {weatherData.recommendation}
              </div>
            )}
          </div>
        </div>
      </SwiperSlide>

      {/* 여행 타입 슬라이드들 */}
      {TRAVEL_TYPE_INFO.map((type) => (
        <SwiperSlide key={type.id}>
          <Link href={`/course/${type.id}`}>
            <div className="group relative h-full w-full cursor-pointer overflow-hidden">
              <Image
                src={type.image}
                alt={type.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="100vw"
              />
              <div className="from-black/20 via-black/40 to-black/70 absolute inset-0 bg-gradient-to-b" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 text-6xl md:text-7xl">{type.icon}</div>
                <h2 className="mb-3 text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
                  {type.title}
                </h2>
                <p className="text-white/90 max-w-md text-lg drop-shadow-md md:text-xl">
                  {type.description}
                </p>
                <button className="text-gray-900 hover:bg-gray-100 mt-8 rounded-full bg-white px-8 py-3 font-semibold transition-colors">
                  {type.title} 코스 보기 →
                </button>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlideSection;
