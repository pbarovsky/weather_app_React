import sc from './Input.module.css';

const Input = ({ value, onChange, placeholder = "", className = "" }) => {
  return (
    <input
      className={`${sc.input} ${className}`}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;