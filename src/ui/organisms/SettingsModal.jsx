import React, { useContext } from "react";
import { SettingOption } from "../molecules/SettingsOption";
import { Button } from "../atoms/Button";
import { AppContext } from "../../context/AppContext";
import { createPortal } from "react-dom";
import sc from "./SettingsModal.module.css";
import DELETE_ICON from "../../assets/icons/regular/delete.svg";

export const SettingsModal = ({ onClose }) => {
  const { settings, updateSetting } = useContext(AppContext);

  const options = [
    { label: "Видимость", key: "visibility" },
    { label: "Облачность", key: "clouds" },
    { label: "Закат", key: "sunset" },
    { label: "Восход", key: "sunrise" },
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
          {options.map(({ label, key }) => (
            <SettingOption
              key={key}
              label={label}
              checked={settings[key]}
              onChange={(newChecked) => updateSetting(key, newChecked)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
