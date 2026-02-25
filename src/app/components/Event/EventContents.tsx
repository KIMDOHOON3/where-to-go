'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { useEventData } from '@/app/hooks/useEventData';
import EventHeader from '@/app/components/Event/EventHeader';
import EventCalendar from '@/app/components/Event/EventCalendar';
import EventCard from '@/app/components/Event/EventCard';
import EventPagination from '@/app/components/Event/EventPagination';
import DataError from '@/app/components/Common/Error';
import EmptyState from '@/app/components/Common/EmptyState';
import EventSkeleton from '@/app/components/Event/EventSkeleton';
import { useModalLogic } from '@/app/hooks/useModalLogic';

const Modal = dynamic(() => import('@/app/components/Common/Modal'), {
  ssr: false,
  loading: () => null,
});

export default function EventContents() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('전국');
  const { isModalOpen, openModal, closeModal } = useModalLogic();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const eventStartDate = currentDate
    ? `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`
    : '';

  const { data: eventData, isLoading, error } = useEventData(selectedArea, eventStartDate);

  const handlePrevDay = useCallback(() => {
    if (!currentDate) return;
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  }, [currentDate]);

  const handleNextDay = useCallback(() => {
    if (!currentDate) return;
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  }, [currentDate]);

  useEffect(() => {
    if (currentDate && eventStartDate) {
      // queryKey 변경 시 자동 refetch되므로 수동 호출 불필요
      setActiveIndex(0);
      swiperRef.current?.slideTo(0);
    }
  }, [currentDate, selectedArea, eventStartDate]);

  if (!currentDate) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mt-8">
      <EventHeader selectedArea={selectedArea} onAreaChange={setSelectedArea} />

      <div className="relative w-full bg-black py-5 2xl:py-10">
        <EventCalendar
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
        />
        {isLoading ? (
          <EventSkeleton />
        ) : error ? (
          <div className="mt-5 flex flex-col items-center gap-4">
            <DataError />
          </div>
        ) : eventData && eventData.length > 0 ? (
          <>
            <Swiper
              className="mt-5 w-full cursor-pointer 2xl:mt-10"
              slidesPerView={1.5}
              breakpoints={{
                1920: {
                  slidesPerView: 2.5,
                },
              }}
              centeredSlides={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {eventData.map((event) => (
                <SwiperSlide
                  className="mr-4 !w-[65%] lg:!w-[45%] 2xl:!w-[50rem]"
                  key={event.contentid}
                >
                  <EventCard event={event} onClick={openModal} />
                </SwiperSlide>
              ))}
            </Swiper>
            <EventPagination
              eventData={eventData}
              activeIndex={activeIndex}
              onPaginationClick={(pagination) => swiperRef.current?.slideTo(pagination)}
            />
          </>
        ) : (
          <div className="text-center">
            <EmptyState type="date" mainClassName="text-white" subClassName="text-white" />
          </div>
        )}
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </section>
  );
}
