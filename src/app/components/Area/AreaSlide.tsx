'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { AreaHeaderSlide, areaCodeMap } from '@/app/constant/SlideConstant';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons/faCircleLeft';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons/faCircleRight';
import Spinner from '@/app/components/Common/Spinner';
import { useLocationData } from '@/app/hooks/useLocationData';
import { useLocationStore } from '@/app/stores/useLocationStore';
import { useUIStore, useWindowSizeEffect } from '@/app/stores/useAreaUiStore';

export default function AreaSlide() {
  // 상태 변수 및 훅
  const { userLocation } = useLocationStore();
  const { data: locationData } = useLocationData();
  const { selectedArea, setSelectedArea } = useUIStore();

  // 창 크기 추적
  useWindowSizeEffect();

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const swiperRef = useRef<SwiperType | null>(null);

  // 슬라이드 클릭 시, 해당 슬라이드를 선택하고 활성화된 슬라이드 인덱스를 변경
  const handleSlideClick = (index: number) => {
    const selected = AreaHeaderSlide[index].title;
    setSelectedArea(selected);
    setActiveIndex(index);

    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  // selectedArea가 변경되면 해당 인덱스를 찾아 활성화된 슬라이드 인덱스를 설정
  useEffect(() => {
    const selectedIndex = AreaHeaderSlide.findIndex((slide) => slide.title === selectedArea);
    if (selectedIndex !== -1) {
      setActiveIndex(selectedIndex);
      if (swiperRef.current) {
        swiperRef.current.slideTo(selectedIndex, 0);
      }
    }
  }, [selectedArea]);

  // userLocation과 locationData가 존재할 경우, areaCode를 추출하고 해당 지역에 맞는 제목을 설정
  useEffect(() => {
    if (userLocation && locationData) {
      const areaCode = locationData.areaCode;

      if (areaCode) {
        const areaName = Object.keys(areaCodeMap).find((key) => areaCodeMap[key] === areaCode);
        if (areaName && areaName !== selectedArea) {
          setSelectedArea(areaName); // 기존 상태와 다를 경우에만 업데이트
        }
      }
    }
  }, [userLocation, locationData, selectedArea, setSelectedArea]);

  // activeIndex가 -1인 경우 로딩 상태로 Spinner 컴포넌트를 표시
  if (activeIndex === -1) {
    return (
      <div className="pb-5">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden lg:flex lg:w-full lg:items-center lg:justify-between lg:p-6 1xl:m-auto 1xl:w-[62.5rem]">
        {/* 이전 슬라이드 버튼 */}
        <div className="swiper-button-prev hidden cursor-pointer text-[1.375rem] text-black lg:block">
          <FontAwesomeIcon icon={faCircleLeft} />
        </div>

        {/* Swiper 컴포넌트로 슬라이드들 렌더링 */}
        <div className="overflow-hidden lg:w-[56.25rem]">
          <Swiper
            slidesPerView="auto"
            centeredSlides={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            initialSlide={activeIndex}
            modules={[Navigation]}
            effect="slide"
            grabCursor={true}
            className="h-full w-full"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {AreaHeaderSlide.map((slide, index) => (
              <SwiperSlide
                key={index}
                className={`ml-[0.5rem] mr-[0.5rem] flex h-full w-full max-w-[2.8125rem] md:max-w-[5.9375rem] lg:max-w-[4.0625rem]${
                  activeIndex === index
                    ? 'max-w-[3.25rem] md:max-w-[6.5625rem] lg:max-w-[5rem]'
                    : 'max-w-[2.8125rem] md:max-w-[5.9375rem] lg:max-w-[4.0625rem]'
                }`}
                onClick={() => handleSlideClick(index)}
              >
                <div
                  className={`flex h-full flex-col items-center justify-center ${
                    activeIndex === index
                      ? 'w-[3.25rem] md:w-[6.5625rem] lg:w-[5rem]'
                      : 'w-[2.8125rem] md:w-[5.9375rem] lg:w-[4.0625rem]'
                  }`}
                >
                  <img
                    className={`h-full w-full rounded-full border-2 object-cover ${
                      activeIndex === index ? 'border-black' : 'border-transparent'
                    }`}
                    src={slide.image}
                    alt={slide.title}
                    width={52}
                    height={52}
                  />
                  <p
                    className={`mt-2 text-center text-[0.75rem] ${
                      activeIndex === index
                        ? 'text-[0.8125rem] font-semibold lg:text-[1.25rem]'
                        : 'font-normal lg:text-[1.0625rem]'
                    }`}
                  >
                    {slide.title} {/* 슬라이드 제목 표시 */}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 다음 슬라이드 버튼 */}
        <div className="swiper-button-next hidden cursor-pointer text-[1.375rem] text-black lg:block">
          <FontAwesomeIcon icon={faCircleRight} />
        </div>
      </div>
    </>
  );
}
