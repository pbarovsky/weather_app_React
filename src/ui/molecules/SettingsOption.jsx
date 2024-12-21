import Checkbox from '../atoms/Checkbox';
import sc from './SettingsOption.module.css';

const SettingOption = ({ label, checked, onChange }) => {
  return (
    <div className={sc.settings}>
      <p>{label}</p>
      <Checkbox checked={checked} onChange={onChange} />
    </div>
  );
};

export default SettingOption;