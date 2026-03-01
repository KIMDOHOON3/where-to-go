import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeCategorySection from '@/app/components/Theme/ThemeCategorySection';

export const metadata: Metadata = {
  title: '테마여행',
  description: '감성, 계절, 특색으로 나뉜 테마 여행을 찾아보세요.',
  alternates: {
    canonical: '/theme',
  },
};

export default function ThemePage() {
  return (
    <main className="bg-white">
      <section className="border-gray-200 border-b bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-gray-900 mb-3 text-4xl font-bold md:text-5xl">
            🎯 테마로 떠나는 여행
          </h1>
          <p className="text-gray-600 mb-6 text-base md:text-lg">
            당신의 감성과 관심사에 맞는 특별한 여행을 찾아보세요. 감성, 계절, 특색별 테마로 구성된
            맞춤 여행지를 추천합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/course/all"
              className="bg-gray-900 hover:bg-gray-800 inline-flex items-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition"
            >
              전국 추천 코스 전체 보기 →
            </Link>
            <Link
              href="/area"
              className="border-gray-900 text-gray-900 hover:bg-gray-50 inline-flex items-center rounded-lg border px-5 py-3 text-sm font-semibold transition"
            >
              지역별 여행지 보기 →
            </Link>
          </div>
        </div>
      </section>

      <ThemeCategorySection />
    </main>
  );
}
