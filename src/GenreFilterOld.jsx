function GenreFilter({ genres, setSelectedGenre }) {
  return (
    <div className="flex gap-2 px-6 py-2 overflow-x-auto">
      <button onClick={() => setSelectedGenre(null)} className="bg-zinc-700 px-3 py-1 rounded-full hover:bg-red-600">All</button>
      {genres.map((genre) => (
        <button
          key={genre.mal_id}
          onClick={() => setSelectedGenre(genre.mal_id)}
          className="bg-zinc-700 px-3 py-1 rounded-full hover:bg-red-600"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter