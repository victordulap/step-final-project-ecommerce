import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';
import { FaCircleNotch } from 'react-icons/fa';

const sizes = ['s', 'm', 'l'];

const Button = ({
  text,
  size,
  dark,
  linkTo,
  routeTo,
  onClick,
  block,
  loading,
  ...rest
}) => {
  if (!sizes.includes(size)) size = 'm';

  const classes = `btn btn-${size} ${dark ? 'btn-dark' : ''} ${
    block ? 'btn-block' : ''
  } ${loading ? 'btn-loading' : ''}`;

  if (routeTo) {
    return (
      <Link href={routeTo} className={classes} onClick={onClick} {...rest}>
        {text}
      </Link>
    );
  }

  if (linkTo) {
    return (
      <a href={linkTo} className={classes} onClick={onClick} {...rest}>
        {text}
      </a>
    );
  }

  return (
    <button
      disabled={loading || false}
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {loading ? <FaCircleNotch className={'loading-icon'} /> : text}
    </button>
  );
};

export default Button;
