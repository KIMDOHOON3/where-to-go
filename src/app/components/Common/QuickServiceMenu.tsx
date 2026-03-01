'use client';

import Link from 'next/link';

interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  link: string;
  color: string;
}

const services: ServiceCard[] = [
  {
    id: 'course',
    icon: '🗺️',
    title: '여행코스',
    description: '전국의 추천 여행코스',
    link: '/course/all',
    color: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    id: 'theme',
    icon: '🎯',
    title: '테마여행',
    description: '가족, 커플, 혼자 여행',
    link: '/theme',
    color: 'bg-pink-50 hover:bg-pink-100',
  },
  {
    id: 'festival',
    icon: '🎉',
    title: '축제·행사',
    description: '지금 진행 중인 행사',
    link: '/festival',
    color: 'bg-orange-50 hover:bg-orange-100',
  },
  {
    id: 'guide',
    icon: '📖',
    title: '여행가이드',
    description: '지역별 여행 정보',
    link: '/area',
    color: 'bg-green-50 hover:bg-green-100',
  },
];

const QuickServiceMenu = () => {
  return (
    <div className="bg-gray-50 border-gray-200 border-b">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {services.map((service) => (
            <Link key={service.id} href={service.link}>
              <div
                className={`${service.color} h-full cursor-pointer rounded-lg p-6 text-center transition-all duration-300`}
              >
                <div className="mb-3 text-4xl">{service.icon}</div>
                <h3 className="text-gray-900 mb-1 font-semibold">{service.title}</h3>
                <p className="text-gray-600 text-xs">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickServiceMenu;
