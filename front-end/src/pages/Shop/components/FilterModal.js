import React, { useEffect, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import './FilterModal.scss';
import { v4 as uuid } from 'uuid';

const FilterModal = ({ closeModal, options }) => {
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    let updatedOptions = {};
    for (const [k, v] of Object.entries(options)) {
      updatedOptions[k] = { show: false, value: v };
    }
    setFilterOptions(updatedOptions);
  }, [options]);

  const toggleShowFilterOptions = (key) => {
    // update item by key
    const newState = {
      ...filterOptions,
      [key]: { ...filterOptions[key], show: !filterOptions[key].show },
    };
    setFilterOptions(newState);

    // const itemByIndex = filterOptions[index];
    // const updatedItem = { ...itemByIndex, show: !itemByIndex.show };
    // const newState = [...filterOptions];
    // newState[index] = updatedItem;
    // setFilterOptions(newState);
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
          {Object.entries(filterOptions).map(([k, v]) => (
            <div key={uuid()} className="filter-option-container">
              <p
                onClick={() => toggleShowFilterOptions(k)}
                className="filter-option-title"
              >
                {k}
              </p>
              <div
                className="filter-options"
                style={v.show ? {} : { display: 'none' }}
              >
                {v.value.map((arrValue) => {
                  if (typeof arrValue === 'object') {
                    return (
                      <p key={uuid()} className="filter-option">
                        {arrValue.name}
                      </p>
                    );
                  } else {
                    return (
                      <p key={uuid()} className="filter-option">
                        {arrValue}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default FilterModal;
