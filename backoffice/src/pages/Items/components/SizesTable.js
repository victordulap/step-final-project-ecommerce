import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const SizesTable = ({ defaultSizes, disabled, onChange }) => {
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (defaultSizes && defaultSizes.length) {
      setSizes(defaultSizes);
    }
  }, [defaultSizes]);

  return (
    <Select
      defaultValue={Array.isArray(defaultSizes) ? defaultSizes : []}
      mode="tags"
      style={{ width: '100%' }}
      placeholder="Select sizes or enter new ones (ex: 41 eu, 42 eu, s, m)"
      disabled={disabled}
      onChange={onChange}
    >
      {sizes.map((size) => (
        <Option value={size} key={`item-size-${size}`}>
          {size}
        </Option>
      ))}
    </Select>
  );
};

export default SizesTable;
