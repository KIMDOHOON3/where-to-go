'use client';

import { useCourseData } from '@/app/hooks/useCourseData';
import CourseCard from './CourseCard';
import Link from 'next/link';

// 현재 계절 가져오기
const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return { name: '봄', icon: '🌸', region: '경남' }; // 진해 벚꽃
  if (month >= 6 && month <= 8) return { name: '여름', icon: '🏖️', region: '강원' }; // 강원 바다
  if (month >= 9 && month <= 11) return { name: '가을', icon: '🍂', region: '경북' }; // 경주 단풍
  return { name: '겨울', icon: '❄️', region: '강원' }; // 강원 스키
};

const SeasonalCourses = () => {
  const season = getCurrentSeason();
  const { data: courses, isLoading } = useCourseData(season.region, 4, 1);

  return (
    <section className="bg-[var(--white)] px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[var(--black)] md:text-3xl">
              {season.icon} {season.name} 시즌 추천 코스
            </h2>
            <p className="text-[var(--gray6)]">지금 이 계절에 딱 맞는 여행지를 소개해드려요</p>
          </div>
          <Link
            href={`/morepage?area=${season.region}`}
            className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
          >
            더보기
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 h-64 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 4).map((course, index) => (
              <CourseCard
                key={course.contentid || index}
                course={course}
                regionLabel={season.region}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 py-12 text-center">시즌 추천 코스를 준비 중입니다...</div>
        )}
      </div>
    </section>
  );
};

export default SeasonalCourses;
