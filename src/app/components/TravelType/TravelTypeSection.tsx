'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { TRAVEL_TYPE_INFO } from '@/app/constant/apiConstants';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const TravelTypeSection = () => {
  return (
    <section className="bg-[var(--white)] px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-[var(--black)] md:text-3xl">
            어떤 여행을 계획하고 계신가요?
          </h2>
          <p className="text-[var(--gray6)]">여행 스타일에 맞는 코스를 추천해드릴게요</p>
        </div>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.5}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="travel-type-swiper pb-12"
        >
          {TRAVEL_TYPE_INFO.map((type) => (
            <SwiperSlide key={type.id}>
              <Link href={`/course/${type.id}`}>
                <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg">
                  {/* 이미지 */}
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* 텍스트 */}
                  <div className="p-5 text-center">
                    <span className="mb-2 block text-4xl">{type.icon}</span>
                    <h3 className="mb-1 text-xl font-bold text-[var(--black)]">{type.title}</h3>
                    <p className="text-sm text-[var(--gray6)]">{type.description}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TravelTypeSection;
