import React, { useState } from 'react';
import './Card.css';

const Card = (props) => {
    const { id, title, message, gif, author, voteCount, boardId} = props;
    const [currentVoteCount, setCurrentVoteCount] = useState(voteCount || 0);
    const [boardDeleted, setBoardDeleted] = useState(false);

    const upvoteCard = (id) => {
        let endpoint_url = `http://localhost:3000/api/cards/${id}/upvote`;
        fetch(endpoint_url, {
          method: 'PUT'
        })
        .then(response => {
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Upvoted card:", data);
            // updates the current vote count in the UI to what is in the database
            setCurrentVoteCount(data.voteCount);
          })
          .catch(error => {
            console.error("Error upvoting card:", error);
          });
    }

    const deleteCard = (id) => {
        let endpoint_url = `http://localhost:3000/api/cards/${id}`;
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
            console.log("Deleted card:", data);
            setBoardDeleted(true);
          })
          .catch(error => {
            console.error("Error deleting card:", error);
          });
    }

    if (boardDeleted) {
        return null;
    }

    return (
        <>
            <div className="kudo-card">
                <div className="kudo-card-gif">
                    <img src={gif} alt="Kudo card"/>
                </div>
                <div className="kudo-card-content">
                    <h3>{title}</h3>
                    <p>{message}</p>
                    {author ? (
                        <p className="no-cards-message">Created by {author}</p>
                    ) : (
                        <p className="no-cards-message">Anonymous author</p>
                    )}
                </div>
                <div className="kudo-card-buttons">
                    <button className="upvote-button" onClick={() => upvoteCard(id)}>Upvote: {currentVoteCount}</button>
                    <button className="delete-card-button" onClick={() => deleteCard(id)}>Delete Card</button>
                </div>
            </div>

        </>
    )
}

export default Card;
