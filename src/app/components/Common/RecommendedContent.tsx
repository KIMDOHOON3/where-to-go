'use client';

import Image from 'next/image';
import Link from 'next/link';

interface RecommendedItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
}

const recommended: RecommendedItem[] = [
  {
    id: 1,
    title: '아이랑 가기 좋은 세종 여행지 3',
    subtitle: '세종',
    image: '/main/main1.png',
    badge: '👨‍👩‍👧‍👦 가족',
  },
  {
    id: 2,
    title: '겨울방학 전에 떠나는 부산 당일치기',
    subtitle: '부산',
    image: '/main/main2.png',
    badge: '✨ 인기',
  },
  {
    id: 3,
    title: '제주 동쪽&서쪽 일몰 명소',
    subtitle: '제주',
    image: '/main/main3.png',
    badge: '💑 커플',
  },
  {
    id: 4,
    title: '차 없어도 OK! 인천 송도 반나절 데이트 코스',
    subtitle: '인천',
    image: '/main/main1.png',
    badge: '🚶 혼자',
  },
];

const RecommendedContent = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-16">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2 text-2xl font-bold md:text-3xl">
            당신이 좋아할 만한 추천 콘텐츠
          </h2>
          <p className="text-gray-600">여행 스타일에 맞는 추천 여행지를 확인해보세요</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {recommended.map((item) => (
            <Link key={item.id} href={`/searchpage?keyword=${encodeURIComponent(item.title)}`}>
              <div className="group cursor-pointer">
                <div className="bg-gray-200 relative mb-3 aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-gray-900 mb-1 line-clamp-2 text-sm font-semibold transition-colors group-hover:text-blue-600">
                  {item.title}
                </h3>
                {item.badge && (
                  <div className="mb-1 inline-flex rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
                    {item.badge}
                  </div>
                )}
                <p className="text-gray-600 text-xs">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedContent;
