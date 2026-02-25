// useMainSlideLogic.ts
import { useEffect, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import { useMainSlideStore } from '@/app/stores/useMainSlideStore';

export const useMainSlideLogic = () => {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const topSwiperRef = useRef<SwiperType | null>(null);
  const textSwiperRef = useRef<SwiperType | null>(null);

  const {
    galleryTopSwiper,
    setGalleryTopSwiper,
    galleryTextSwiper,
    setGalleryTextSwiper,
    isPlaying,
    setIsPlaying,
    currentSlide,
    setCurrentSlide,
    bgColor,
    setBgColor,
    showNavigation,
    setShowNavigation,
  } = useMainSlideStore();

  useEffect(() => {
    const topSwiper = topSwiperRef.current;
    const textSwiper = textSwiperRef.current;

    if (topSwiper && textSwiper) {
      topSwiper.controller.control = textSwiper;
      textSwiper.controller.control = topSwiper;
    }
  }, []);

  const handlePlayPause = () => {
    if (galleryTopSwiper && galleryTopSwiper.autoplay) {
      if (isPlaying) {
        galleryTopSwiper.autoplay.stop();
        if (progressBarRef.current) {
          progressBarRef.current.style.animationPlayState = 'paused';
        }
      } else {
        galleryTopSwiper.autoplay.start();
        if (progressBarRef.current) {
          progressBarRef.current.style.animationPlayState = 'running';
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (progressBarRef.current) {
      const progressBar = progressBarRef.current;
      progressBar.classList.remove('animate-progress');
      void progressBar.offsetWidth;
      progressBar.classList.add('animate-progress');
    }
  }, [currentSlide]);

  useEffect(() => {
    if (currentSlide === 1) {
      setBgColor('bg-custompink');
    } else if (currentSlide === 2) {
      setBgColor('bg-customyellow');
    } else if (currentSlide === 3) {
      setBgColor('bg-customskyblue');
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setShowNavigation(window.innerWidth >= 1024);
      }
    };

    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      handleResize(); // 초기 로드 시 실행
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, []);

  return {
    progressBarRef,
    topSwiperRef,
    textSwiperRef,
    galleryTopSwiper,
    setGalleryTopSwiper,
    galleryTextSwiper,
    setGalleryTextSwiper,
    handlePlayPause,
    currentSlide,
    setCurrentSlide,
    bgColor,
    showNavigation,
    setShowNavigation,
    isPlaying,
  };
};
