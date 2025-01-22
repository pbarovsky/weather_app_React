import { Checkbox } from "../atoms/Checkbox";

export const SettingOption = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between flex-row-reverse gap-[20px]">
      <p>{label}</p>
      <Checkbox checked={checked} onChange={onChange} />
    </div>
  );
};
