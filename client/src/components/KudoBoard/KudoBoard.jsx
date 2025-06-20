import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './KudoBoard.css';
import { getUrl } from '../../utils';

const KudoBoard = (props) => {
    const { id, image, category, title, author} = props;
    const [boardDeleted, setBoardDeleted] = useState(false);

    const deleteBoard = (boardId) => {
        let endpoint_url = `${getUrl()}/api/boards/${boardId}`;
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
                    {author ? (
                        <p className="author-name">Created by {author}</p>
                    ) : (
                        <p className="author-name">Anonymous author</p>
                    )}
                </div>
                <div className="kudo-board-buttons">
                    <Link to={`/board-details/${id}`} state={{title: title, category: category}} className="view-board-button">View Board</Link>
                    <button className="delete-board-button" onClick={() => deleteBoard(id)}>Delete Board</button>
                </div>
            </div>

        </>
    )
}

export default KudoBoard;
