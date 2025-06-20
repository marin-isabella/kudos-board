import React, { useState } from 'react';
import './NewCardModal.css';

const GIF_API_KEY = import.meta.env.VITE_API_KEY;

const NewCardModal = ({ isOpen, onClose, onSubmit, boardId }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('');
    const [gif, setGif] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedGif, setSelectedGif] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // prevents user from submitting form without selecting a gif (without this line users can submit form as long as they type in search gif input field)
        if (!selectedGif) {
            return;
        }

        onSubmit({ title, message, author, gif: selectedGif, boardId: parseInt(boardId) });

        // clear form fields for when button pressed again
        setTitle('');
        setMessage('');
        setAuthor('');
        setGif('');
        setSelectedGif('');
        setSearchResults([]);
        onClose();
    };

    const searchGifs = () => {
        if (!gif) {
            return;
        }

        let endpoint_url = `https://api.giphy.com/v1/gifs/search?q=${gif}&api_key=${GIF_API_KEY}&limit=6`;
        fetch(endpoint_url)
        .then(res => res.json())
        .then(json => {
            const results = json.data.map(gif => gif.images.fixed_height.url);
            setSearchResults(results);
            if (results.length === 0) {
            }
        })
        .catch(err => {
            console.error(err);
        });
    };

    const selectGif = (url) => {
        setSelectedGif(url);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <div className="new-card-modal">
                    <h2 className="new-card-modal-title">Create a New Card</h2>
                    <div className="modal-flex-container">
                        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                            <div className="form-group">
                                <label htmlFor="title">Enter card title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Enter card description:</label>
                                <input
                                    type="text"
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
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

                            <div className="form-group">
                                <label htmlFor="gif">Search GIFS...</label>
                                <input
                                    type="text"
                                    id="gif"
                                    value={gif}
                                    onChange={(e) => setGif(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="gif-search-button">
                                <button type="button" onClick={searchGifs}>Search for Gif</button>
                            </div>

                            {searchResults.length > 0 && (
                                <div className="gif-results">
                                    <h4>Select a GIF:</h4>
                                    <div className="gif-grid">
                                        {searchResults.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`GIF result ${index + 1}`}
                                                className={selectedGif === url ? 'selected-gif' : null}
                                                onClick={() => selectGif(url)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={!selectedGif}
                                >
                                    Create Card
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCardModal;
