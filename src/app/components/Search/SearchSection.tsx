import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { SearchApiResponse } from '@/app/types/ItemType';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import SearchPagination from '@/app/components/Search/SearchPagination';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';

interface SearchSectionProps {
  contentTypeId: string;
  name: string;
  items: SearchApiResponse[];
  isExpanded: boolean;
  onExpand: (contentTypeId: string) => void;
  onClick: () => void;
  keyword: string;
  highlightKeyword: (text: string, keyword: string) => React.ReactNode;
}

export default function SearchSection({
  contentTypeId,
  name,
  items,
  isExpanded,
  onExpand,
  onClick,
  keyword,
  highlightKeyword,
}: SearchSectionProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [initialItems, setInitialItems] = useState(5);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setInitialItems(8);
      } else if (window.innerWidth >= 768) {
        setInitialItems(6);
      } else {
        setInitialItems(5);
      }
    };

    // 클라이언트 사이드에서만 실행되도록 합니다
    if (typeof window !== 'undefined') {
      handleResize(); // 초기 실행
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (!isExpanded) {
      setCurrentPage(1);
    }
  }, [isExpanded]);

  const totalPages = useMemo(
    () => Math.ceil(items.length / ITEMS_PER_PAGE),
    [items.length]
  );

  const currentItems = useMemo(() => {
    const startIndex = isExpanded ? (currentPage - 1) * ITEMS_PER_PAGE : 0;
    const endIndex = isExpanded ? startIndex + ITEMS_PER_PAGE : initialItems;
    return items.slice(startIndex, endIndex);
  }, [items, isExpanded, currentPage, initialItems]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleShowMore = useCallback(() => {
    onExpand(contentTypeId);
  }, [onExpand, contentTypeId]);

  return (
    <div className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-md lg:mb-8">
      <h2 className="mb-2 text-base font-semibold">{name}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {currentItems.map((item: SearchApiResponse) => {
          const isItemFavorite = isFavorite(item.contentid);

          const handleFavoriteClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (isItemFavorite) {
              removeFavorite(item.contentid);
            } else {
              addFavorite(item);
            }
          };

          return (
            <div
              key={item.contentid}
              className="cursor-pointer border-b border-bordercolor"
              onClick={onClick}
            >
              <div className="flex gap-4">
                <div className="relative mb-2 h-16 w-24 lg:h-32 lg:w-44">
                  <Image
                    className="h-full w-full object-cover"
                    src={item.firstimage || '/error/no-image.png'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                  {/* 하트 버튼 */}
                  <button
                    onClick={handleFavoriteClick}
                    className="absolute right-1 top-1 rounded-full bg-white/80 p-1 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white lg:p-1.5"
                    aria-label={isItemFavorite ? '찜 해제' : '찜하기'}
                  >
                    <svg
                      className="h-3 w-3 lg:h-4 lg:w-4"
                      fill={isItemFavorite ? '#ef4444' : 'none'}
                      stroke={isItemFavorite ? '#ef4444' : '#374151'}
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
                <div className="flex w-full justify-between">
                  <div>
                    <h3 className="text-base font-semibold">
                      {' '}
                      {highlightKeyword(filterTitle(item.title), keyword)}
                    </h3>
                    <p className="text-sm"> {highlightKeyword(filterAddress(item.addr1), keyword)}</p>
                  </div>
                  <div>
                    <Link
                      className="hover-button relative inline-block h-[1.875rem] w-[1.875rem] rounded-full border border-bordercolor text-sm lg:text-base"
                      href={createKakaoMapURL(item.addr1)}
                      target="_blank"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label={`${filterTitle(item.title)} 위치 카카오맵에서 보기`}
                    >
                      <FontAwesomeIcon
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        icon={faMapLocationDot}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {!isExpanded && items.length > initialItems && (
        <button
          onClick={handleShowMore}
          className="mt-4 w-full rounded bg-black px-4 py-2 text-center text-white"
        >
          더보기 +
        </button>
      )}
      {isExpanded && items.length > ITEMS_PER_PAGE && (
        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
