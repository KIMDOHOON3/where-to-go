import { Metadata } from 'next';
import AreaHeader from '@/app/components/Area/AreaHeader';
import AreaContents from '@/app/components/Area/AreaContents/AreaContents';

export const metadata: Metadata = {
  title: '지역별 여행지',
  description: '전국 17개 시도별 여행지, 맛집, 숙박 정보를 한눈에 확인하세요. 서울, 부산, 제주 등 지역별 추천 여행 코스를 제공합니다.',
  keywords: ['지역별 여행', '시도별 관광지', '지역 여행 정보', '국내 여행지', '지역 맛집', '지역 숙박'],
  openGraph: {
    title: '지역별 여행지 | 여행 어디가?',
    description: '전국 17개 시도별 여행지, 맛집, 숙박 정보를 한눈에 확인하세요.',
    url: '/area',
  },
  twitter: {
    title: '지역별 여행지 | 여행 어디가?',
    description: '전국 17개 시도별 여행지, 맛집, 숙박 정보를 한눈에 확인하세요.',
  },
};

export default function AreaPage() {
  return (
    <>
      <AreaHeader />
      <AreaContents />
    </>
  );
}
