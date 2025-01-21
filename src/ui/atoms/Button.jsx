import sc from "./Button.module.css";

export const Button = ({ onClick, children, className = "" }) => {
  return (
    <button className={`${sc.btn} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
