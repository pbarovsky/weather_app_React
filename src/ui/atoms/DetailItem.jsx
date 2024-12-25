import sc from './DetailItem.module.css'

const DetailItem = ({ label, value, icon }) => (
  <p className={sc.detail_item}>
    {icon} {label}: {value}
  </p>
);

export default DetailItem;
