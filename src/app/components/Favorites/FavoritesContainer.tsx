'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';

export default function FavoritesContainer() {
  const router = useRouter();
  const { favorites, removeFavorite, clearFavorites } = useFavoriteStore();

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 text-6xl">💔</div>
          <h2 className="text-gray-800 mb-2 text-2xl font-bold">찜한 여행지가 없습니다</h2>
          <p className="text-gray-600 mb-6">마음에 드는 여행지를 찜해보세요!</p>
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
          <h1 className="text-gray-900 text-3xl font-bold">찜한 여행지</h1>
          <p className="text-gray-600 mt-1">총 {favorites.length}개</p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg border px-4 py-2 text-sm transition-colors"
          >
            전체 삭제
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((item) => (
          <div
            key={item.contentid}
            onClick={() =>
              router.push(
                `/detail/${item.contentid}?contentTypeId=${item.contenttypeid}&title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.firstimage || '')}`
              )
            }
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md"
          >
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
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(item.contentid);
                }}
                className="bg-white/90 absolute right-2 top-2 rounded-full p-2 shadow-md transition-all hover:bg-white"
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
              <h3 className="text-gray-900 mb-1 truncate font-semibold">{item.title}</h3>
              <p className="text-gray-600 mb-3 truncate text-sm">{item.addr1}</p>
              <Link
                href={createKakaoMapURL(item.addr1 || '주소를 준비중입니다.')}
                target="_blank"
                className="border-gray-300 hover:bg-gray-50 block rounded-lg border py-2 text-center text-sm transition-colors"
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
