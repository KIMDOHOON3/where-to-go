import type { Metadata } from 'next';
import FestivalContainer from '@/app/components/Festival/FestivalContainer';

export const metadata: Metadata = {
  title: '축제·행사',
  description: '오늘 날짜 기준으로 전국 지역별 축제·행사를 확인해보세요.',
  alternates: {
    canonical: '/festival',
  },
};

export default function FestivalPage() {
  return (
    <main className="bg-white">
      <section className="border-b bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-gray-900 mb-3 text-3xl font-bold md:text-4xl">🎉 축제·행사</h1>
          <p className="text-gray-600 text-base md:text-lg">
            날짜와 지역을 바꿔가며 지금 진행 중인 행사를 확인해보세요.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-12 md:px-8 lg:px-16">
        <FestivalContainer />
      </div>
    </main>
  );
}
