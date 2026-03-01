'use client';

import { useState } from 'react';
import { useCourseData } from '@/app/hooks/useCourseData';
import { usePetTravelData } from '@/app/hooks/usePetTravelData';
import { TRAVEL_TYPE_INFO, TRAVEL_TYPES } from '@/app/constant/apiConstants';
import { AreaHeaderSlide } from '@/app/constant/SlideConstant';
import CourseCard from './CourseCard';
import AllRecommendedCourseGrid from './AllRecommendedCourseGrid';
import Link from 'next/link';

interface CourseContainerProps {
  type: string;
}

type TravelType = (typeof TRAVEL_TYPES)[keyof typeof TRAVEL_TYPES];

const CourseContainer = ({ type }: CourseContainerProps) => {
  const [selectedArea, setSelectedArea] = useState('전국');
  const isAllType = type === 'all';
  const typeInfo = TRAVEL_TYPE_INFO.find((t) => t.id === type);

  const allTypeInfo = {
    id: 'all',
    title: '전국 추천 코스',
    icon: '🗺️',
    description: '전국 인기 여행 코스를 지역별로 둘러보세요',
    color: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200',
    image: '/main/main1.png',
  };

  const resolvedTypeInfo = isAllType ? allTypeInfo : typeInfo;

  // 반려견 타입인 경우 petTravel API 사용, 아니면 course API 사용
  const isPetType = type === TRAVEL_TYPES.PET;
  const travelTypeForQuery = isAllType ? undefined : (type as TravelType);

  const courseQuery = useCourseData(selectedArea, 12, 1, travelTypeForQuery);
  const petQuery = usePetTravelData(selectedArea, 12, 1);

  const { data, isLoading, error } = isPetType ? petQuery : courseQuery;

  if (!resolvedTypeInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-gray-800 mb-4 text-2xl font-bold">존재하지 않는 여행 타입입니다</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className={`${resolvedTypeInfo.color} px-4 py-12`}>
        <div className="mx-auto max-w-6xl text-center">
          <span className="mb-4 block text-6xl">{resolvedTypeInfo.icon}</span>
          <h1 className="text-gray-800 mb-2 text-3xl font-bold md:text-4xl">
            {resolvedTypeInfo.title}
          </h1>
          <p className="text-gray-600 text-lg">{resolvedTypeInfo.description}</p>
        </div>
      </div>

      {/* 지역 필터 */}
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
            {AreaHeaderSlide.map((area) => (
              <button
                key={area.title}
                onClick={() => setSelectedArea(area.title)}
                aria-pressed={selectedArea === area.title}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  selectedArea === area.title
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-100 ring-offset-1'
                    : 'border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900 bg-white'
                }`}
              >
                {selectedArea === area.title ? `✓ ${area.title}` : area.title}
              </button>
            ))}
          </div>
          <p className="text-gray-700 mt-2 text-sm font-medium">
            현재 선택 지역: <span className="text-gray-900">{selectedArea}</span>
          </p>
        </div>
      </div>

      {/* 코스 목록 */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 여행 타입별 안내 메시지 */}
        <div className="mb-8 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-gray-800 mb-2 font-bold">
            {resolvedTypeInfo.icon} {resolvedTypeInfo.title} 코스 둘러보기
          </h2>
          <p className="text-gray-600 text-sm">
            {isAllType &&
              '지역 필터를 선택하면 해당 지역 추천 코스를 볼 수 있고, 전국으로 두면 전체 추천 코스를 확인할 수 있어요.'}
            {type === TRAVEL_TYPES.FAMILY &&
              '아이들과 함께 즐길 수 있는 안전하고 재미있는 코스를 모았습니다.'}
            {type === TRAVEL_TYPES.FRIENDS &&
              '친구들과 함께 추억을 만들 수 있는 액티브한 코스를 추천드립니다.'}
            {type === TRAVEL_TYPES.COUPLE && '연인과 함께 로맨틱한 시간을 보낼 수 있는 코스입니다.'}
            {type === TRAVEL_TYPES.SOLO && '혼자서도 충분히 즐길 수 있는 힐링 코스를 모았습니다.'}
            {type === TRAVEL_TYPES.FOREIGNER &&
              '한국의 전통과 문화를 느낄 수 있는 특별한 코스입니다.'}
            {type === TRAVEL_TYPES.PET && '반려견과 함께 입장 가능한 여행지를 모았습니다.'}
          </p>
        </div>

        {isAllType ? (
          <AllRecommendedCourseGrid selectedArea={selectedArea} />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-500 mb-4">데이터를 불러오는데 실패했습니다.</p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:underline"
            >
              다시 시도하기
            </button>
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((course, index) => (
              <CourseCard
                key={course.contentid || index}
                course={course}
                regionLabel={selectedArea === '전국' ? undefined : selectedArea}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <span className="mb-4 block text-6xl">🔍</span>
            <p className="text-gray-500 mb-2">{selectedArea} 지역에 등록된 코스가 없습니다.</p>
            <p className="text-gray-400 text-sm">다른 지역을 선택해 보세요!</p>
          </div>
        )}
      </div>

      {/* 다른 타입 추천 */}
      <div className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h3 className="text-gray-800 mb-6 text-xl font-bold">다른 여행 스타일도 둘러보세요</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {(isAllType ? TRAVEL_TYPE_INFO : TRAVEL_TYPE_INFO.filter((t) => t.id !== type)).map(
              (otherType) => (
                <Link
                  key={otherType.id}
                  href={`/course/${otherType.id}`}
                  className={`${otherType.color} ${otherType.hoverColor} rounded-xl p-4 text-center transition-all hover:scale-105`}
                >
                  <span className="mb-2 block text-3xl">{otherType.icon}</span>
                  <span className="text-gray-800 text-sm font-medium">{otherType.title}</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContainer;
