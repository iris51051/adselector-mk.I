import React from 'react';
import { Checkbox, Dropdown, Input, Menu } from 'antd';
import { useState } from 'react';

const CheckboxGroup = Checkbox.Group;

const options = [
  { label: '다음', value: '1' },
  { label: '네이버', value: '2' },
  { label: '구글', value: 'option3' },
  { label: '페이스북', value: 'option4' },
  { label: '인스타그램', value: 'option5' },
  { label: '트위터', value: 'option6' },
];

function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleCheckboxChange = (checkedValues) => {
    setSelectedOptions(checkedValues);
    if (checkedValues.length === options.length) {
      // If all options are selected, include the "Select All" checkbox in the selected options
      setSelectedOptions([...checkedValues, 'selectAll']);
    } else {
      // Remove the "Select All" checkbox from the selected options
      setSelectedOptions(
        checkedValues.filter((value) => value !== 'selectAll')
      );
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
    if (!visible) {
      setInputValue('');
      setSearchValue('');
    }
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedOptions([
        ...options.map((option) => option.value),
        'selectAll',
      ]);
    } else {
      setSelectedOptions([]);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const menu = (
    <Menu>
      <Menu.Item key="search">
        <Input
          className="adSearch"
          placeholder="광고주 검색"
          value={searchValue}
          onChange={handleSearchChange}
          style={{
            marginBottom: 3,
            marginLeft: -12,
            marginRight: -10,
            width: '120px',
          }}
        />
      </Menu.Item>
      {!searchValue && (
        <Menu.Item key="selectAll">
          <Checkbox
            style={{
              marginLeft: -12,
            }}
            checked={selectedOptions.length === options.length + 1}
            indeterminate={
              selectedOptions.length > 0 &&
              selectedOptions.length < options.length + 1
            }
            onChange={handleSelectAll}
          >
            모두 선택
          </Checkbox>
        </Menu.Item>
      )}
      <Menu.Divider style={{ marginTop: -4 }} />
      {filteredOptions.length === 0 ? (
        <div style={{ marginLeft: 10 }}>No results found.</div>
      ) : (
        <CheckboxGroup
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          options={filteredOptions}
          value={selectedOptions.filter((value) => value !== 'selectAll')}
          onChange={handleCheckboxChange}
        />
      )}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      open={dropdownVisible}
      onOpenChange={handleDropdownVisibleChange}
      trigger={['click']}
    >
      <Input
        className="disp"
        style={{ width: '130px' }}
        value={`선택 광고주 ${
          selectedOptions.length > options.length
            ? selectedOptions.length - 1
            : selectedOptions.length
        }/${options.length}`}
        onChange={handleInputChange}
        onClick={() => setDropdownVisible(true)}
        readOnly
      />
    </Dropdown>
  );
}

export default App;
