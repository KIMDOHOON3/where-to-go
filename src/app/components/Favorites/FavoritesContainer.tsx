'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';

export default function FavoritesContainer() {
  const { favorites, removeFavorite, clearFavorites } = useFavoriteStore();

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 text-6xl">💔</div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">찜한 여행지가 없습니다</h2>
          <p className="mb-6 text-gray-600">마음에 드는 여행지를 찜해보세요!</p>
          <Link
            href="/"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            여행지 둘러보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">찜한 여행지</h1>
          <p className="mt-1 text-gray-600">총 {favorites.length}개</p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            전체 삭제
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((item) => (
          <div key={item.contentid} className="group relative overflow-hidden rounded-lg shadow-md">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.firstimage || '/error/no-image.png'}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              {/* 삭제 버튼 */}
              <button
                onClick={() => removeFavorite(item.contentid)}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-white"
                aria-label="찜 해제"
              >
                <svg
                  className="h-5 w-5"
                  fill="#ef4444"
                  stroke="#ef4444"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-white p-3">
              <h3 className="mb-1 truncate font-semibold text-gray-900">{item.title}</h3>
              <p className="mb-3 truncate text-sm text-gray-600">{item.addr1}</p>
              <Link
                href={createKakaoMapURL(item.addr1 || '주소를 준비중입니다.')}
                target="_blank"
                className="block rounded-lg border border-gray-300 py-2 text-center text-sm transition-colors hover:bg-gray-50"
                onClick={(e) => e.stopPropagation()}
              >
                길찾기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
