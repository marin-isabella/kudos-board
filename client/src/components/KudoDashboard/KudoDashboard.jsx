import React from 'react';
import KudoBoard from '../KudoBoard/KudoBoard';
import './KudoDashboard.css';

const KudoDashboard = ({ kudoboards }) => {
    return (
        <div className="kudo-dashboard">
            <button className="create-new-kudo-board">
                Create a New Kudo Board
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
        </div>
    );
};

export default KudoDashboard;
