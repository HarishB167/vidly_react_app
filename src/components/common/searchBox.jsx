import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
    />
  );
};

export default SearchBox;
