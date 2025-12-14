const Pagination = ({ page, totalPages, onChange }: any) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-8">
            <button
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
            >
                Prev
            </button>

            <span>{page} / {totalPages}</span>

            <button
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
