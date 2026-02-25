import { Metadata } from 'next';
import MoreHeader from '@/app/components/MorePage/MoreHeader';
import MoreContents from '@/app/components/MorePage/MoreContents';

export const metadata: Metadata = {
  title: '여행지 더보기',
  description: '지역별 인기 여행지, 맛집, 숙박 시설을 카테고리별로 탐색하세요. 다양한 여행 정보를 한 곳에서 확인할 수 있습니다.',
  keywords: ['여행지 목록', '맛집 목록', '숙박 목록', '여행 정보', '관광지 추천'],
  openGraph: {
    title: '여행지 더보기 | 여행 어디가?',
    description: '지역별 인기 여행지, 맛집, 숙박 시설을 카테고리별로 탐색하세요.',
    url: '/morepage',
  },
  twitter: {
    title: '여행지 더보기 | 여행 어디가?',
    description: '지역별 인기 여행지, 맛집, 숙박 시설을 카테고리별로 탐색하세요.',
  },
};

export default function MorePage() {
  return (
    <>
      <MoreHeader />
      <MoreContents />
    </>
  );
}
