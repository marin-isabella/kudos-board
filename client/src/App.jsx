import './App.css'
import Header from './components/Header/Header';
import { useState, useEffect } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const handleClear = () => {
    setSearchQuery('');
  }

  return (
    <>
      <Header onSearch={handleSearch} onClear={handleClear}/>
      <main className="main">
        {/* different buttons for tabs: all, recent, celebration, thank you, inspiration*/}
        {/* create new board button*/}
        {/* call kudoBoard component*/}
      </main>
      <footer>
        <p>Copyright © 2025. Created by Isabella Marin.</p>
      </footer>

    </>
  )
}

export default App
