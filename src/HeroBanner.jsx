function HeroBanner({ anime }) {
  if (!anime) return null;
  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-full h-full object-cover opacity-60" />
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 max-w-xl">
        <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
        <p className="text-sm text-gray-300 line-clamp-3">{anime.synopsis}</p>
      </div>
    </div>
  );
}

export default HeroBanner