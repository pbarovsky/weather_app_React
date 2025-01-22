export const Input = ({
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <input
      className={`flex items-center rounded-[30px] p-[15px] border-none text-[16px] bg-blue-gray text-black focus:border-none outline-none w-full ${className}`}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};
