import Input from "../atoms/Input";
const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  className = "",
  classNameInput = "",
  children = "",
}) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNameInput}
      />
      {children}
    </form>
  );
};

export default SearchBar;
