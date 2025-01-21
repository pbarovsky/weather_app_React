// import sc from "./DetailItem.module.css";

// export const DetailItem = ({ label, value, icon }) => (
//   <p className={sc.detail_item}>
//     {icon} {label}: {value}
//   </p>
// );

export const DetailItem = ({ label, value, icon }) => (
  <p
    className="
    flex items-center gap-2.5 m-0 p-2.5 rounded-[10px] select-none bg-blue-gray whitespace-nowrap w-[270px]
    md:w-[270px]"
  >
    {icon} {label}: {value}
  </p>
);
