import React from "react";
import sc from "./SearchInput.module.css";

const SearchInput = ({ onSubmit, value, onChange, className, placeholder }) => (
  <form onSubmit={onSubmit}>
    <input
      className={`${sc.input} ${className}`}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </form>
);

export default SearchInput;
