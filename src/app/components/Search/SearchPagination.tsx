interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function SearchPagination({
  currentPage,
  totalPages,
  onPageChange,
}: SearchPaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 5);

    if (endPage - startPage < 5) {
      startPage = Math.max(1, endPage - 5);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <nav className="mt-4">
      <ul className="flex items-center justify-center space-x-2">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded px-2 py-1 disabled:opacity-50"
          >
            &lt;
          </button>
        </li>
        {getPageNumbers().map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`rounded px-3 py-1 ${
                currentPage === number
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded px-2 py-1 disabled:opacity-50"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}
