'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const banners: BannerSlide[] = [
  {
    id: 1,
    title: '완벽한 여행 준비를 위한\n여행 어디가?',
    subtitle: '국내 여행의 모든 것을 한곳에서',
    image: '/main/main1.png',
  },
  {
    id: 2,
    title: '나의 성향에 따른\n맞춤형 여행지',
    subtitle: '가족, 친구, 연인과 함께하는 여행',
    image: '/main/main2.png',
  },
  {
    id: 3,
    title: '지금 가볼만한 곳\n추천해드릴게요',
    subtitle: '계절별, 테마별 인기 여행코스',
    image: '/main/main3.png',
  },
];

const MainBannerSlide = () => {
  return (
    <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full w-full">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="bg-black/35 absolute inset-0" />

              <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-16">
                <h1 className="mb-3 whitespace-pre-line text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
                  {banner.title}
                </h1>
                <p className="text-white/95 text-base drop-shadow-md md:text-lg">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBannerSlide;
