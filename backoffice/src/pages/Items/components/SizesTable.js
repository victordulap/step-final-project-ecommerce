import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const SizesTable = ({ defaultSizes, disabled }) => {
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
      placeholder="Select sizes or enter new ones"
      disabled={disabled}
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
