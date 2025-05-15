function AnimeModal({ anime, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 w-[90%] max-w-xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-xl">&times;</button>
        <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-full h-64 object-cover rounded" />
        <h2 className="text-2xl font-bold mt-4">{anime.title}</h2>
        <p className="text-sm text-gray-300 mt-2">{anime.synopsis}</p>
        <p className="text-xs text-gray-400 mt-2">Rating: {anime.score || 'N/A'}</p>
        <a href={anime.url} target="_blank" rel="noopener noreferrer" className="text-red-500 underline mt-2 inline-block">View on MyAnimeList</a>
      </div>
    </div>
  );
}

export default AnimeModal;