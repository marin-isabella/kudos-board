import React from 'react';
import './FiltersBar.css';

const FiltersBar = (props) => {
    const {onClick} = props;
    return (
        <>
            <div className="filters">
                <button onClick={onClick} className="all-button">All</button>
                <button onClick={onClick} className="recent-button">Recent</button>
                <button onClick={onClick} className="celebration-button">Celebration</button>
                <button onClick={onClick} className="thankYou-button">Thank You</button>
                <button onClick={onClick} className="inspiration-button">Inspiration</button>
            </div>
        </>
    )
}

export default FiltersBar;
