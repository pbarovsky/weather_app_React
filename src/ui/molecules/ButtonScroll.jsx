import { Button } from "../atoms/Button";

export const ButtonScroll = ({ onClick, direction }) => {
  return (
    <Button
      className="text-black text-[30px] border-none p-[10px] cursor-pointer z-[1] w-[50px] h-[50px]"
      onClick={onClick}
    >
      <i
        className={`bi bi-chevron-compact-${direction} rotate-90 lg:rotate-0`}
      ></i>
    </Button>
  );
};
