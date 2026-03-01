'use client';

import Image from 'next/image';

interface DetailHeaderProps {
  title: string;
  mainImage: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  onBackClick: () => void;
}

const DetailHeader = ({
  title,
  mainImage,
  isFavorite,
  onFavoriteClick,
  onBackClick,
}: DetailHeaderProps) => {
  return (
    <>
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBackClick}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>

      {/* 메인 이미지 */}
      <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
        <Image src={mainImage} alt={title} fill className="object-cover" priority sizes="100vw" />
        {/* 하트 버튼 */}
        <button
          onClick={onFavoriteClick}
          className="bg-white/80 absolute right-4 top-4 rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label={isFavorite ? '찜 해제' : '찜하기'}
        >
          <svg
            className="h-6 w-6"
            fill={isFavorite ? '#ef4444' : 'none'}
            stroke={isFavorite ? '#ef4444' : '#374151'}
            strokeWidth={2}
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

      {/* 제목 */}
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
    </>
  );
};

export default DetailHeader;
