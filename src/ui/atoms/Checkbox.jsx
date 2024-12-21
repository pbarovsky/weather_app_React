import sc from "./Checkbox.module.css";

const Checkbox = ({ checked, onChange, className = "" }) => {
  return (
    <label className={`${sc["toggler-wrapper"]} ${sc["style-10"]} ${className}`}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className={sc["toggler-slider"]}>
        <div className={sc["toggler-knob"]}></div>
      </div>
    </label>
  );
};

export default Checkbox;
