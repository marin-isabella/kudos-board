import React, { useState } from 'react';
import './NewBoardModal.css';

const NewBoardModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, category, author });

        // clear form fields for when button pressed again
        setTitle('');
        setCategory('');
        setAuthor('');
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <div className="new-board-modal">
                    <h2 className="new-board-modal-title">Create a New Board</h2>
                    <div className="modal-flex-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category:</label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Celebration">Celebration</option>
                                    <option value="Thank You">Thank You</option>
                                    <option value="Inspiration">Inspiration</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="author">Author:</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-button">Create Board</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewBoardModal;
