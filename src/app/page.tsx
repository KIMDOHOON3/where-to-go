import { Metadata } from 'next';
import MainSlide from '@/app/components/MainSlide/MainSlide';
import TodayRecommend from '@/app/components/TodayRecommend/TodayRecommend';
import AccomdationContents from '@/app/components/Accomdation/AccomdationContents';
import EventContents from '@/app/components/Event/EventContents';

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
    description: '전국 숙박, 맛집, 관광지, 여행지, 행사 정보를 제공하는 국내 여행 정보 서비스',
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
      <MainSlide />
      <TodayRecommend />
      <AccomdationContents />
      <EventContents />
    </>
  );
}
