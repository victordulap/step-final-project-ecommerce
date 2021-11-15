import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} VD Clothes</p>
        <Link to="/">Home</Link>
      </div>
    </footer>
  );
};

export default Footer;
