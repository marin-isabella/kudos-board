import './App.css'
import Header from './components/Header/Header';
import { useState, useEffect } from 'react';
import KudoDashboard from './components/KudoDashboard/KudoDashboard';

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
        {/* add conditional rendering for kudodashboard and board details. if the user selects on a kudoboard, show board details, else show kudodashboard.*/}
        <KudoDashboard/>
      </main>
      <footer>
        <p>Copyright © 2025. Created by Isabella Marin.</p>
      </footer>

    </>
  )
}

export default App
