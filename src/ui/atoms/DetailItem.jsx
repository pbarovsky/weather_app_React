export const DetailItem = ({ label, value, icon }) => (
  <p
    className="
    flex items-center gap-2.5 m-0 p-2.5 rounded-[10px] select-none bg-blue-gray whitespace-nowrap w-full"
  >
    {icon} {label}: {value}
  </p>
);
