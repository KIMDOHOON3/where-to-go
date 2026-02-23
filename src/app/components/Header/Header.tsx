'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import throttle from 'lodash/throttle';
import Navigation from '@/app/components/Header/Navigation';
import Search from '@/app/components/Header/Search';
import ThemeToggle from '@/app/components/Header/ThemeToggle';
import HeaderLogoIcon from '@/app/components/Header/HeaderLogoIcon';
import MobileNavigation from '@/app/components/Header/MoblieNavigation';
import ScrollToTopButton from '@/app/components/Common/ScrollToTopButton';

export default function Header() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const SCROLL_THRESHOLD = 50; // 스크롤 임계값 (픽셀 단위)
  const THROTTLE_DELAY = 200; // 스로틀링 딜레이 (밀리초 단위)

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    // 컴포넌트가 마운트 된 후에 초기 스크롤 값 설정
    lastScrollYRef.current = window.scrollY;
  }, []);

  const controlHeader = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;

        if (window.innerWidth < 1024) {
          // 모바일 환경
          if (Math.abs(currentScrollY - lastScrollYRef.current) > SCROLL_THRESHOLD) {
            if (currentScrollY > lastScrollYRef.current) {
              // 아래로 스크롤
              setIsHeaderVisible(false);
            } else {
              // 위로 스크롤
              setIsHeaderVisible(true);
            }
            lastScrollYRef.current = currentScrollY;
          }
        } else {
          // 데스크톱 환경
          setHeaderScrolled(currentScrollY > 10);
        }
      }, THROTTLE_DELAY),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    window.addEventListener('resize', controlHeader);

    return () => {
      window.removeEventListener('scroll', controlHeader);
      window.removeEventListener('resize', controlHeader);
      controlHeader.cancel();
    };
  }, [controlHeader]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 bg-white px-4 transition-all duration-300 md:px-3 lg:px-6 2xl:px-14 ${!isHeaderVisible ? '-translate-y-full' : 'translate-y-0'} ${headerScrolled ? 'lg:bg-white lg:shadow-md' : 'lg:bg-transparent'}`}
      >
        <div className="flex h-[3.125rem] items-center justify-between lg:h-[5.625rem]">
          <div className="h-[3.125rem] w-[8.0625rem] lg:h-[2.25rem] lg:w-[12.9375rem]">
            <Link className="relative block h-full w-full" href="/" aria-label="메인으로 이동">
              <HeaderLogoIcon className="head-logo h-full w-full" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <Navigation />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Search />
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="block lg:hidden">
          <Search />
        </div>
        <div className="block lg:hidden">
          <Navigation />
        </div>
      </header>
      <div className="fixed bottom-0 left-0 z-40 block w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
        <MobileNavigation />
      </div>
      <ScrollToTopButton
        className={`bg-black transition-all duration-300 lg:fixed lg:bottom-[4.5rem] lg:right-6 lg:z-40 lg:h-10 lg:w-10 lg:rounded-full lg:border lg:border-white 2xl:right-14 ${headerScrolled ? 'lg:opacity-1 lg:cursor-pointer' : 'lg:opacity-0'}`}
        buttonClassName="text-transparent lg:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        showText={false}
        aria-label="페이지 맨 위로 이동"
      />
    </>
  );
}
