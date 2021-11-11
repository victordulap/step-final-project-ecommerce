import React, { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import './FilterModal.scss';
import { v4 as uuid } from 'uuid';

const FilterModal = ({ closeModal, options }) => {
  const [filterOptions, setFilterOptions] = useState(options);

  const toggleShowFilterOptions = (index) => {
    const itemByIndex = filterOptions[index];
    const updatedItem = { ...itemByIndex, show: !itemByIndex.show };
    const newState = [...filterOptions];
    newState[index] = updatedItem;
    setFilterOptions(newState);
  };

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
          {filterOptions.map((opt, index) => (
            <div key={uuid()} className="filter-option-container">
              <p
                onClick={() => toggleShowFilterOptions(index)}
                className="filter-option-title"
              >
                {opt.title}
              </p>
              <div
                className="filter-options"
                style={opt.show ? {} : { display: 'none' }}
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
