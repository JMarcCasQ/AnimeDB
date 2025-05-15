import React, { useState } from 'react';

function Header({ genres, selectedGenre, setSelectedGenre, setSearchTerm }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onSelectGenre = (genreId) => {
    setSelectedGenre(genreId);
    setIsOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black to-transparent text-white relative">
      <h1 className="text-2xl font-bold">AnimeFlix</h1>

      <div className="flex items-center space-x-4">
        {/* Genre Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-zinc-800 px-3 py-1 rounded cursor-pointer hover:bg-red-600 flex items-center space-x-2"
          >
            <span>{selectedGenre ? genres.find(g => g.mal_id === selectedGenre)?.name : 'All Genres'}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-1 max-h-60 w-48 overflow-auto rounded bg-zinc-900 border border-zinc-700 shadow-lg z-50">
              <li
                onClick={() => onSelectGenre(null)}
                className="px-4 py-2 cursor-pointer hover:bg-red-600"
              >
                All Genres
              </li>
              {genres.map((genre) => (
                <li
                  key={genre.mal_id}
                  onClick={() => onSelectGenre(genre.mal_id)}
                  className="px-4 py-2 cursor-pointer hover:bg-red-600"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search anime..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-zinc-800 text-white focus:outline-none w-64"
        />
      </div>
    </header>
  );
}

export default Header