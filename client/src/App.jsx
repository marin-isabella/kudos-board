import './App.css'
import Header from './components/Header/Header';
import { useState, useEffect } from 'react';
import KudoDashboard from './components/KudoDashboard/KudoDashboard';
import FiltersBar from './components/FiltersBar/FiltersBar';

const getUrl = () => {
  let base_url;
  if (import.meta.env.VITE_DEV) {
    base_url = 'http://localhost:3000';
  } else {
    base_url = 'https://kudos-board-eah6.onrender.com';
  }
  return base_url;
}
function App() {
  const [kudoboard, setKudoboard] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const fetchKudoboard = async (category) => {
    let endpoint_url = `${getUrl()}/api/boards`;

    if (category && category!== 'All') {
      endpoint_url += `?category=${category}`;
    }

    fetch(endpoint_url)
      .then(response => response.json())
      .then(data => setKudoboard(data))
      .catch(error => console.error("Error fetching kudoboards: ", error));
  }

  const fetchSearch = async (query) => {
    let endpoint_url = 'http://localhost:3000/api/boards';
    if (query && query !== '') {
      endpoint_url += `?search=${query}`;
    }
    fetch(endpoint_url)
      .then(response => response.json())
      .then(data => setKudoboard(data))
      .catch(error => console.error("Error fetching kudoboards: ", error));
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchSearch(query);
    setSelectedFilter(query.category);
  }

  const handleClear = () => {
    setSearchQuery('');
    fetchKudoboard();
    setSelectedFilter("All");
  }

  const handleFilterClick = (e) => {
    const filterName = e.target.textContent;
    setSelectedFilter(filterName);

    if (filterName === 'Recent') {
      fetch('http://localhost:3000/api/boards/recent')
        .then(response => response.json())
        .then(data => setKudoboard(data))
        .catch(error => console.error("Error fetching recent kudoboards: ", error));

    } else {
      fetchKudoboard(filterName);
    }
  }

  useEffect(() => {
    fetchKudoboard();
  }, [])

  const createBoard = async (boardData) => {
    // generates a random image url that gets sent to backend to store in database
    const imageUrl = `https://picsum.photos/200/300?random=${Math.random()}`;

    const newBoard = {
      ...boardData,
      gif: imageUrl
    };

    try {
      const response = await fetch('http://localhost:3000/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBoard),
      });

      if (!response.ok) {
        throw new Error('Failed to create board');
      }

      fetchKudoboard();

    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} onClear={handleClear}/>
      <main className="main">
        <FiltersBar onClick={handleFilterClick} selectedFilter={selectedFilter} />
        <KudoDashboard kudoboards={kudoboard} onCreateBoard={createBoard}/>
      </main>
      <footer>
        <p>Copyright © 2025. Created by Isabella Marin.</p>
      </footer>
    </>
  )
}

export default App
