import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Card from '../Card/Card';
import './BoardDetails.css';

const BoardDetails = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:3000/api/cards/board/${id}`)
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error("Error fetching cards:", error));
    }, [id]);

  return (
    <>
        <Link to="/" className="back-to-home-button">Home</Link>
        <div className="board-details">
            <h2 className="board-details-header">KUDOBOARD</h2>
            <h3 className="board-details-title">{location.state.title}</h3>
            <button className="create-new-card">Create a New Card</button>
        </div>
        <div className="kudo-cards-container">
            {!cards || cards.length === 0 ? (
          <p className="no-cards-message">No cards to display.</p>
        ) : (
          cards.map(card => (
            <Card key={card.id} id={card.id} title={card.title} message={card.message} image={card.gif} author={card.author} voteCount={card.voteCount}/>
          ))
        )}
        </div>
        {/* <NewCardModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} boardId={id}/> */}
        <footer>
            <p>Copyright © 2025. Created by Isabella Marin.</p>
        </footer>
    </>
  )
};

export default BoardDetails;
