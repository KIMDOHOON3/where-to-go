import { Metadata } from 'next';
import CourseContainer from '@/app/components/Course/CourseContainer';
import { TRAVEL_TYPE_INFO } from '@/app/constant/apiConstants';

interface CoursePageProps {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { type } = await params;
  if (type === 'all') {
    return {
      title: '전국 추천 여행 코스',
      description: '전국 인기 여행 코스를 지역별로 한눈에 확인해보세요.',
      alternates: {
        canonical: `/course/${type}`,
      },
    };
  }

  const typeInfo = TRAVEL_TYPE_INFO.find((t) => t.id === type);
  const title = typeInfo?.title || '여행 코스';

  return {
    title: `${title} 추천 코스`,
    description: `${typeInfo?.description || '맞춤형 여행 코스를 추천해드립니다.'}`,
    alternates: {
      canonical: `/course/${type}`,
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { type } = await params;

  return <CourseContainer type={type} />;
}
