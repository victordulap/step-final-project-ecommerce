import React, { useEffect, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import './FilterModal.scss';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import queryString from 'query-string';

const FilterModal = ({ closeModal, options, updateFilterOptions }) => {
  const [filterOptions, setFilterOptions] = useState({});
  const { search } = useLocation();

  useEffect(() => {
    let updatedOptions = {};
    for (let [k, v] of Object.entries(options)) {
      for (let i = 0; i < v.length; i++) {
        // eslint-disable-next-line no-unused-vars
        for (let [k2, v2] of Object.entries(queryString.parse(search))) {
          v2 = v2.split(',');
          if (v2.includes(v[i].id || v[i].name)) {
            console.log(v2);
            const newV = [...v];
            newV[i] = { ...v[i], checked: true };
            v = [...newV];
          }
        }
      }
      updatedOptions[k] = {
        show: false,
        value: v,
        checked: search.includes(v.name || v.id),
      };
    }
    setFilterOptions(updatedOptions);
  }, [options, search]);

  const toggleShowFilterOptions = (key) => {
    // update item by key
    const newState = {
      ...filterOptions,
      [key]: { ...filterOptions[key], show: !filterOptions[key].show },
    };
    setFilterOptions(newState);
  };

  const getAllCheckedByKey = (stateByKey) => {
    const values = stateByKey.value;
    let checkedValues = values.filter((v) => v.checked);
    let queryArray = checkedValues.map((v) => v.id || v.name);
    return queryArray.join(',');
  };

  const toggleFilterOption = (key, index) => {
    const newState = {
      ...filterOptions,
    };

    const newValue = [...newState[key].value];
    newValue[index] = { ...newValue[index], checked: !newValue[index].checked };

    newState[key] = {
      ...newState[key],
      value: [...newValue],
    };

    updateFilterOptions({
      colors: getAllCheckedByKey(newState['colors']),
      brandIds: getAllCheckedByKey(newState['brands']),
      categoryIds: getAllCheckedByKey(newState['categories']),
      sizes: getAllCheckedByKey(newState['sizes']),
    });

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
                {v.value.map((arrValue, index) => (
                  <p
                    key={uuid()}
                    onClick={() => toggleFilterOption(k, index)}
                    className={`filter-option ${
                      arrValue.checked ? 'filter-option-checked' : ''
                    }`}
                  >
                    <span>{arrValue.name}</span>
                    {arrValue.checked && <span>✔</span>}
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
