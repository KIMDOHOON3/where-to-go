'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useStayData } from '@/app/hooks/useStayData';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import ProgressBar from '@/app/components/Common/ProgressBar';
import MoreButton from '@/app/components/Common/MoreButton';
import DataError from '@/app/components/Common/Error';
import EmptyState from '@/app/components/Common/EmptyState';
import AccomdationHeader from '@/app/components/Accomdation/AccomdationHeader';
import AccomdationList from '@/app/components/Accomdation/AccomdationList';
import AccomdationSkeleton from '@/app/components/Accomdation/AccomdationSkeleton';
import { useModalLogic } from '@/app/hooks/useModalLogic';
import { useUIStore } from '@/app/stores/useAreaUiStore';

const Modal = dynamic(() => import('@/app/components/Common/Modal'), {
  ssr: false,
  loading: () => null,
});

export default function AccomdationContents() {
  const { setCurrentPage } = useInteractionStore();
  const { selectedArea, setSelectedArea } = useUIStore();
  const { isModalOpen, openModal, closeModal } = useModalLogic();

  const { data: stayData, isLoading, error } = useStayData(selectedArea);

  return (
    <section className="mt-6 1xl:mx-auto 1xl:max-w-[62.5rem]">
      <div className="px-4 lg:px-6">
        {/* 아이콘 & 제목 */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-9 lg:w-11">
            <Image
              className="w-full"
              src="/icons/hotel2.png"
              alt="숙박아이콘"
              width={512}
              height={512}
            />
          </div>
          <h1 className="text-primary text-lg font-bold lg:text-2xl">한국관광공사 추천 숙박시설</h1>
        </div>
      </div>

      {/* 추천 기준 설명 */}
      <div className="border-gray-200 mx-4 mt-4 rounded-lg border bg-white p-4 shadow-md">
        <p className="text-center text-sm lg:text-lg">
          본 숙박시설은 한국관광공사의 인증을 받은123
          <br /> <span className="text-primary font-bold">&quot;베니키아&quot;</span>,{' '}
          <span className="text-primary font-bold">&quot;굿스테이&quot;</span> 숙소들로, 신뢰할 수
          있는 품질과 편안한 환경을 제공합니다.
        </p>
      </div>

      {/* 지역 선택 UI */}
      <div className="mt-6 pl-4 lg:px-6">
        <AccomdationHeader selectedArea={selectedArea} onSelect={setSelectedArea} />
      </div>

      {/* 숙박 데이터 표시 */}
      <div className="my-6 px-4 lg:px-6">
        {isLoading ? (
          <AccomdationSkeleton />
        ) : error ? (
          <div className="mt-7 flex flex-col items-center gap-3">
            <DataError />
          </div>
        ) : stayData && stayData.length > 0 ? (
          <>
            <AccomdationList
              stays={stayData}
              onSlideChange={setCurrentPage}
              onCardClick={openModal}
            />
            <ProgressBar totalPages={stayData.length} />
          </>
        ) : (
          <div className="text-center">
            <EmptyState type="area" mainClassName="text-black" subClassName="text-black" />
          </div>
        )}
      </div>
      <MoreButton href="/morepage" text="더많은" strongText="여행정보" />
      {isModalOpen && <Modal onClose={closeModal} />}
    </section>
  );
}
