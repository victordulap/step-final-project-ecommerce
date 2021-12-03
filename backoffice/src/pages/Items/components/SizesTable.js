import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const SizesTable = ({ sizesState, disabled, onChange }) => {
  const [sizes, setSizes] = useState(sizesState || []);

  useEffect(() => {
    if (sizesState && sizesState.length) {
      setSizes(sizesState);
    }
  }, [sizesState]);

  return (
    <Select
      value={Array.isArray(sizesState) ? sizesState : []}
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
