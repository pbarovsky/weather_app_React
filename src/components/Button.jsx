import sc from "./Button.module.css";

const Button = ({ onClick, children }) => {
  return (
    <button className={sc.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
