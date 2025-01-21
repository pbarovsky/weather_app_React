import { Button } from "./Button";
import DELETE_ICON from "../../assets/icons/regular/delete.svg";
import sc from "./SavedCityItem.module.css";

export const SavedCityItem = ({ city, onCityClick, onCityDelete }) => (
  <li className={sc.saved_city_item}>
    <p className={sc.city_name} onClick={onCityClick}>
      {city.name}, {city.sys.country}
    </p>
    <Button onClick={onCityDelete}>
      <img src={DELETE_ICON} alt="delete" />
    </Button>
  </li>
);
