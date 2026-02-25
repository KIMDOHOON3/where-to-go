'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchData } from '@/app/hooks/useSearchData';
import { SearchApiResponse } from '@/app/types/ItemType';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import DataError from '@/app/components/Common/Error';
import SearchSection from '@/app/components/Search/SearchSection';
import SearchContainerSkeleton from '@/app/components/Search/SearchContainerSkeleton';
import SearchSectionSkeleton from '@/app/components/Search/SearchSectionSkeleton';
import Modal from '@/app/components/Common/Modal';
import { useModalLogic } from '@/app/hooks/useModalLogic';

const contentTypeNames: { [key: string]: string } = {
  '12': '🏛️ 관광지',
  '14': '🎨 문화시설',
  '15': '🎉 행사',
  '32': '🏨 숙박',
  '39': '🍽️ 음식점',
};

export default function SearchContainer() {
  const { keyword } = useInteractionStore();
  const [numOfRows] = useState(100);
  const [contentTypeId, setContentTypeId] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const prevKeywordRef = useRef<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { isModalOpen, openModal, closeModal } = useModalLogic();

  const { data, isLoading, isError, error } = useSearchData(keyword, numOfRows, contentTypeId);

  const debouncedSearch = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (keyword !== prevKeywordRef.current) {
        setContentTypeId(null);
        setExpandedCategory(null);
        prevKeywordRef.current = keyword;
      }
    }, 300);
  }, [keyword]);

  useEffect(() => {
    debouncedSearch();

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [keyword, contentTypeId, debouncedSearch]);

  const groupedData = useMemo(() => {
    if (!data) return {};

    return data.reduce(
      (acc, item) => {
        const contentType = item.contenttypeid;
        if (contentType && contentTypeNames[contentType]) {
          if (!acc[contentType]) {
            acc[contentType] = [];
          }
          acc[contentType].push(item);
        }
        return acc;
      },
      {} as { [key: string]: SearchApiResponse[] }
    );
  }, [data]);

  const handleCategoryChange = useCallback((id: string | null) => {
    setContentTypeId(id);
    setExpandedCategory(null);
  }, []);

  const handleExpandCategory = useCallback((id: string) => {
    setExpandedCategory(id);
    setContentTypeId(id);
  }, []);

  const highlightKeyword = useCallback((text: string, keyword: string): (string | JSX.Element)[] => {
    if (!keyword.trim()) return [text];
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part: string, index: number) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="text-red">
          {part}
        </span>
      ) : (
        part
      )
    );
  }, [keyword]);

  if (!keyword) {
    return (
      <div className="mx-auto p-4 text-center lg:mt-28">
        <h1 className="text-2xl font-bold">어디로 여행을 떠날 예정인가요?</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <SearchContainerSkeleton />
        <SearchSectionSkeleton />
        <SearchSectionSkeleton />
        <SearchSectionSkeleton />
      </>
    );
  }

  if (error && isError) {
    return (
      <div className="mt-7 flex flex-col items-center gap-3 lg:mt-32">
        <DataError />
      </div>
    );
  }

  const hasAnyResults = Object.values(groupedData).some((group) => group.length > 0);

  return (
    <div className="inline-block h-full min-h-screen w-full bg-[#f4f6f8] lg:pt-24">
      <div className="lg:mx-auto lg:max-w-[62.5rem]">
        <div className="mb-4 bg-white lg:bg-transparent">
          <h1 className="p-4 text-xl font-bold">
            {highlightKeyword(`"${keyword}" 검색 결과`, keyword)}
          </h1>
          <div className="scroll-container">
            <div className="mb-4 flex space-x-2 px-4 lg:justify-between">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`w-24 flex-shrink-0 rounded-full border border-black px-3 py-1 text-sm lg:w-auto lg:px-10 lg:text-lg ${
                  !contentTypeId ? 'bg-black text-white' : 'bg-gray-200 bg-white'
                }`}
              >
                전체
              </button>
              {Object.entries(contentTypeNames).map(([id, name]) => (
                <button
                  key={id}
                  onClick={() => handleCategoryChange(id)}
                  className={`w-24 flex-shrink-0 rounded-full border border-black px-1 py-1 text-sm lg:w-auto lg:px-10 lg:text-lg ${
                    contentTypeId === id ? 'bg-black text-white' : 'bg-gray-200 bg-white'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {hasAnyResults ? (
          contentTypeId === null ? (
            Object.entries(contentTypeNames).map(([id, name]) => {
              const items = groupedData[id] || [];
              if (items.length === 0) return null;
              return (
                <SearchSection
                  key={id}
                  contentTypeId={id}
                  name={name}
                  items={items}
                  isExpanded={expandedCategory === id}
                  onExpand={() => handleExpandCategory(id)}
                  onClick={openModal}
                  highlightKeyword={highlightKeyword}
                  keyword={keyword}
                />
              );
            })
          ) : (
            contentTypeNames[contentTypeId] &&
            groupedData[contentTypeId]?.length > 0 && (
              <SearchSection
                contentTypeId={contentTypeId}
                name={contentTypeNames[contentTypeId]}
                items={groupedData[contentTypeId]}
                isExpanded={expandedCategory === contentTypeId}
                onExpand={() => handleExpandCategory(contentTypeId)}
                onClick={openModal}
                highlightKeyword={highlightKeyword}
                keyword={keyword}
              />
            )
          )
        ) : (
          <div className="mx-4 mb-6 rounded-lg bg-white p-8 text-center shadow-md">
            <p className="text-gray-800 mb-2 text-lg font-semibold">
              해당 카테고리에 검색결과가 없습니다.
            </p>
            <p className="text-gray-600">다른 카테고리를 선택해주세요.</p>
          </div>
        )}
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}
