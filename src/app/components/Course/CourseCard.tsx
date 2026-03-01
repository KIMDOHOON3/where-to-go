'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CourseItem } from '@/app/types/ItemType';
import { filterTitle, filterAddress } from '@/app/utils/filterDate';
import { useTourBigData } from '@/app/hooks/useTourBigData';

interface CourseCardProps {
  course: CourseItem;
  regionLabel?: string;
  areaCode?: string;
  rank?: number;
}

const CourseCard = ({ course, regionLabel, areaCode, rank }: CourseCardProps) => {
  // areaCode가 없으면 course의 areacode 사용, 그것도 없으면 기본값 '1'
  const effectiveAreaCode = areaCode || course.areacode || '1';

  // 빅데이터 정보 조회
  const { data: bigData, isLoading: bigDataLoading } = useTourBigData(
    effectiveAreaCode,
    String(course.contenttypeid || ''),
    String(course.contentid || '')
  );

  const getTrendBadge = (trend: string) => {
    const badgeMap: Record<string, { emoji: string; label: string; color: string }> = {
      hot: { emoji: '🔥', label: '핫플레이스', color: 'bg-red-100 text-red-700' },
      warm: { emoji: '⭐', label: '인기', color: 'bg-yellow-100 text-yellow-700' },
      cool: { emoji: '💎', label: '숨은명소', color: 'bg-blue-100 text-blue-700' },
    };
    return badgeMap[trend] || badgeMap['cool'];
  };

  const trend = bigData?.trend || 'cool';
  const badge = getTrendBadge(trend);
  const visitCount = bigData?.visitCount || 0;

  const formatVisitCount = (count: number) => {
    if (count >= 100000) return `${(count / 10000).toFixed(0)}만+`;
    if (count >= 10000) return `${(count / 10000).toFixed(1)}만`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}천`;
    return count.toString();
  };

  return (
    <Link
      href={`/detail/${course.contentid}?contentTypeId=${course.contenttypeid}&title=${encodeURIComponent(course.title)}`}
    >
      <div className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* 이미지 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={course.firstimage || '/error/no-image.png'}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        {/* 정보 */}
        <div className="p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {regionLabel && (
              <span className="border-gray-200 bg-gray-50 text-gray-700 rounded-full border px-2.5 py-1 text-xs font-semibold">
                📍 {regionLabel}
              </span>
            )}

            {typeof rank === 'number' && rank > 0 && (
              <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                #{rank}
              </span>
            )}

            {!bigDataLoading && (
              <span
                className={`${badge.color} inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold`}
              >
                <span>{badge.emoji}</span>
                <span>{badge.label}</span>
              </span>
            )}
          </div>

          <h3 className="text-gray-800 mb-1 line-clamp-1 font-bold transition-colors group-hover:text-blue-600">
            {filterTitle(course.title)}
          </h3>
          <p className="text-gray-500 mb-2 line-clamp-1 text-sm">
            {filterAddress(course.addr1) || '주소 정보 없음'}
          </p>

          {/* 방문자 통계 */}
          {!bigDataLoading && visitCount > 0 && (
            <div className="text-gray-600 bg-gray-50 flex items-center gap-2 rounded p-2 text-xs">
              <span>👥</span>
              <span className="text-gray-800 font-semibold">{formatVisitCount(visitCount)}명</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
