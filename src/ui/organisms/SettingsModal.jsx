import SettingOption from '../molecules/SettingsOption';
import Button from '../atoms/Button';
import sc from './SettingsModal.module.css';
import { createPortal } from "react-dom";

import DELETE_ICON from "../../assets/icons/regular/delete.svg";

const SettingsModal = ({ settings, updateSettings, onClose }) => {

  const handleCheckboxChange = (key) => () => {
    updateSettings(key, !settings[key]);
  };

  const settingsOptions = [
    { label: "Видимость", key: "visibility" },
    { label: "Облачность", key: "clouds" },
    { label: "Закат", key: "sunset" },
    { label: "Восход", key: "sunrise" }
  ];

  return createPortal(
    <div className={sc.modal_backdrop}>
      <div className={sc.modal}>
        <header className={sc.modal_header}>
          <h2>Настройки</h2>
          <Button onClick={onClose}>
            <img src={DELETE_ICON} alt="Close" />
          </Button>
        </header>
        <div className={sc.modal__checkboxes__wrapper}>
          {settingsOptions.map(({ label, key }) => (
            <SettingOption
              key={key}
              label={label}
              checked={settings[key]}
              onChange={handleCheckboxChange(key)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default SettingsModal;
