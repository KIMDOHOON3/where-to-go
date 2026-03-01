'use client';

import { useMemo, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getCourseApi } from '@/app/api/getCourseApi';
import { CourseItem } from '@/app/types/ItemType';
import CourseCard from './CourseCard';

type SortMode = 'recommend' | 'popular' | 'balanced';

interface RegionMeta {
  name: string;
  code: string;
}

interface EnhancedCourse extends CourseItem {
  region: string;
  areaCode: string;
  regionVisitCount: number;
  recommendScore: number;
}

interface AllRecommendedCourseGridProps {
  selectedArea: string;
}

const TARGET_REGIONS: RegionMeta[] = [
  { name: '서울', code: '1' },
  { name: '인천', code: '2' },
  { name: '대전', code: '3' },
  { name: '대구', code: '4' },
  { name: '광주', code: '5' },
  { name: '부산', code: '6' },
  { name: '울산', code: '7' },
  { name: '세종', code: '8' },
  { name: '경기', code: '31' },
  { name: '강원', code: '32' },
  { name: '충북', code: '33' },
  { name: '충남', code: '34' },
  { name: '경북', code: '35' },
  { name: '경남', code: '36' },
  { name: '전북', code: '37' },
  { name: '전남', code: '38' },
  { name: '제주', code: '39' },
];

const hashString = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const interleaveByRegion = (items: EnhancedCourse[]) => {
  const grouped = new Map<string, EnhancedCourse[]>();

  items.forEach((item) => {
    if (!grouped.has(item.region)) grouped.set(item.region, []);
    grouped.get(item.region)!.push(item);
  });

  const regionNames = Array.from(grouped.keys());
  const result: EnhancedCourse[] = [];
  let hasItems = true;

  while (hasItems) {
    hasItems = false;
    regionNames.forEach((region) => {
      const list = grouped.get(region);
      if (list && list.length > 0) {
        const next = list.shift();
        if (next) result.push(next);
        hasItems = true;
      }
    });
  }

  return result;
};

const AllRecommendedCourseGrid = ({ selectedArea }: AllRecommendedCourseGridProps) => {
  const [displayCount, setDisplayCount] = useState(16);
  const [sortMode, setSortMode] = useState<SortMode>('recommend');

  const courseQueries = useQueries({
    queries: TARGET_REGIONS.map((region) => ({
      queryKey: ['allRecommendCourses', region.name],
      queryFn: () => getCourseApi({ selectedArea: region.name, numOfRows: 24, pageNo: 1 }),
      staleTime: 1000 * 60 * 15,
    })),
  });

  const bigDataQueries = useQueries({
    queries: TARGET_REGIONS.map((region) => ({
      queryKey: ['allRecommendBigData', region.code],
      queryFn: async () => {
        const res = await fetch(`/api/bigdata?areaCode=${region.code}`, {
          signal: AbortSignal.timeout(30000),
        });
        if (!res.ok) return { data: [] };
        return res.json() as Promise<{ data: Array<{ visitCount?: number }> }>;
      },
      staleTime: 1000 * 60 * 30,
      retry: 2,
    })),
  });

  const isLoading = courseQueries.some((q) => q.isLoading);
  const hasData = courseQueries.some((q) => (q.data?.length || 0) > 0);

  const allCourses = useMemo(() => {
    const areaVisitMap = new Map<string, number>();

    TARGET_REGIONS.forEach((region, idx) => {
      const bigData = bigDataQueries[idx]?.data?.data || [];
      const visitCount = Number(bigData[0]?.visitCount || 0);
      areaVisitMap.set(region.code, visitCount);
    });

    const maxVisitCount = Math.max(...Array.from(areaVisitMap.values()), 1);

    const merged = TARGET_REGIONS.flatMap((region, idx) => {
      const courses = courseQueries[idx]?.data || [];
      const regionVisitCount = areaVisitMap.get(region.code) || 0;

      return courses.map((course) => {
        const popularityScore = (regionVisitCount / maxVisitCount) * 70;
        const imageScore = course.firstimage ? 20 : 0;
        const addressScore = course.addr1 ? 5 : 0;
        const titleLen = (course.title || '').length;
        const titleScore = titleLen >= 8 && titleLen <= 30 ? 5 : 2;
        const diversityNoise =
          (hashString(String(course.contentid || course.title || '')) % 7) / 10;

        const recommendScore =
          popularityScore + imageScore + addressScore + titleScore + diversityNoise;

        return {
          ...course,
          region: region.name,
          areaCode: region.code,
          regionVisitCount,
          recommendScore,
        } as EnhancedCourse;
      });
    });

    const dedupMap = new Map<string, EnhancedCourse>();
    merged.forEach((item) => {
      const key = String(item.contentid || `${item.region}-${item.title}`);
      const prev = dedupMap.get(key);
      if (!prev || item.recommendScore > prev.recommendScore) {
        dedupMap.set(key, item);
      }
    });

    return Array.from(dedupMap.values());
  }, [courseQueries, bigDataQueries]);

  const visibleCourses = useMemo(() => {
    const base =
      selectedArea === '전국'
        ? allCourses
        : allCourses.filter((course) => course.region === selectedArea);

    const sorted = [...base].sort((a, b) => {
      if (sortMode === 'popular') {
        if (b.regionVisitCount !== a.regionVisitCount)
          return b.regionVisitCount - a.regionVisitCount;
        return b.recommendScore - a.recommendScore;
      }
      return b.recommendScore - a.recommendScore;
    });

    if (selectedArea === '전국' && sortMode === 'balanced') {
      return interleaveByRegion(sorted);
    }

    return sorted;
  }, [allCourses, selectedArea, sortMode]);

  const displayed = visibleCourses.slice(0, displayCount);
  const hasMore = displayCount < visibleCourses.length;

  if (isLoading && !hasData) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-gray-200 p-4">
            <div className="h-64 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-3 w-16 animate-pulse rounded-full bg-gray-200" />
              <div className="h-3 w-12 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (visibleCourses.length === 0) {
    return (
      <div className="py-12 text-center">
        <span className="mb-4 block text-6xl">🧭</span>
        <p className="text-gray-500 mb-2">추천 가능한 코스를 찾지 못했습니다.</p>
        <p className="text-gray-400 text-sm">지역을 바꾸거나 잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-gray-600 mr-2 text-sm font-medium">정렬:</span>
        <button
          onClick={() => setSortMode('recommend')}
          aria-pressed={sortMode === 'recommend'}
          className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-all ${
            sortMode === 'recommend'
              ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-100 ring-offset-1'
              : 'border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900 bg-white'
          }`}
        >
          {sortMode === 'recommend' ? '✓ 추천순' : '추천순'}
        </button>
        <button
          onClick={() => setSortMode('popular')}
          aria-pressed={sortMode === 'popular'}
          className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-all ${
            sortMode === 'popular'
              ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-100 ring-offset-1'
              : 'border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900 bg-white'
          }`}
        >
          {sortMode === 'popular' ? '✓ 인기순' : '인기순'}
        </button>
        {selectedArea === '전국' && (
          <button
            onClick={() => setSortMode('balanced')}
            aria-pressed={sortMode === 'balanced'}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-all ${
              sortMode === 'balanced'
                ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-100 ring-offset-1'
                : 'border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900 bg-white'
            }`}
          >
            {sortMode === 'balanced' ? '✓ 지역균형' : '지역균형'}
          </button>
        )}
        <span className="text-gray-600 ml-1 text-xs font-medium">
          현재:{' '}
          {sortMode === 'recommend' ? '추천순' : sortMode === 'popular' ? '인기순' : '지역균형'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayed.map((course, idx) => {
          // 실제 방문자 수 기반 순위 계산
          const allSortedByVisitors = [...visibleCourses].sort((a, b) => {
            const aVisitors = a.regionVisitCount || 0;
            const bVisitors = b.regionVisitCount || 0;
            return bVisitors - aVisitors;
          });
          const actualRank =
            allSortedByVisitors.findIndex((c) => c.contentid === course.contentid) + 1;

          return (
            <CourseCard
              key={`${course.region}-${course.contentid || idx}`}
              course={course}
              regionLabel={course.region}
              areaCode={course.areaCode}
              rank={actualRank}
            />
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setDisplayCount((prev) => prev + 16)}
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            더 많은 추천 코스 보기 ↓
          </button>
        </div>
      )}
    </>
  );
};

export default AllRecommendedCourseGrid;
