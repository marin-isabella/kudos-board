import React from 'react';
import KudoBoard from '../KudoBoard/KudoBoard';
import './KudoDashboard.css';

const KudoDashboard = () => {
    const stockImage = 'https://picsum.photos/200/300';
    // TODO: Replace with real data
    const sampleBoards = [
        {
            id: 1,
            image: stockImage,
            kudosType: 'Thank You',
            title: 'Thanks for your help!'
        },
        {
            id: 2,
            image: stockImage,
            kudosType: 'Celebration',
            title: 'Happy Birthday!'
        },
        {
            id: 3,
            image: stockImage,
            kudosType: 'Inspiration',
            title: 'Great job on the project!'
        },
        {
            id: 4,
            image: stockImage,
            kudosType: 'Thank You',
            title: 'Thanks for your support!'
        },
        {
          id: 5,
          image: stockImage,
          kudosType: 'Celebration',
          title: 'Congratulations on your achievement!'
        }
    ];

    return (
        <div className="kudo-dashboard">
            <button className="create-new-kudo-board">
                Create a New Kudo Board
            </button>
            <div className="kudo-boards-container">
                {sampleBoards.map(board => (
                    <KudoBoard
                        key={board.id}
                        image={board.image}
                        kudosType={board.kudosType}
                        title={board.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default KudoDashboard;
