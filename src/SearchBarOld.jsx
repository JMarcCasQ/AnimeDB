import React, { useState, useEffect } from 'react';

function SearchBar({ setSearchTerm }) {
  const [input, setInput] = useState('');
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(input);
    }, 500);
    return () => clearTimeout(timeout);
  }, [input, setSearchTerm]);

  return (
    <div className="px-6 py-4">
      <input
        type="text"
        placeholder="Search anime..."
        className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}


export default SearchBar