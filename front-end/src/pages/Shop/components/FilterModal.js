import React, { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import './FilterModal.scss';
import { v4 as uuid } from 'uuid';

const FilterModal = ({ closeModal }) => {
  const filterOptions = [
    {
      title: 'Categories',
      options: ['shoes', 't-shirts'],
    },
    {
      title: 'Brands',
      options: ['nike', 'adidas'],
    },
  ];

  const [toggledDropdowns, setToggledDropdowns] = useState({});

  return (
    <div className="filter-modal">
      <section onClick={closeModal} className="close-modal">
        <VscClose className="close-icon" />
      </section>
      <section className="modal-content">
        <header className="modal-title">
          <h2 className="letter-spacing">FILTER</h2>
        </header>
        <section className="filter-options-container">
          {filterOptions.map((opt) => (
            <div key={uuid()} className="filter-option-container">
              <p
                onClick={() => {
                  setToggledDropdowns((old) => ({
                    ...old,
                    [opt.title]: !old[opt.title],
                  }));
                  console.log({ [opt.title]: ![opt.title] });
                }}
                className="filter-option-title"
              >
                {opt.title}
              </p>
              <div
                className="filter-options"
                style={toggledDropdowns[opt.title] ? {} : { display: 'none' }}
              >
                {opt.options.map((o) => (
                  <p key={uuid()} className="filter-option">
                    {o}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default FilterModal;
