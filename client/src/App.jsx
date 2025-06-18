import './App.css'
import Header from './components/Header/Header';
import { useState, useEffect } from 'react';
import KudoDashboard from './components/KudoDashboard/KudoDashboard';

function App() {
  const [kudoboard, setKudoboard] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchKudoboard = async () => {
    const endpoint_url = 'http://localhost:3000/api/boards';
    fetch(endpoint_url)
      .then(response => response.json())
      .then(data => setKudoboard(data))
      .catch(error => console.error("Error fetching kudoboards: ", error));
  }
  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const handleClear = () => {
    setSearchQuery('');
  }

  useEffect(() => {
    fetchKudoboard();
  }, [])

  return (
    <>
      <Header onSearch={handleSearch} onClear={handleClear}/>
      <main className="main">
        {/* different buttons for tabs: all, recent, celebration, thank you, inspiration*/}
        {/* add conditional rendering for kudodashboard and board details. if the user selects on a kudoboard, show board details, else show kudodashboard.*/}
        <KudoDashboard kudoboards={kudoboard}/>
      </main>
      <footer>
        <p>Copyright © 2025. Created by Isabella Marin.</p>
      </footer>

    </>
  )
}

export default App
