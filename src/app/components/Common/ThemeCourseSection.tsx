'use client';

import { useCourseData } from '@/app/hooks/useCourseData';
import CleanCourseCard from '../Course/CleanCourseCard';
import Link from 'next/link';
import { TRAVEL_TYPES } from '@/app/constant/apiConstants';

interface ThemeSectionProps {
  title: string;
  subtitle: string;
  icon: string;
  region: string;
  travelType?: (typeof TRAVEL_TYPES)[keyof typeof TRAVEL_TYPES];
}

const ThemeCourseSection = ({ title, subtitle, icon, region, travelType }: ThemeSectionProps) => {
  const { data: courses, isLoading } = useCourseData(region, 8, 1, travelType);

  return (
    <section className="border-gray-100 border-b bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-16">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-gray-900 mb-1 text-xl font-bold md:text-2xl">
              <span className="mr-2">{icon}</span>
              {title}
            </h2>
            <p className="text-gray-600 text-sm">{subtitle}</p>
          </div>
          <Link
            href={`/morepage?area=${region}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            더보기 →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="bg-gray-200 h-48 animate-pulse rounded-lg" />
                <div className="bg-gray-200 h-4 w-3/4 animate-pulse rounded" />
                <div className="bg-gray-200 h-3 w-1/2 animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 overflow-x-auto pb-4 sm:grid-cols-3 lg:grid-cols-4">
            {courses.slice(0, 4).map((course, index) => (
              <div key={`${region}-${course.contentid || index}`} className="flex-shrink-0">
                <CleanCourseCard
                  course={course}
                  regionLabel={region}
                  areaCode={
                    region === '서울'
                      ? '1'
                      : region === '부산'
                        ? '6'
                        : region === '제주'
                          ? '39'
                          : '1'
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 py-8 text-center">코스를 불러오는 중입니다...</div>
        )}
      </div>
    </section>
  );
};

export default ThemeCourseSection;
