'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useDetailData, WikiSearchItem, KakaoDocument, ImageItem } from '@/app/hooks/useDetailData';
import { TourApiRawItem } from '@/app/types/ApiResponseTypes';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';
import DetailSkeleton from '@/app/components/Detail/DetailSkeleton';
import DetailErrorBoundary from '@/app/components/Detail/DetailErrorBoundary';
import DetailHeader from '@/app/components/Detail/DetailHeader';
import DetailInfoBox from '@/app/components/Detail/DetailInfoBox';
import DetailGallery from '@/app/components/Detail/DetailGallery';
import DetailInteractiveMap from '@/app/components/Detail/DetailInteractiveMap';
import DetailNearbyPlaces from '@/app/components/Detail/DetailNearbyPlaces';
import RelatedCourses from '@/app/components/Detail/RelatedCourses';

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

  // 키를 사람이 읽기 좋게 변환
  const prettyKey = (k: string) =>
    k
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, (s) => s.toUpperCase());
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  if (isLoading) {
    return <DetailSkeleton />;
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
    resolvedImage || commonObj?.firstimage || commonObj?.firstimage2 || '/error/no-image.png';

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

  const getIntroSummary = (intro: unknown) => {
    if (!intro || typeof intro !== 'object') return '';

    const introObj = intro as Record<string, unknown>;
    const summaryKeys = ['infocenter', 'usetime', 'expguide', 'parking', 'restdate'];

    const lines = summaryKeys
      .map((key) => {
        const value = introObj[key];
        if (!value || typeof value !== 'string') return '';
        const cleaned = stripHtml(value).trim();
        return cleaned ? cleaned : '';
      })
      .filter(Boolean);

    return lines.join('\n');
  };

  const mappedOverview =
    common.overview && String(common.overview).trim().length > 0
      ? stripHtml(String(common.overview))
      : getIntroSummary(data?.intro);

  return (
    <DetailErrorBoundary>
      <div className="mx-auto max-w-4xl px-4 pb-8 pt-12 pt-[3.125rem] lg:pt-24 lg:pt-[5.625rem]">
        {/* 헤더 (뒤로가기, 타이틀, 찜 버튼, 메인 이미지) */}
        <DetailHeader
          title={common?.title || resolvedTitle || '제목 정보 없음'}
          mainImage={mainImage}
          isFavorite={isItemFavorite}
          onFavoriteClick={handleFavoriteClick}
          onBackClick={() => router.back()}
        />

        {/* 갤러리 (썸네일 선택) */}
        <DetailGallery mainImage={mainImage} images={images} />

        {/* 기본 정보 (주소, 전화, 홈페이지, 개요) */}
        <DetailInfoBox
          address={`${common.addr1 || ''} ${common.addr2 || ''}`.trim()}
          phone={common.tel}
          homepage={String(common.homepage || '')}
          overview={mappedOverview}
        />

        {/* 인터랙티브 지도 (마커 포함) */}
        <DetailInteractiveMap
          title={common?.title || resolvedTitle || ''}
          mapx={common.mapx}
          mapy={common.mapy}
        />

        {/* 주변 숙박/음식점 */}
        <DetailNearbyPlaces mapx={common.mapx} mapy={common.mapy} />

        {/* 관련 코스 추천 */}
        <RelatedCourses
          region={String(common.areacode || '1')}
          currentContentId={resolvedContentId}
        />
      </div>
    </DetailErrorBoundary>
  );
}
