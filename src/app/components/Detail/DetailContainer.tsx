'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDetailData, KakaoDocument, WikiSearchItem, ImageItem } from '@/app/hooks/useDetailData';
import { TourApiRawItem } from '@/app/types/ApiResponseTypes';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';
import Skeleton from '@/app/components/Common/Skeleton';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';

interface DetailContainerProps {
  contentId: string;
  contentTypeId?: string;
}

export default function DetailContainer({ contentId, contentTypeId }: DetailContainerProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const resolvedContentId = contentId ?? params?.contentid ?? searchParams?.get('contentId') ?? '';
  const resolvedContentTypeId = contentTypeId ?? searchParams?.get('contentTypeId') ?? undefined;
  const resolvedTitle = searchParams?.get('title') ?? undefined;
  let resolvedImage = searchParams?.get('image') ?? undefined;
  if (resolvedImage) {
    try {
      resolvedImage = decodeURIComponent(resolvedImage);
    } catch {}
  }
  // debug: console.log('resolvedImage', resolvedImage);
  const { data, isLoading, error } = useDetailData(
    resolvedContentId,
    resolvedContentTypeId,
    resolvedTitle
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 키를 사람이 읽기 좋게 변환
  const prettyKey = (k: string) =>
    k
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, (s) => s.toUpperCase());
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 pb-8 pt-12 pt-[3.125rem] lg:pt-24 lg:pt-[5.625rem]">
        <Skeleton className="mb-4 h-8 w-32" />
        <Skeleton className="mb-6 h-96 w-full" />
        <Skeleton className="mb-4 h-8 w-64" />
        <Skeleton className="mb-4 h-24 w-full" />
      </div>
    );
  }

  const commonObj = data?.common as (TourApiRawItem & Record<string, unknown>) | null; // API 스펙 불명
  const hasValidCommon = !!(
    data?.common &&
    (commonObj?.title || (commonObj as any)?.response?.body?.items?.item)
  );

  const imagesFromApi: ImageItem[] = data?.images || [];
  const images: ImageItem[] = [...imagesFromApi];
  // 쿼리로 전달된 이미지가 있으면 배열 앞에 위치시키기
  if (resolvedImage) {
    images.unshift({ originimgurl: resolvedImage });
  }
  const mainImage =
    selectedImage ||
    resolvedImage ||
    commonObj?.firstimage ||
    commonObj?.firstimage2 ||
    '/error/no-image.png';

  // 갤러리 요소를 미리 계산해서 JSX 내부에서 unknown 문제가 생기지 않도록
  const gallery: any = !!images.length ? (
    <div className="mb-4 flex gap-2 overflow-x-auto">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative h-24 w-24 flex-shrink-0 cursor-pointer"
          onClick={() => setSelectedImage(img.originimgurl)}
        >
          <Image src={img.originimgurl} alt="사진" fill className="rounded object-cover" />
        </div>
      ))}
    </div>
  ) : null;

  if (error || !hasValidCommon) {
    console.error('DetailContainer 에러:', {
      error,
      data,
      contentId: resolvedContentId,
      contentTypeId: resolvedContentTypeId,
    });

    const fallbackTitle =
      resolvedTitle || data?.fallback?.kakao?.documents?.[0]?.place_name || '제목 정보 없음';

    return (
      <div className="mx-auto max-w-4xl px-4 pb-8 pt-12 lg:pt-24">
        {/* 이미지가 전달되었다면 상단에 표시 */}
        {resolvedImage && (
          <div className="relative mb-6 h-[26rem] w-full overflow-hidden rounded-lg">
            <Image src={resolvedImage} alt={fallbackTitle} fill className="object-cover" />
          </div>
        )}
        {/* 공공 API 데이터 부족 안내 */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <p className="mb-2 font-semibold text-blue-900">ℹ️ 상세 정보 안내</p>
          <p className="text-sm text-blue-800">
            공공 API에 이 항목의 기본 정보가 없어, 아래의 보조 정보를 대신 제공합니다.
          </p>
        </div>

        <h1 className="mb-6 text-center text-3xl font-bold">{fallbackTitle}</h1>

        {/* Intro 정보 */}
        {!!data?.intro && (
          <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">시설 정보</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {Object.entries(data.intro)
                .filter(([, val]) => {
                  if (val == null || val === '') return false;
                  if (typeof val === 'string' && /^\d+$/.test(val)) return false;
                  return true;
                })
                .map(([key, val]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-500 text-xs uppercase">{prettyKey(key)}</p>
                    <p className="text-gray-800 mt-1 text-sm font-semibold">{String(val)}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Kakao 검색 결과 */}
        {data?.fallback?.kakao?.documents && data.fallback.kakao.documents.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">🗺️ 카카오 지도 검색 결과</h2>
            <div className="space-y-4">
              {data.fallback.kakao.documents.map((doc: KakaoDocument, idx: number) => (
                <div
                  key={idx}
                  className="border-gray-300 rounded-lg border p-4 transition hover:shadow-lg"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-gray-900 text-lg font-bold">{doc.place_name}</h3>
                      <p className="text-gray-500 text-sm">{doc.category_name}</p>
                    </div>
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                      {doc.category_group_name}
                    </span>
                  </div>
                  <div className="text-gray-700 space-y-1 text-sm">
                    {doc.road_address_name && (
                      <p>
                        📍 <strong>도로명:</strong> {doc.road_address_name}
                      </p>
                    )}
                    {doc.address_name && (
                      <p>
                        📍 <strong>지번:</strong> {doc.address_name}
                      </p>
                    )}
                    {doc.phone && (
                      <p>
                        📞 <strong>전화:</strong> {doc.phone}
                      </p>
                    )}
                  </div>
                  {doc.place_url && (
                    <a
                      href={doc.place_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      카카오맵에서 보기 →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wiki 검색 결과 */}
        {data?.fallback?.wiki?.query?.search && data.fallback.wiki.query.search.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">📖 위키피디아 검색 결과</h2>
            <div className="space-y-3">
              {data.fallback.wiki.query.search.map((item: WikiSearchItem, idx: number) => (
                <div key={idx} className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <p className="text-gray-900 font-semibold">{item.title}</p>
                  {item.snippet && (
                    <p className="text-gray-600 mt-1 text-sm">
                      {item.snippet.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 돌아가기 버튼 */}
        <button
          onClick={() => router.back()}
          className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          ← 뒤로 가기
        </button>
      </div>
    );
  }
  const common = data?.common as (TourApiRawItem & Record<string, unknown>) | null; // unknown 형태로 취급
  const isItemFavorite = isFavorite(resolvedContentId);

  // normal branch 반드시 common 존재해야 함. 없으면 빈 화면 처리
  if (!common) {
    return (
      <div className="mx-auto max-w-4xl px-4 pb-8 pt-12 lg:pt-24">
        <p className="text-gray-500 text-center">상세 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (isItemFavorite) {
      removeFavorite(resolvedContentId);
    } else if (common) {
      addFavorite({
        contentid: resolvedContentId,
        title: common.title,
        addr1: common.addr1,
        firstimage: common.firstimage,
        firstimage2: common.firstimage2,
        contenttypeid: common.contenttypeid,
        tel: common.tel ?? '',
      });
    }
  };

  // HTML 태그 제거 함수
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 pt-12 pt-[3.125rem] lg:pt-24 lg:pt-[5.625rem]">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>

      {/* 메인 이미지 */}
      <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
        <Image
          src={mainImage}
          alt={common?.title || resolvedTitle || ''}
          fill
          className="object-cover"
          priority
        />
        {/* 하트 버튼 */}
        <button
          onClick={handleFavoriteClick}
          className="bg-white/80 absolute right-4 top-4 rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
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

      {/* 썸네일 갤러리 */}
      {gallery}

      {/* 제목 */}
      <h1 className="mb-4 text-3xl font-bold">
        {common?.title || resolvedTitle || '제목 정보 없음'}
      </h1>

      {/* 기본 정보 */}
      <div className="bg-gray-50 mb-6 rounded-lg p-6">
        <div className="grid gap-4">
          {common.addr1 && (
            <div className="flex items-start gap-3">
              <svg
                className="text-gray-600 mt-1 h-5 w-5"
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
                className="text-gray-600 h-5 w-5"
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
              <a href={`tel:${common.tel}`} className="text-gray-700 hover:text-indigo-600">
                {common.tel}
              </a>
            </div>
          )}

          {!!common.homepage && (
            <div className="flex items-center gap-3">
              <svg
                className="text-gray-600 h-5 w-5"
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
                className="text-gray-700 text-sm"
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
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {stripHtml(String(common.overview))}
          </p>
        </div>
      )}

      {/* 카카오맵 임베드 (선택사항) */}
      {common.mapx && common.mapy && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold">위치</h2>
          <div className="bg-gray-200 h-96 w-full overflow-hidden rounded-lg">
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
