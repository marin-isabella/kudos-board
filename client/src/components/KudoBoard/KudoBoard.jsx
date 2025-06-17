import React from 'react';
import './KudoBoard.css';

const KudoBoard = (props) => {
    const { image, kudosType, title} = props;
    return (
        <>
            <div className="kudo-board">
                <div className="kudo-board-image">
                    <img src={image} alt="Kudo board image"/>
                </div>
                <div className="kudo-board-text">
                    <h3>{kudosType}</h3>
                    <p>{title}</p>
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
