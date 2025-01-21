// import { useState } from "react";
// import sc from "./Checkbox.module.css";

// export const Checkbox = ({ checked, onChange, className = "" }) => {
//   const [isChecked, setIsChecked] = useState(checked);

//   const handleToggle = () => {
//     setIsChecked(!isChecked);
//     onChange(!isChecked);
//   };

//   return (
//     <div className={`${sc.togglerWrapper} ${className}`} onClick={handleToggle}>
//       <i
//         className={`bi ${isChecked ? "bi-toggle-on" : "bi-toggle-off"} ${
//           sc.toggleIcon
//         }`}
//       ></i>
//     </div>
//   );
// };




import { useState } from "react";

export const Checkbox = ({ checked, onChange, className = "" }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div
      className={`flex items-center cursor-pointer ${className}`}
      onClick={handleToggle}
    >
      <i
        className={`bi ${isChecked ? "bi-toggle-on" : "bi-toggle-off"} text-4xl`}
      ></i>
    </div>
  );
};
