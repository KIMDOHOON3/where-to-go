import { Metadata } from 'next';
import MainBannerSlide from '@/app/components/Hero/CleanBannerSlide';
import QuickServiceMenu from '@/app/components/Common/QuickServiceMenu';
import RecommendedContent from '@/app/components/Common/RecommendedContent';
import ThemeCourseSection from '@/app/components/Common/ThemeCourseSection';
import EventContents from '@/app/components/Event/EventContents';
import { TRAVEL_TYPES } from '@/app/constant/apiConstants';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '여행 어디가?',
    description: '가족, 친구, 연인, 혼자, 반려견과 함께하는 맞춤형 여행 코스 추천 서비스',
    url: 'https://koreantrip.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://koreantrip.vercel.app/searchpage?keyword={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: '여행 어디가?',
      logo: {
        '@type': 'ImageObject',
        url: 'https://koreantrip.vercel.app/meta/sum-meta-img.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white">
        {/* 1. 메인 배너 슬라이드 */}
        <MainBannerSlide />

        {/* 2. 빠른 서비스 메뉴 */}
        <QuickServiceMenu />

        {/* 3. 추천 콘텐츠 */}
        <RecommendedContent />

        {/* 4. 테마별 여행 코스 섹션 */}
        <ThemeCourseSection
          icon="👨‍👩‍👧‍👦"
          title="가족여행"
          subtitle="아이들과 함께 즐거운 여행지"
          region="서울"
          travelType={TRAVEL_TYPES.FAMILY}
        />

        <ThemeCourseSection
          icon="💑"
          title="연인여행"
          subtitle="둘이서 로맨틱하게 즐기는 여행"
          region="제주"
          travelType={TRAVEL_TYPES.COUPLE}
        />

        <ThemeCourseSection
          icon="🏖️"
          title="해변·바다"
          subtitle="푸른 바다의 매력에 빠져보세요"
          region="부산"
          travelType={TRAVEL_TYPES.FRIENDS}
        />

        {/* 5. 축제·행사 */}
        <section className="bg-gray-50 py-10">
          <EventContents />
        </section>
      </main>
    </>
  );
}
