import React from 'react';
import { Link } from 'react-router-dom';
import './SimpleCardsContainer.scss';

const SimpleCardsContainer = ({ cardsData, title, darkCards }) => {
  return (
    <div>
      <section className="cards" id={title}>
        <h2>{title}</h2>
        <div className="cards-container">
          {cardsData.length > 0 &&
            cardsData.map((card) => (
              <Link
                to={{
                  pathname: `${title.toLowerCase()}/${card.name.toLowerCase()}`,
                }}
                className={`card ${darkCards ? 'card-dark' : ''}`}
                key={card._id || card.id}
              >
                <main className="card-image-container">
                  <img src={card.imgUrl || card.imageUrl} alt={card.name} />
                </main>
                <footer className="card-text">{card.name}</footer>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default SimpleCardsContainer;
