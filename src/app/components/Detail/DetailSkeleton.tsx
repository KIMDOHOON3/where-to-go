'use client';

import Skeleton from '@/app/components/Common/Skeleton';

export default function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 pt-12 pt-[3.125rem] lg:pt-24 lg:pt-[5.625rem]">
      {/* 뒤로가기 버튼 */}
      <Skeleton className="mb-4 h-6 w-24" />

      {/* 메인 이미지 */}
      <Skeleton className="mb-6 h-96 w-full" />

      {/* 갤러리 썸네일 */}
      <div className="mb-6 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 w-24 flex-shrink-0" />
        ))}
      </div>

      {/* 제목 */}
      <Skeleton className="mb-4 h-8 w-64" />

      {/* 기본 정보 박스 */}
      <div className="bg-gray-50 mb-6 rounded-lg p-6">
        <Skeleton className="mb-4 h-6 w-full" />
        <Skeleton className="mb-3 h-4 w-4/5" />
        <Skeleton className="mb-3 h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* 개요 섹션 */}
      <div className="mb-6">
        <Skeleton className="mb-3 h-6 w-20" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* 지도 */}
      <Skeleton className="mb-6 h-96 w-full" />

      {/* 주변 정보 */}
      <div className="mb-6">
        <Skeleton className="mb-4 h-6 w-24" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-gray-200 overflow-hidden rounded-lg border">
              <Skeleton className="h-32 w-full" />
              <div className="p-3">
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 관련 코스 */}
      <div>
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
