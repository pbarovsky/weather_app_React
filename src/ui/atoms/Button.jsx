import sc from "./Button.module.css";

const Button = ({ onClick, children, className = "" }) => {
  return (
    <button className={`${sc.btn} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
