'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useDetailData } from '@/app/hooks/useDetailData';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';
import Skeleton from '@/app/components/Common/Skeleton';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';

interface DetailContainerProps {
  contentId: string;
  contentTypeId?: string;
}

export default function DetailContainer({
  contentId,
  contentTypeId,
}: DetailContainerProps) {
  const router = useRouter();
  const { data, isLoading, error } = useDetailData(contentId, contentTypeId);
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="mb-4 h-8 w-32" />
        <Skeleton className="mb-6 h-96 w-full" />
        <Skeleton className="mb-4 h-8 w-64" />
        <Skeleton className="mb-4 h-24 w-full" />
      </div>
    );
  }

  if (error || !data?.common) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg bg-red-50 p-8 text-center">
          <p className="text-xl text-red-600">정보를 불러올 수 없습니다</p>
          <button
            onClick={() => router.back()}
            className="mt-4 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  const { common } = data;
  const isItemFavorite = isFavorite(contentId);

  const handleFavoriteClick = () => {
    if (isItemFavorite) {
      removeFavorite(contentId);
    } else {
      addFavorite({
        contentid: contentId,
        title: common.title,
        addr1: common.addr1,
        firstimage: common.firstimage,
        firstimage2: common.firstimage2,
        contenttypeid: common.contenttypeid,
        tel: common.tel,
      });
    }
  };

  // HTML 태그 제거 함수
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        뒤로가기
      </button>

      {/* 메인 이미지 */}
      <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
        <Image
          src={common.firstimage || '/error/no-image.png'}
          alt={common.title}
          fill
          className="object-cover"
          priority
        />
        {/* 하트 버튼 */}
        <button
          onClick={handleFavoriteClick}
          className="absolute right-4 top-4 rounded-full bg-white/80 p-3 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label={isItemFavorite ? '찜 해제' : '찜하기'}
        >
          <svg
            className="h-6 w-6"
            fill={isItemFavorite ? '#ef4444' : 'none'}
            stroke={isItemFavorite ? '#ef4444' : '#374151'}
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* 제목 */}
      <h1 className="mb-4 text-3xl font-bold">{common.title}</h1>

      {/* 기본 정보 */}
      <div className="mb-6 rounded-lg bg-gray-50 p-6">
        <div className="grid gap-4">
          {common.addr1 && (
            <div className="flex items-start gap-3">
              <svg
                className="mt-1 h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-gray-700">
                  {common.addr1} {common.addr2}
                </p>
                <Link
                  href={createKakaoMapURL(common.addr1)}
                  target="_blank"
                  className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-800"
                >
                  카카오맵에서 보기 →
                </Link>
              </div>
            </div>
          )}

          {common.tel && (
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href={`tel:${common.tel}`}
                className="text-gray-700 hover:text-indigo-600"
              >
                {common.tel}
              </a>
            </div>
          )}

          {common.homepage && (
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <div
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: common.homepage }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 개요 */}
      {common.overview && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold">소개</h2>
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {stripHtml(common.overview)}
          </p>
        </div>
      )}

      {/* 카카오맵 임베드 (선택사항) */}
      {common.mapx && common.mapy && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold">위치</h2>
          <div className="h-96 w-full overflow-hidden rounded-lg bg-gray-200">
            <iframe
              width="100%"
              height="100%"
              src={`https://map.kakao.com/link/map/${common.title},${common.mapy},${common.mapx}`}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
