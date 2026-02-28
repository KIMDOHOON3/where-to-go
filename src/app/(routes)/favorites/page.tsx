import { Metadata } from 'next';
import FavoritesContainer from '@/app/components/Favorites/FavoritesContainer';

export const metadata: Metadata = {
  title: '찜한 여행지',
  description: '내가 찜한 여행지, 맛집, 숙박 정보를 한눈에 확인하세요.',
  keywords: ['찜', '여행 바구니', '저장한 여행지', '좋아요'],
  openGraph: {
    title: '찜한 여행지 | 여행 어디가?',
    description: '내가 찜한 여행지, 맛집, 숙박 정보를 한눈에 확인하세요.',
    url: '/favorites',
  },
  twitter: {
    title: '찜한 여행지 | 여행 어디가?',
    description: '내가 찜한 여행지, 맛집, 숙박 정보를 한눈에 확인하세요.',
  },
};

export default function FavoritesPage() {
  return <FavoritesContainer />;
}
