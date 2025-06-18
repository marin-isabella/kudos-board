import React from 'react';
import './KudoBoard.css';

const KudoBoard = (props) => {
    const { image, category, title, author} = props;
    return (
        <>
            <div className="kudo-board">
                <div className="kudo-board-image">
                    <img src={image} alt="Kudo board"/>
                </div>
                <div className="kudo-board-text">
                    <h3>{category}</h3>
                    <p>{title}</p>
                    <p>Created by {author}</p>
                </div>
                <div className="kudo-board-buttons">
                    <button className="view-board-button">View Board</button>
                    <button className="delete-board-button">Delete Board</button>
                </div>
            </div>

        </>
    )
}

export default KudoBoard;
