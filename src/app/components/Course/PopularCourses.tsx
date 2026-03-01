'use client';

import { useCourseData } from '@/app/hooks/useCourseData';
import CourseCard from './CourseCard';
import Link from 'next/link';

const PopularCourses = () => {
  // 서울, 부산, 제주에서 각각 10개 코스 가져오기 (첫 번째 항목만 사용)
  const { data: seoulCourses, isLoading: seoulLoading } = useCourseData('서울', 10, 1);
  const { data: busanCourses, isLoading: busanLoading } = useCourseData('부산', 10, 1);
  const { data: jejuCourses, isLoading: jejuLoading } = useCourseData('제주', 10, 1);

  const isLoading = seoulLoading || busanLoading || jejuLoading;

  // 각 지역에서 첫 번째 코스만 선택 + 지역 정보 추가
  const allCourses = [
    ...(seoulCourses && seoulCourses.length > 0
      ? seoulCourses.slice(0, 1).map((c) => ({ ...c, region: '서울', areaCode: '1' }))
      : []),
    ...(busanCourses && busanCourses.length > 0
      ? busanCourses.slice(0, 1).map((c) => ({ ...c, region: '부산', areaCode: '6' }))
      : []),
    ...(jejuCourses && jejuCourses.length > 0
      ? jejuCourses.slice(0, 1).map((c) => ({ ...c, region: '제주', areaCode: '39' }))
      : []),
  ];

  return (
    <section className="bg-[var(--footerbg)] px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[var(--black)] md:text-3xl">
              인기 여행 코스 TOP 3
            </h2>
            <p className="text-[var(--gray6)]">지금 가장 인기 있는 지역의 추천 코스예요 🔥</p>
          </div>
          <Link
            href="/morepage"
            className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
          >
            더보기
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-64 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : allCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {allCourses.map((course: any, index) => (
              <CourseCard
                key={`${course.region}-${course.contentid || index}`}
                course={course}
                regionLabel={course.region}
                areaCode={course.areaCode}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 py-12 text-center">인기 코스를 불러오는 중입니다...</div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
