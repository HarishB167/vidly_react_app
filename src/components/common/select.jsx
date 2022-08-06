import React from "react";

const Select = ({
  name,
  label,
  options,
  idKeyName,
  valueKeyName,
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        <option value=""> -- </option>
        {options.map((item) => (
          <option key={item[idKeyName]} value={item[idKeyName]}>
            {item[valueKeyName]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
