function Pagination({ currentPage, totalPages, setPage }) {
  return (
    <div className="flex justify-center gap-4 py-6">
      <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-4 py-2 bg-zinc-800 rounded hover:bg-red-600">Previous</button>
      <span className="self-center">Page {currentPage} of {totalPages}</span>
      <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-4 py-2 bg-zinc-800 rounded hover:bg-red-600">Next</button>
    </div>
  );
}

export default Pagination