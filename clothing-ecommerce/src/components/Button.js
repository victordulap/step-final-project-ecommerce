import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

const sizes = ['s', 'm', 'l'];

const Button = ({ text, size, dark, linkTo, routeTo, onClick, block }) => {
  if (!sizes.includes(size)) size = 'm';

  const classes = `btn btn-${size} ${dark ? 'btn-dark' : ''} ${
    block ? 'btn-block' : ''
  }`;

  if (routeTo) {
    return (
      <Link href={routeTo} className={classes} onClick={onClick}>
        {text}
      </Link>
    );
  }

  if (linkTo) {
    return (
      <a href={linkTo} className={classes} onClick={onClick}>
        {text}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
