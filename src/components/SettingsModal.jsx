import React, { useContext } from "react";
import { createPortal } from "react-dom";

import Checkbox from "./Checkbox";
import Button from "./Button";
import { AppContext } from "../context/AppContext";

import sc from "./SettingsModal.module.css";

import DELETE_ICON from "../assets/icons/regular/delete.svg";

const SettingOption = ({ label, checked, onChange }) => (
  <div className={sc.set_action}>
    <p>{label}</p>
    <Checkbox checked={checked} onChange={onChange} />
  </div>
);

const SettingsModal = ({ onClose }) => {
  const { settings, updateSettings } = useContext(AppContext);

  const handleCheckboxChange = (key) => () => {
    updateSettings(key, !settings[key]);
  };

  return createPortal(
    <div className={sc.modal_backdrop}>
      <div className={sc.modal}>
        <div className={sc.modal_header}>
          <h2>Отобразить данные</h2>
          <Button onClick={onClose}>
            <img src={DELETE_ICON} alt="delete" />
          </Button>
        </div>
        <div className={sc.modal__checkboxes__wrapper}>
          <SettingOption
            label="Видимость"
            checked={settings.visibility}
            onChange={handleCheckboxChange("visibility")}
          />
          <SettingOption
            label="Облачность"
            checked={settings.clouds}
            onChange={handleCheckboxChange("clouds")}
          />
          <SettingOption
            label="Закат"
            checked={settings.sunset}
            onChange={handleCheckboxChange("sunset")}
          />
          <SettingOption
            label="Восход"
            checked={settings.sunrise}
            onChange={handleCheckboxChange("sunrise")}
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default SettingsModal;
