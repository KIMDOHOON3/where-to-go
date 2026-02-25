'use client';

import { useMainSlideLogic } from '@/app/hooks/useMainSlideLogic';
import MainImageSlider from '@/app/components/MainSlide/MainImageSlider';
import MainTextSlider from '@/app/components/MainSlide/MainTextSlider';
import MainProgress from '@/app/components/MainSlide/MainProgress';
import MainSlideCounter from '@/app/components/MainSlide/MainSlideCounter';
import MainSlideControls from '@/app/components/MainSlide/MainSlideControls';

const MainSlide: React.FC = () => {
  const {
    progressBarRef,
    setGalleryTopSwiper,
    galleryTextSwiper,
    setGalleryTextSwiper,
    currentSlide,
    setCurrentSlide,
    handlePlayPause,
    bgColor,
    showNavigation,
    isPlaying,
  } = useMainSlideLogic();

  return (
    <div
      className={`relative w-full ${bgColor} after-example transition-colors duration-1000 ease-in-out`}
    >
      <div className="clearfix relative lg:pb-[5rem] lg:pt-[8.75rem]">
        <div className="z-5 relative float-right h-[18.75rem] w-full pl-[0.9375rem] pt-[1.25rem] md:h-[35.625rem] lg:h-[21.875rem] lg:max-w-[28.3125rem] xl:h-[28.75rem] xl:max-w-[42.375rem] 2xl:h-[35.625rem] 2xl:max-w-[64.1875rem]">
          {/* 이미지 슬라이드 */}
          <MainImageSlider
            setGalleryTopSwiper={setGalleryTopSwiper}
            galleryTextSwiper={galleryTextSwiper}
            setCurrentSlide={setCurrentSlide}
            showNavigation={showNavigation}
          />
        </div>
        <div className="relative top-[-0.9375rem] w-auto lg:absolute lg:left-[0%] lg:top-1/2 lg:w-[31.6875rem] xl:left-[16%] xl:top-[40%] 2xl:left-[20%] 2xl:top-[30%]">
          {/* 텍스트 슬라이드 */}
          <MainTextSlider setGalleryTextSwiper={setGalleryTextSwiper} />
        </div>
        <div className="relative z-10 mx-auto flex w-[19.6875rem] items-center justify-between gap-[0.625rem] px-1 md:w-[43.75rem] lg:absolute lg:bottom-[6.875rem] lg:left-5 lg:w-[23.125rem] lg:gap-0 xl:left-[17%] 2xl:left-[21%]">
          {/* 프로그레스 바 */}
          <MainProgress progressBarRef={progressBarRef} />
          {/* 슬라이드 번호 표시 */}
          <MainSlideCounter currentSlide={currentSlide} />
          <MainSlideControls
            showNavigation={showNavigation}
            isPlaying={isPlaying}
            handlePlayPause={handlePlayPause}
          />
        </div>
      </div>
    </div>
  );
};

export default MainSlide;
