import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SimpleCard.scss';

const SimpleCard = ({ title, id, darkMode, imgUrl, text, linkQuery }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <Link
      to={{
        pathname: '/shop',
        search: `${linkQuery}=${id}`,
        // pathname: `/shop?${linkQuery}=${id}`,
      }}
      className={`card ${darkMode ? 'card-dark' : ''}`}
    >
      <main className="card-image-container">
        <img
          src={imgUrl}
          alt={text}
          className={`${isImgLoaded ? '' : 'img-loading'}`}
          onLoad={() => setIsImgLoaded(true)}
        />
      </main>
      <footer className="card-text">{text}</footer>
    </Link>
  );
};

export default SimpleCard;
