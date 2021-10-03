import React from 'react';
import './SimpleCardsContainer.scss';

const SimpleCardsContainer = ({ cardsData, title, darkCards }) => {
  return (
    <div>
      <section className="cards" id={title}>
        <h2>{title}</h2>
        <div className="cards-container">
          {cardsData.map((card) => (
            <div
              className={`card ${darkCards ? 'card-dark' : ''}`}
              key={card.id}
            >
              <main className="card-image-container">
                <img src={card.imageUrl} alt={card.name} />
              </main>
              <footer className="card-text">{card.name}</footer>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SimpleCardsContainer;
