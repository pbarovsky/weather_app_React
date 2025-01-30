import { SettingOption } from "../molecules/SettingsOption";
import { Button } from "../atoms/Button";
import { useActions } from "../../hooks/useActions";
import { useSelectors } from "../../hooks/useSelectors";
import DELETE_ICON from "../../assets/icons/regular/delete.svg";

export const Sidebar = ({ isOpen, onClose }) => {
  const { settings } = useSelectors();
  const { updateSettings } = useActions();

  const options = [
    { label: "Видимость", key: "visibility" },
    { label: "Облачность", key: "clouds" },
    { label: "Закат", key: "sunset" },
    { label: "Восход", key: "sunrise" },
  ];

  return (
    <div
      className={`fixed h-[100%] top-0 right-0 z-[9999] shadow-custom
      ${isOpen ? "animate-slideIn" : "animate-slideOut"}`}
      style={{ width: "320px" }}
    >
      <div
        className="
        bg-white w-full h-full py-[10px] px-[20px] 
        flex flex-col items-start justify-between gap-[15px]
      "
      >
        <div className="w-full flex items-center justify-between">
          <h2 className="font-bold text-[24px]">Настройки</h2>
          <Button onClick={onClose}>
            <img src={DELETE_ICON} alt="Close" />
          </Button>
        </div>
        <div className="flex flex-col items-start justify-start gap-0">
          {options.map(({ label, key }) => (
            <SettingOption
              key={key}
              label={label}
              checked={settings[key]}
              onChange={(value) => updateSettings({ key, value })}
            />
          ))}
        </div>
        <p className="mt-auto">design by pbarovsky</p>
      </div>
    </div>
  );
};
