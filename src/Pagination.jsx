function Pagination({ currentPage, totalPages, setPage }) {
  return (
    <div className="flex justify-center gap-4 py-6">
      <button
        onClick={() => setPage(currentPage - 1)}
        className="px-4 py-2 bg-zinc-800 rounded hover:bg-red-600"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="self-center">Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => setPage(currentPage + 1)}
        className="px-4 py-2 bg-zinc-800 rounded hover:bg-red-600"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination