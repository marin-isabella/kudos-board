import React from 'react';
import './FiltersBar.css';

const FiltersBar = (props) => {
    const {onClick} = props;
    return (
        <>
            <div className="filters">
                <button onClick={onClick} className="all-button">All</button>
                <button onClick={onClick} className="recent-button">Recent</button>
                <button onClick={onClick} className="Celebration-button">Celebration</button>
                <button onClick={onClick} className="Thank You-button">Thank You</button>
                <button onClick={onClick} className="Inspiration-button">Inspiration</button>
            </div>
        </>
    )

}

export default FiltersBar;
