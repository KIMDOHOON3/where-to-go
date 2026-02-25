'use client';

import { useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import MoreCard from '@/app/components/MorePage/MoreCard';
import MoreSkeleton from '@/app/components/MorePage/MoreSkeleton';
import DataError from '@/app/components/Common/Error';
import { useUIStore } from '@/app/stores/useAreaUiStore';
import useTourDataInfinites from '@/app/hooks/useTourDataInfinites';
import { useModalLogic } from '@/app/hooks/useModalLogic';
import debounce from 'lodash/debounce';
import { useInteractionStore } from '@/app/stores/useInteractionStore';

const Toast = dynamic(() => import('@/app/components/Common/Toast'), {
  ssr: false,
});

const Modal = dynamic(() => import('@/app/components/Common/Modal'), {
  ssr: false,
  loading: () => null,
});

const MAX_ITEMS = 24;

export default function MoreContents() {
  const { category } = useInteractionStore();
  const { selectedArea } = useUIStore();
  const numOfRows = 8;
  const isFetchingRef = useRef(false); // 중복 호출 방지용 ref
  const {
    data: moreData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTourDataInfinites(selectedArea, numOfRows, category);
  const { isModalOpen, openModal, closeModal } = useModalLogic();
  const { ref, inView } = useInView({
    threshold: 0.5, // 요소가 50% 뷰포트에 들어왔을 때만 트리거
  });

  // useMemo로 debounce 함수 생성
  const fetchMoreData = useMemo(
    () =>
      debounce(() => {
        if (
          inView &&
          hasNextPage &&
          moreData.pages.flat().length < MAX_ITEMS &&
          !isFetchingRef.current
        ) {
          isFetchingRef.current = true; // 호출 중 상태 설정
          fetchNextPage().finally(() => {
            isFetchingRef.current = false; // 호출 완료 후 상태 해제
          });
        }
      }, 300),
    [inView, hasNextPage, fetchNextPage, moreData]
  );

  // useEffect에서 fetchMoreData 호출
  useEffect(() => {
    if (inView) {
      fetchMoreData();
    }
    return () => {
      fetchMoreData.cancel(); // 컴포넌트 언마운트 시 debounce 취소
    };
  }, [inView, fetchMoreData]);

  if (isLoading) return <MoreSkeleton />;
  if (error) return;
  <div className="flex flex-col items-center">
    <DataError />
  </div>;

  const tourList = moreData?.pages.flat().slice(0, MAX_ITEMS) ?? [];

  return (
    <>
      <Toast />
      <MoreCard moreData={tourList} onClick={openModal} />
      {tourList.length < MAX_ITEMS && (
        <div ref={ref} style={{ height: 20, background: 'transparent' }} />
      )}
      {isFetchingNextPage && <MoreSkeleton />}
      {isModalOpen && <Modal onClose={closeModal} />}
      {tourList.length >= MAX_ITEMS && (
        <div className="py-4 text-center">최대 24개의 항목만 표시됩니다.</div>
      )}
    </>
  );
}
