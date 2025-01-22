import { Button } from "./Button";
import DELETE_ICON from "../../assets/icons/regular/delete.svg";

export const SavedCityItem = ({ city, onCityClick, onCityDelete }) => (
  <li className="py-[5px] px-[15px] m-0 cursor-pointer flex flex-row justify-between items-center gap-[10px] w-full border border-solid border-ccc rounded-[10px]">
    <p onClick={onCityClick}>
      {city.name}, {city.sys.country}
    </p>
    <Button onClick={onCityDelete}>
      <img src={DELETE_ICON} alt="delete" />
    </Button>
  </li>
);
