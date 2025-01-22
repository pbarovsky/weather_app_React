import React, { useContext } from "react";
import { SettingOption } from "../molecules/SettingsOption";
import { Button } from "../atoms/Button";
import { AppContext } from "../../context/AppContext";
import { createPortal } from "react-dom";
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
    <div className="fixed top-0 left-0 w-full h-full bg-backdrop z-[9998]">
      <div
        className="
        border border-solid border-ccc max-w-[290px] w-full h-[250px] rounded-[15px] py-[10px] px-[20px] bg-white 
        flex flex-col items-start justify-start gap-[15px] absolute top-2/4 left-2/4 z-[10000] 
        transform translate-x-[-50%] translate-y-[-90%] shadow-custom
      "
      >
        <header className="w-full flex items-center justify-between">
          <h2 className="font-bold text-[24px]">Настройки</h2>
          <Button onClick={onClose}>
            <img src={DELETE_ICON} alt="Close" />
          </Button>
        </header>
        <div className="flex flex-col items-start justify-start gap-0">
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
