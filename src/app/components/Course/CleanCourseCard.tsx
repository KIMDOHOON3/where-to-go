'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CourseItem } from '@/app/types/ItemType';
import { filterTitle, filterAddress } from '@/app/utils/filterDate';
import { useTourBigData } from '@/app/hooks/useTourBigData';

interface CleanCourseCardProps {
  course: CourseItem;
  regionLabel?: string;
  areaCode?: string;
}

const CleanCourseCard = ({ course, regionLabel, areaCode }: CleanCourseCardProps) => {
  const effectiveAreaCode = areaCode || course.areacode || '1';
  const { data: bigData, isLoading: bigDataLoading } = useTourBigData(
    effectiveAreaCode,
    String(course.contenttypeid || ''),
    String(course.contentid || '')
  );

  const getTrendIcon = (trend: string) => {
    const iconMap: Record<string, string> = {
      hot: '🔥',
      warm: '⭐',
      cool: '💎',
    };
    return iconMap[trend] || '💎';
  };

  const trend = bigData?.trend || 'cool';
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
      <div className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
        {/* 이미지 */}
        <div className="bg-gray-200 relative aspect-[4/3] overflow-hidden">
          <Image
            src={course.firstimage || '/error/no-image.png'}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            loading="lazy"
          />
        </div>

        {/* 정보 */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            {regionLabel && (
              <span className="border-gray-200 bg-gray-50 text-gray-700 rounded-full border px-2.5 py-1 text-xs font-semibold">
                📍 {regionLabel}
              </span>
            )}
            {!bigDataLoading && (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
                {getTrendIcon(trend)} 트렌드
              </span>
            )}
          </div>

          <h3 className="text-gray-900 mb-1 line-clamp-2 text-sm font-semibold transition-colors group-hover:text-blue-600">
            {filterTitle(course.title)}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-1 text-xs">
            {filterAddress(course.addr1) || '주소 정보 없음'}
          </p>

          {/* 통계 */}
          {!bigDataLoading && visitCount > 0 && (
            <div className="text-gray-700 bg-gray-50 flex items-center gap-1 rounded px-2 py-1 text-xs">
              <span>👥</span>
              <span>{formatVisitCount(visitCount)}명</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CleanCourseCard;
