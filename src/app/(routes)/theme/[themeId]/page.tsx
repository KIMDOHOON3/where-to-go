'use client';

import { use, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { THEMES } from '@/app/constant/themeConstants';
import { getCourseApi } from '@/app/api/getCourseApi';
import CourseCard from '@/app/components/Course/CourseCard';
import { areaCodeMap } from '@/app/constant/SlideConstant';
import { CourseItem } from '@/app/types/ItemType';

interface ThemePageProps {
  params: Promise<{
    themeId: string;
  }>;
}

interface EnhancedCourse extends CourseItem {
  region: string;
}

export default function ThemeDetailPage({ params }: ThemePageProps) {
  const { themeId } = use(params);
  const theme = THEMES.find((t) => t.id === themeId);
  const [displayCount, setDisplayCount] = useState(12);

  // 전국 주요 지역에서 관광지 가져오기
  const regions = ['서울', '부산', '제주', '인천', '대구', '광주', '경기', '강원'];

  const courseQueries = useQuery({
    queryKey: ['themeContents', themeId],
    queryFn: async () => {
      const allCourses: EnhancedCourse[] = [];

      for (const region of regions) {
        try {
          const courses = await getCourseApi({
            selectedArea: region,
            numOfRows: 20,
            pageNo: 1,
          });
          allCourses.push(
            ...courses.map(
              (c): EnhancedCourse => ({
                ...c,
                region,
              })
            )
          );
        } catch (error) {
          console.error(`Failed to fetch courses for ${region}:`, error);
        }
      }

      return allCourses;
    },
    staleTime: 1000 * 60 * 30,
  });

  // 테마 키워드로 필터링 및 정렬
  const filteredCourses = useMemo(() => {
    if (!courseQueries.data || !theme) return [];

    // 모든 데이터를 먼저 점수 계산
    const scored = courseQueries.data.map((course) => {
      const title = (course.title || '').toLowerCase();
      const addr = (course.addr1 || '').toLowerCase();
      const overview = (course.overview || '').toLowerCase();

      // 키워드 매칭 점수 계산
      let score = 0;
      theme.keywords.forEach((keyword) => {
        const keywordLower = keyword.toLowerCase();
        // 제목에서 찾으면 높은 점수 (여러 번 찾을 수 있음)
        const titleMatches = (title.match(new RegExp(keywordLower, 'g')) || []).length;
        score += titleMatches * 200;

        // 주소에서 찾으면 중간 점수
        const addrMatches = (addr.match(new RegExp(keywordLower, 'g')) || []).length;
        score += addrMatches * 100;

        // 설명에서 찾으면 낮은 점수
        const overviewMatches = (overview.match(new RegExp(keywordLower, 'g')) || []).length;
        score += overviewMatches * 50;
      });

      return { ...course, themeScore: score };
    });

    // 점수가 0 이상인 것만 필터링하고 정렬 (높은 점수 먼저)
    // 점수가 없으면 제외
    return scored
      .filter((course) => course.themeScore > 0)
      .sort((a, b) => b.themeScore - a.themeScore);
  }, [courseQueries.data, theme]);

  const displayed = filteredCourses.slice(0, displayCount);
  const hasMore = displayCount < filteredCourses.length;

  if (!theme) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">존재하지 않는 테마입니다.</p>
          <Link href="/theme" className="text-blue-600 hover:underline">
            테마 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* 헤더 */}
      <section className={`bg-gradient-to-r ${theme.color} px-4 py-12 md:px-8 lg:px-16`}>
        <div className="mx-auto max-w-6xl">
          <Link href="/theme" className="text-white/80 mb-4 inline-flex text-sm hover:text-white">
            ← 테마 목록으로 돌아가기
          </Link>
          <div className="mb-4 text-6xl">{theme.emoji}</div>
          <h1 className="mb-2 text-4xl font-bold text-white">{theme.name}</h1>
          <p className="text-white/90 text-lg">{theme.description}</p>
        </div>
      </section>

      {/* 콘텐츠 */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:px-16">
        {/* 정보 */}
        <div className={`${theme.bgColor} mb-8 rounded-xl border-l-4 p-4`}>
          <h2 className="text-gray-900 mb-2 font-semibold">이 테마에 포함된 관광지 특징</h2>
          <div className="flex flex-wrap gap-2">
            {theme.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-gray-700 border-gray-200 rounded-full border bg-white px-3 py-1 text-sm font-medium"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 결과 */}
        {courseQueries.isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="border-gray-200 space-y-3 overflow-hidden rounded-2xl border p-4"
              >
                <div className="bg-gray-200 h-64 animate-pulse rounded-lg" />
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 w-3/4 animate-pulse rounded" />
                  <div className="bg-gray-200 h-3 w-1/2 animate-pulse rounded" />
                  <div className="flex gap-2">
                    <div className="bg-gray-200 h-3 w-16 animate-pulse rounded-full" />
                    <div className="bg-gray-200 h-3 w-12 animate-pulse rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 mb-4">관광지를 찾을 수 없습니다.</p>
            <Link href="/theme" className="text-blue-600 hover:underline">
              다른 테마 선택하기
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-gray-900 text-xl font-bold">관광지 {filteredCourses.length}개</h2>
              <p className="text-gray-600 text-sm">
                지금 보고 있는: {displayed.length}개 / 전체 {filteredCourses.length}개
                <span className="text-gray-500 ml-2 text-xs">(테마 관련도 높은 순서로 정렬됨)</span>
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayed.map((course) => {
                // 실제 방문자 수 기반 순위
                const sorted = [...filteredCourses].sort((a, b) => {
                  const aCode = areaCodeMap[a.region] || '1';
                  const bCode = areaCodeMap[b.region] || '1';
                  return Number(bCode) - Number(aCode);
                });
                const actualRank = sorted.findIndex((c) => c.contentid === course.contentid) + 1;

                return (
                  <CourseCard
                    key={`${course.region}-${course.contentid}`}
                    course={course}
                    regionLabel={course.region}
                    areaCode={areaCodeMap[course.region] || '1'}
                    rank={actualRank}
                  />
                );
              })}
            </div>

            {hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={() => setDisplayCount((prev) => prev + 12)}
                  className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  더 많은 관광지 보기 ↓
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* 다른 테마 추천 */}
      <section className="border-gray-200 bg-gray-50 border-t px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h3 className="text-gray-900 mb-6 text-xl font-bold">다른 테마도 둘러보세요</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {THEMES.filter((t) => t.id !== themeId)
              .slice(0, 4)
              .map((otherTheme) => (
                <Link key={otherTheme.id} href={`/theme/${otherTheme.id}`}>
                  <div
                    className={`group cursor-pointer rounded-xl ${otherTheme.bgColor} p-4 transition-transform hover:scale-105`}
                  >
                    <div className="mb-2 text-4xl">{otherTheme.emoji}</div>
                    <h4 className="text-gray-900 font-semibold">{otherTheme.name}</h4>
                    <p className="text-gray-600 line-clamp-1 text-sm">{otherTheme.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
