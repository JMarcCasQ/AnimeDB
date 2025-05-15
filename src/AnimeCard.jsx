import React from "react";

const AnimeCard = ({ anime }) => {
  return (
    <div className="min-w-[200px] bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold">{anime.title}</h3>
        <p className="text-xs text-gray-400">⭐ {anime.score || "N/A"}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
