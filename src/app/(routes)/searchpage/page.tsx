import { Metadata } from 'next';
import SearchContainer from '@/app/components/Search/SearchContainer';

export const metadata: Metadata = {
  title: '여행지 검색',
  description: '전국의 여행지, 맛집, 숙박, 관광지, 행사를 키워드로 검색하세요. 원하는 여행 정보를 빠르게 찾을 수 있습니다.',
  keywords: ['여행 검색', '관광지 검색', '맛집 검색', '숙박 검색', '여행 정보 검색'],
  openGraph: {
    title: '여행지 검색 | 여행 어디가?',
    description: '전국의 여행지, 맛집, 숙박, 관광지, 행사를 키워드로 검색하세요.',
    url: '/searchpage',
  },
  twitter: {
    title: '여행지 검색 | 여행 어디가?',
    description: '전국의 여행지, 맛집, 숙박, 관광지, 행사를 키워드로 검색하세요.',
  },
};

export default function SearchPage() {
  return (
    <>
      <SearchContainer />
    </>
  );
}
