import { Metadata } from 'next';
import DetailContainer from '@/app/components/Detail/DetailContainer';

export const metadata: Metadata = {
  title: '여행지 상세 정보',
  description: '여행지, 숙박, 맛집, 행사 상세 정보를 확인하세요.',
};

interface DetailPageProps {
  params: {
    contentid: string;
  };
  searchParams: {
    contentTypeId?: string;
  };
}

export default function DetailPage({ params, searchParams }: DetailPageProps) {
  return (
    <DetailContainer
      contentId={params.contentid}
      contentTypeId={searchParams.contentTypeId}
    />
  );
}
