'use client';

import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';
import 'swiper/css/grid';
import Spinner from '@/app/components/Common/Spinner';
import CategorySelector from '@/app/components/Area/AreaContents/CategorySelector';
import ProgressBar from '@/app/components/Common/ProgressBar';
import MoreButton from '@/app/components/Common/MoreButton';
import DataError from '@/app/components/Common/Error';
import EmptyState from '@/app/components/Common/EmptyState';
import AreaSlideProps from '@/app/components/Area/AreaContents/AreaSlideProps';
import { useAreaContentsLogic } from '@/app/hooks/useAreaContentsLogic';
import { useModalLogic } from '@/app/hooks/useModalLogic';
import { useInteractionStore } from '@/app/stores/useInteractionStore';

const Toast = dynamic(() => import('@/app/components/Common/Toast'), {
  ssr: false,
});

const Modal = dynamic(() => import('@/app/components/Common/Modal'), {
  ssr: false,
  loading: () => null,
});

export default function AreaContents() {
  const {
    filteredData,
    availableCategories,
    regionText,
    totalPages,
    handleSlideChange,
    generateKey,
    isLoading,
    error,
  } = useAreaContentsLogic();

  const { isModalOpen, openModal, closeModal } = useModalLogic();
  const { category } = useInteractionStore();

  // 에러 발생 시 표시할 UI
  if (error) {
    return (
      <div className="mt-7 flex flex-col items-center gap-3">
        <DataError />
      </div>
    );
  }

  return (
    <>
      <Toast />
      <section className="relative -top-5 rounded-tl-[1.375rem] bg-white pb-10 pl-4 pt-5 lg:-top-0 lg:px-6 lg:pb-12 lg:pt-12 1xl:m-auto 1xl:max-w-[62.5rem] 1xl:pl-0 1xl:pr-0">
        <h2 className="text-lg lg:text-2xl">{regionText}</h2>
        <CategorySelector availableCategories={availableCategories} />
        {isLoading ? (
          <div className="relative h-[25rem] md:h-[41.875rem]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <Spinner />
              <p>잠시만 기다려 주세요 :)</p>
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <Swiper
              slidesPerView={2.5}
              grid={{ rows: 2 }}
              breakpoints={{
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 4 },
              }}
              modules={[Grid]}
              onSlideChange={handleSlideChange}
              className="mt-[1.25rem] h-full w-full lg:mt-[3.125rem]"
            >
              {filteredData.map((item) => (
                <SwiperSlide
                  key={generateKey(item)}
                  className="flex w-full max-w-[18.75rem] flex-row items-center justify-center pb-[0.9375rem] pr-[0.9375rem] lg:pb-[1.875rem]"
                >
                  <AreaSlideProps item={item} onClick={openModal} />
                </SwiperSlide>
              ))}
            </Swiper>
            <ProgressBar className="lg:hidden" totalPages={totalPages} />
          </>
        )}
        <MoreButton
          className="mt-4"
          href="/morepage"
          text="더많은"
          strongText={category || '여행지'}
        />
      </section>
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}
