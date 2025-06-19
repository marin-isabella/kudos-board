import React, { useState } from 'react';
import KudoBoard from '../KudoBoard/KudoBoard';
import NewBoardModal from '../NewBoardModal/NewBoardModal';
import './KudoDashboard.css';

const KudoDashboard = ({ kudoboards, onCreateBoard }) => {
const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (boardData) => {
        onCreateBoard(boardData);
    };

    return (
        <div className="kudo-dashboard">
            <button className="create-new-kudo-board" onClick={openModal}>
                Create a New Board
            </button>
            <div className="kudo-boards-container">
                { !kudoboards || kudoboards.length === 0 ? (
                    <div className="no-boards-message">No boards to show</div>
                ) : (
                    kudoboards.map(kudoboard => (
                        <KudoBoard key={kudoboard.id} id={kudoboard.id} image={kudoboard.gif} category={kudoboard.category} title={kudoboard.title} author={kudoboard.author}/>
                    ))
                )}
            </div>
            <NewBoardModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit}/>
        </div>
    );
};

export default KudoDashboard;
