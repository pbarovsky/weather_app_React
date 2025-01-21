import { useState } from "react";
import sc from "./Checkbox.module.css";

export const Checkbox = ({ checked, onChange, className = "" }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div className={`${sc.togglerWrapper} ${className}`} onClick={handleToggle}>
      <i
        className={`bi ${isChecked ? "bi-toggle-on" : "bi-toggle-off"} ${
          sc.toggleIcon
        }`}
      ></i>
    </div>
  );
};
