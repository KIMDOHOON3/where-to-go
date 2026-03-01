'use client';

import { useState, useEffect } from 'react';
import { useCourseData } from '@/app/hooks/useCourseData';
import CourseCard from './CourseCard';
import Link from 'next/link';

const AllCoursesSection = () => {
  const [displayCount, setDisplayCount] = useState(12);
  const [allCourses, setAllCourses] = useState<any[]>([]);

  // 여러 지역에서 데이터 가져오기
  const { data: seoulCourses } = useCourseData('서울', 20, 1);
  const { data: busanCourses } = useCourseData('부산', 20, 1);
  const { data: jejuCourses } = useCourseData('제주', 20, 1);
  const { data: incheonCourses } = useCourseData('인천', 20, 1);
  const { data: daeguCourses } = useCourseData('대구', 20, 1);
  const { data: gwangjuCourses } = useCourseData('광주', 20, 1);

  // 모든 코스 합치기
  useEffect(() => {
    const combined = [
      ...(seoulCourses?.map((c) => ({ ...c, region: '서울', areaCode: '1' })) || []),
      ...(busanCourses?.map((c) => ({ ...c, region: '부산', areaCode: '6' })) || []),
      ...(jejuCourses?.map((c) => ({ ...c, region: '제주', areaCode: '39' })) || []),
      ...(incheonCourses?.map((c) => ({ ...c, region: '인천', areaCode: '2' })) || []),
      ...(daeguCourses?.map((c) => ({ ...c, region: '대구', areaCode: '4' })) || []),
      ...(gwangjuCourses?.map((c) => ({ ...c, region: '광주', areaCode: '5' })) || []),
    ];
    setAllCourses(combined);
  }, [seoulCourses, busanCourses, jejuCourses, incheonCourses, daeguCourses, gwangjuCourses]);

  const displayedCourses = allCourses.slice(0, displayCount);
  const hasMore = displayCount < allCourses.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 12);
  };

  return (
    <section className="bg-[var(--white)] px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[var(--black)] md:text-3xl">
              전국 인기 여행 코스
            </h2>
            <p className="text-[var(--gray6)]">전국의 다양한 여행 코스를 한눈에 볼 수 있어요</p>
          </div>
          <Link
            href="/morepage"
            className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
          >
            모두 보기
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {allCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayedCourses.map((course, index) => (
                <CourseCard
                  key={`${course.region}-${course.contentid || index}`}
                  course={course}
                  regionLabel={course.region}
                  areaCode={course.areaCode}
                  rank={index + 1}
                />
              ))}
            </div>

            {/* 더보기 버튼 */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  더 많은 코스 보기 ↓
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500 py-12 text-center">코스를 불러오는 중입니다...</div>
        )}
      </div>
    </section>
  );
};

export default AllCoursesSection;
