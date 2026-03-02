import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons/faHouseChimney';
import { faMap } from '@fortawesome/free-solid-svg-icons/faMap';
import SearchModal from '@/app/components/Header/SearchModal';
import { useSearchLogic } from '@/app/hooks/useSearchLogic';
import ScrollToTopButton from '@/app/components/Common/ScrollToTopButton';

export default function MobileNavigation() {
  const {
    keyword,
    setKeyword,
    isModalOpen,
    openModal,
    closeModal,
    recentSearches,
    handleSearch,
    handleRecentSearchClick,
    clearRecentSearches,
    removeRecentSearch,
    recommendedSearches,
    handleRecommendedSearchClick,
  } = useSearchLogic();

  return (
    <nav>
      <ul className="flex items-center justify-between lg:w-full lg:gap-[3.125rem]">
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/"
            className="relative flex w-full flex-col gap-1 py-[0.625rem] text-[0.875rem] lg:text-[1.25rem]"
            aria-label="메인으로 이동"
          >
            <FontAwesomeIcon icon={faHouseChimney} /> <span>홈</span>
          </Link>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <button
            onClick={openModal}
            className="relative flex w-full flex-col gap-1 py-[0.625rem] text-[0.875rem] lg:text-[1.25rem]"
          >
            <FontAwesomeIcon icon={faSearch} /> <span>검색</span>
          </button>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/course/all"
            className="relative flex w-full flex-col gap-1 py-[0.625rem] text-[0.875rem] lg:text-[1.25rem]"
          >
            <FontAwesomeIcon icon={faMap} /> <span>코스</span>
          </Link>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <ScrollToTopButton
            className="relative flex w-full flex-col gap-1 py-[0.625rem] text-[0.875rem] lg:text-[1.25rem]"
            buttonClassName="flex flex-col gap-1"
            spanClassName="TOP"
          />
        </li>
      </ul>
      {isModalOpen && (
        <SearchModal
          keyword={keyword}
          setKeyword={setKeyword}
          handleSearch={handleSearch}
          recentSearches={recentSearches}
          handleRecentSearchClick={handleRecentSearchClick}
          clearRecentSearches={clearRecentSearches}
          removeRecentSearch={removeRecentSearch}
          onClose={closeModal}
          recommendedSearches={recommendedSearches}
          handleRecommendedSearchClick={handleRecommendedSearchClick}
        />
      )}
    </nav>
  );
}
