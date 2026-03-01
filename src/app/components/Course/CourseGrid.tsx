'use client';

import { useState, useEffect } from 'react';
import { useCourseData } from '@/app/hooks/useCourseData';
import CleanCourseCard from './CleanCourseCard';

const CourseGrid = () => {
  const [displayCount, setDisplayCount] = useState(12);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 주요 지역에서 데이터 가져오기
  const { data: seoulCourses } = useCourseData('서울', 15, 1);
  const { data: busanCourses } = useCourseData('부산', 15, 1);
  const { data: jejuCourses } = useCourseData('제주', 15, 1);
  const { data: incheonCourses } = useCourseData('인천', 15, 1);
  const { data: daeguCourses } = useCourseData('대구', 15, 1);

  useEffect(() => {
    const combined = [
      ...(seoulCourses?.map((c) => ({ ...c, region: '서울', areaCode: '1' })) || []),
      ...(busanCourses?.map((c) => ({ ...c, region: '부산', areaCode: '6' })) || []),
      ...(jejuCourses?.map((c) => ({ ...c, region: '제주', areaCode: '39' })) || []),
      ...(incheonCourses?.map((c) => ({ ...c, region: '인천', areaCode: '2' })) || []),
      ...(daeguCourses?.map((c) => ({ ...c, region: '대구', areaCode: '4' })) || []),
    ];
    setAllCourses(combined);
  }, [seoulCourses, busanCourses, jejuCourses, incheonCourses, daeguCourses]);

  const displayedCourses = allCourses.slice(0, displayCount);
  const hasMore = displayCount < allCourses.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 300);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-16">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2 text-2xl font-bold md:text-3xl">인기 여행 코스</h2>
        <p className="text-gray-600">전국의 다양한 여행 코스를 둘러보세요</p>
      </div>

      {allCourses.length > 0 ? (
        <>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {displayedCourses.map((course, index) => (
              <CleanCourseCard
                key={`${course.region}-${course.contentid || index}`}
                course={course}
                regionLabel={course.region}
                areaCode={course.areaCode}
              />
            ))}
          </div>

          {/* 더보기 버튼 */}
          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-lg px-8 py-3 font-medium transition-colors disabled:opacity-50"
              >
                {isLoadingMore ? '로딩 중...' : '더 많은 코스 보기'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-500 py-12 text-center">코스를 불러오는 중입니다...</div>
      )}
    </div>
  );
};

export default CourseGrid;
