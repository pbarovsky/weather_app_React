export const Button = ({ onClick, children, className = "" }) => {
  return (
    <button
      className={`inline-flex items-center justify-center p-2.5 rounded-full bg-none border-none cursor-pointer transition duration-300 ease-in-out hover:bg-blue-gray ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
