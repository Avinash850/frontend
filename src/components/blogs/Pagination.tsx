type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];

    // If total pages are small, show all
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Left dots
    if (page > 4) {
      pages.push("...");
    }

    // Middle pages
    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right dots
    if (page < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded
          ${
            page === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-700 hover:bg-blue-50"
          }`}
      >
        ‹ Prev
      </button>

      {/* Page Numbers */}
      {getPages().map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium
              ${
                p === page
                  ? "bg-blue-800 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded
          ${
            page === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-700 hover:bg-blue-50"
          }`}
      >
        Next ›
      </button>
    </div>
  );
};

export default Pagination;
