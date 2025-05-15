import React, { useEffect, useState } from 'react';
import { enqueueRequest } from './requestQueue';

import Header from './Header';
import HeroBanner from './HeroBanner';
import AnimeRow from './AnimeRow';
import AnimeModal from './AnimeModal';
import Pagination from './Pagination';

// Debounce hook to limit search input frequency
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAnime, setModalAnime] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genresLoaded, setGenresLoaded] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  // Cache genres locally after fetching once
  const [cachedGenres, setCachedGenres] = useState(null);

  // Fetch genres with queue, cache result
  const fetchGenres = async () => {
    if (cachedGenres) {
      setGenres(cachedGenres);
      setGenresLoaded(true);
      return;
    }
    try {
      const data = await enqueueRequest(() =>
        fetch('https://api.jikan.moe/v4/genres/anime').then(res => res.json())
      );
      setGenres(data.data || []);
      setCachedGenres(data.data || []);
      setGenresLoaded(true);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
      setGenres([]);
      setGenresLoaded(true);
    }
  };

  // Fetch anime with queue, only after genres loaded
  const fetchAnime = async () => {
    if (!genresLoaded) return;
    const genreParam = selectedGenre ? `&genres=${selectedGenre}` : '';
    const searchParam = debouncedSearchTerm ? `&q=${debouncedSearchTerm}` : '';
    try {
      const data = await enqueueRequest(() =>
        fetch(`https://api.jikan.moe/v4/anime?page=${page}${genreParam}${searchParam}`).then(res => res.json())
      );
      setAnimeList(data.data || []);
      setTotalPages(data.pagination?.last_visible_page || 1);
    } catch (error) {
      console.error('Failed to fetch anime:', error);
      setAnimeList([]);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchAnime();
  }, [genresLoaded, selectedGenre, debouncedSearchTerm, page]);

  // Pagination throttle to max 3 req/sec (roughly)
  const lastPageChange = React.useRef(0);
  const throttledSetPage = (newPage) => {
    const now = Date.now();
    if (now - lastPageChange.current > 350) {
      setPage(newPage);
      lastPageChange.current = now;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} setSearchTerm={setSearchTerm} />

      <HeroBanner anime={animeList?.[0] || null} />
      <AnimeRow animeList={animeList} setModalAnime={setModalAnime} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setPage={(p) => {
          if (p >= 1 && p <= totalPages) throttledSetPage(p);
        }}
      />
      {modalAnime && <AnimeModal anime={modalAnime} onClose={() => setModalAnime(null)} />}
    </div>
  );
}

export default App;
