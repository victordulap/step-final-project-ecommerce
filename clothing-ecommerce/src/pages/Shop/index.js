import './style.scss';
import React from 'react';
import { useLocation, useParams } from 'react-router';

const Shop = () => {
  const location = useLocation();
  const urlState = location.state;
  const urlSearch = useParams();

  console.log(urlState);
  console.log(urlSearch);

  return (
    <main>
      <div style={{ fontSize: 20 }}>
        {/* {urlState} <br /> */}
        {/* {urlSearch} <br /> */}
      </div>
    </main>
  );
};

export default Shop;
