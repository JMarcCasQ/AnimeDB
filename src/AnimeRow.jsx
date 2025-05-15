function AnimeRow({ animeList, setModalAnime }) {
  return (
    <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {animeList.map((anime) => (
        <div key={anime.mal_id} onClick={() => setModalAnime(anime)} className="cursor-pointer">
          <img src={anime.images.jpg.image_url} alt={anime.title} className="rounded-lg w-full object-cover" />
          <h3 className="mt-2 text-sm font-semibold truncate">{anime.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default AnimeRow