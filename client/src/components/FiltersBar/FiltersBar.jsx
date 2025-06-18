import React from 'react';
import './FiltersBar.css';

const FiltersBar = (props) => {
    const {onClick, selectedFilter} = props;
    return (
        <>
            <div className="filters">
                <button onClick={onClick} className={`all-button ${selectedFilter === 'All' ? 'selected' : ''}`}>All</button>
                <button onClick={onClick} className={`recent-button ${selectedFilter === 'Recent' ? 'selected' : ''}`}>Recent</button>
                <button onClick={onClick} className={`celebration-button ${selectedFilter === 'Celebration' ? 'selected' : ''}`}>Celebration</button>
                <button onClick={onClick} className={`thankYou-button ${selectedFilter === 'Thank You' ? 'selected' : ''}`}>Thank You</button>
                <button onClick={onClick} className={`inspiration-button ${selectedFilter === 'Inspiration' ? 'selected' : ''}`}>Inspiration</button>
            </div>
        </>
    )
}

export default FiltersBar;
