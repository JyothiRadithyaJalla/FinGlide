export const selectCustomStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#F96C4A' : 'white',
    color: state.isFocused ? 'white' : 'black',
    cursor: 'pointer',
    borderRadius: '6px',
    ':active': {
      ...provided[':active'],
      backgroundColor: '#F96C4A',
    },
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    outline: 'none',
    borderColor: state.isFocused ? '#999' : '#ccc',
    '&:hover': { borderColor: '#999' },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    padding: '4px',
  }),
};
