'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEventData } from '@/app/hooks/useEventData';
import FestivalHeroBanner from '@/app/components/Festival/FestivalHeroBanner';
import FestivalCategoryTabs from '@/app/components/Festival/FestivalCategoryTabs';
import FestivalCard from '@/app/components/Festival/FestivalCard';
import DataError from '@/app/components/Common/Error';
import EmptyState from '@/app/components/Common/EmptyState';
import { getFestivalCategory } from '@/app/constant/festivalConstants';
import { EventItem } from '@/app/types/ItemType';

export default function FestivalContainer() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedArea] = useState<string>('전국');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const eventStartDate = currentDate
    ? `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`
    : '';

  const { data: eventData, isLoading, error } = useEventData(selectedArea, eventStartDate);

  // 카테고리별 필터링
  const filteredData = eventData?.filter((event) => {
    const category = getFestivalCategory(event.contenttypeid);
    return selectedCategory === 'all' || category === selectedCategory;
  });

  // 히어로 배너용 데이터 (첫 번째 행사)
  const heroBannerEvent = filteredData?.[0];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleEventClick = (event: EventItem) => {
    router.push(
      `/detail/${event.contentid}?contentTypeId=${event.contenttypeid}&title=${encodeURIComponent(event.title)}&image=${encodeURIComponent(event.firstimage || '')}`
    );
  };

  if (!currentDate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8 py-8">
      {/* 히어로 배너 */}
      {heroBannerEvent && <FestivalHeroBanner event={heroBannerEvent} />}

      {/* 카테고리 탭 */}
      <div>
        <FestivalCategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* 행사 카드 그리드 */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-80 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-4">
          <DataError />
        </div>
      ) : filteredData && filteredData.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((event) => (
            <div
              key={event.contentid}
              onClick={() => handleEventClick(event)}
              className="cursor-pointer"
            >
              <FestivalCard event={event} onClick={() => handleEventClick(event)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <EmptyState type="date" />
        </div>
      )}
    </div>
  );
}
