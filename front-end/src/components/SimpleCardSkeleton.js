import React from 'react';
import './SimpleCard.scss';

const SimpleCardSkeleton = ({ darkMode }) => {
  return (
    <div className={`card card-skeleton ${darkMode ? 'card-dark' : ''}`}>
      <main className="card-image-container"></main>
      <footer className="card-text"></footer>
    </div>
  );
};

export default SimpleCardSkeleton;
