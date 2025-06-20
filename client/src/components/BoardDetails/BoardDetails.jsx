import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Card from '../Card/Card';
import './BoardDetails.css';
import NewCardModal from '../NewCardModal/NewCardModal';
import { getUrl } from '../../utils';

const BoardDetails = () => {
    const { id } = useParams();
    const [cards, setCards] = useState([]);
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (cardData) => {
        const newCard = {
            ...cardData,
            boardId: parseInt(id),
            voteCount: 0
        };

        fetch(`${getUrl()}/api/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCard),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create card');
            }
            return response.json();
        })
        .then(data => {
            setCards(prevCards => [...prevCards, data]);
        })
        .catch(error => {
            console.error('Error creating card:', error);
        });
    };

    useEffect(() => {
        fetch(`${getUrl()}/api/cards/board/${id}`)
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
                <button className="create-new-card" onClick={openModal}>Create a New Card</button>
            </div>
            <div className="kudo-cards-container">
                {!cards || cards.length === 0 ? (
                <p className="no-cards-message">No cards to display.</p>
            ) : (
                cards.map(card => (
                <Card key={card.id} id={card.id} title={card.title} message={card.message} gif={card.gif} author={card.author} voteCount={card.voteCount}/>
                ))
            )}
            </div>
            <NewCardModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} boardId={id}/>
            <footer>
                <p>Copyright © 2025. Created by Isabella Marin.</p>
            </footer>
        </>
    )
};

export default BoardDetails;
