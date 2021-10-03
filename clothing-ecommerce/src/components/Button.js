import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

const sizes = ['s', 'm', 'l'];

const Button = ({ text, size, dark, linkTo, routeTo, onClick }) => {
  if (!sizes.includes(size)) size = 'm';

  if (routeTo) {
    return (
      <Link
        href={routeTo}
        className={`btn btn-${size} ${dark ? 'btn-dark' : ''}`}
        onClick={onClick}
      >
        {text}
      </Link>
    );
  }

  if (linkTo) {
    return (
      <a
        href={linkTo}
        className={`btn btn-${size} ${dark ? 'btn-dark' : ''}`}
        onClick={onClick}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      className={`btn btn-${size} ${dark ? 'btn-dark' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
