'use client';

import { useCourseData } from '@/app/hooks/useCourseData';
import CleanCourseCard from '../Course/CleanCourseCard';
import { areaCodeMap } from '@/app/constant/SlideConstant';

interface RelatedCoursesProps {
  region: string;
  currentContentId: string;
}

const RelatedCourses = ({ region, currentContentId }: RelatedCoursesProps) => {
  const areaCodeToNameMap: Record<string, string> = Object.entries(areaCodeMap).reduce(
    (acc, [name, code]) => {
      if (code) acc[code] = name;
      return acc;
    },
    {} as Record<string, string>
  );

  const normalizedRegion = areaCodeToNameMap[region] || region;
  const normalizedAreaCode =
    areaCodeMap[normalizedRegion] || (region.match(/^\d+$/) ? region : '1');

  const { data: courses, isLoading } = useCourseData(normalizedRegion, 10, 1);

  const filtered = courses?.filter((c) => c.contentid !== currentContentId).slice(0, 4) || [];

  if (isLoading || filtered.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-2xl font-bold">🗺️ 주변 추천 코스</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((course, idx) => (
          <CleanCourseCard
            key={`${normalizedRegion}-${course.contentid || idx}`}
            course={course}
            regionLabel={normalizedRegion}
            areaCode={normalizedAreaCode}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
