import sc from "./DetailItem.module.css";

export const DetailItem = ({ label, value, icon }) => (
  <p className={sc.detail_item}>
    {icon} {label}: {value}
  </p>
);
