import React, { useState } from 'react';
import './KudoBoard.css';

const KudoBoard = (props) => {
    const { id, image, category, title, author} = props;
    const [boardDeleted, setBoardDeleted] = useState(false);

    const deleteBoard = (boardId) => {
        let endpoint_url = `http://localhost:3000/api/boards/${boardId}`;
        fetch(endpoint_url, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Deleted kudoboard:", data);
            setBoardDeleted(true);
          })
          .catch(error => {
            console.error("Error deleting kudoboard:", error);
          });
    }

    if (boardDeleted) {
        return null;
    }

    return (
        <>
            <div className="kudo-board">
                <div className="kudo-board-image">
                    <img src={image} alt="Kudo board"/>
                </div>
                <div className="kudo-board-text">
                    <h3>{title}</h3>
                    <p>{category}</p>
                    <p>Created by {author}</p>
                </div>
                <div className="kudo-board-buttons">
                    <button className="view-board-button">View Board</button>
                    <button className="delete-board-button" onClick={() => deleteBoard(id)}>Delete Board</button>
                </div>
            </div>

        </>
    )
}

export default KudoBoard;
