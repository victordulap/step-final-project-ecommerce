import React from 'react';
import SimpleCard from './SimpleCard';
import './SimpleCardsContainer.scss';
import SimpleCardSkeleton from './SimpleCardSkeleton';
import { v4 as uuid } from 'uuid';

const SimpleCardsContainer = ({
  cardsData,
  title,
  isLoading = true,
  darkCards,
}) => {
  return (
    <div>
      <section className="cards" id={title}>
        <h2>{title}</h2>
        <div className="cards-container">
          {isLoading ? (
            <>
              <SimpleCardSkeleton key={uuid()} darkMode={darkCards} />
              <SimpleCardSkeleton key={uuid()} darkMode={darkCards} />
              <SimpleCardSkeleton key={uuid()} darkMode={darkCards} />
              <SimpleCardSkeleton key={uuid()} darkMode={darkCards} />
            </>
          ) : (
            cardsData &&
            cardsData.length > 0 &&
            cardsData.map((card) => (
              <SimpleCard
                key={card._id}
                darkMode={darkCards}
                id={card._id}
                imgUrl={card.imgUrl}
                text={card.name}
                title={title.toLowerCase()}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default SimpleCardsContainer;
